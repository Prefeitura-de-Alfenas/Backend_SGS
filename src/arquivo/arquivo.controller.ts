import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ArquivoService } from './arquivo.service';
import { Prisma } from '@prisma/client';
import { filter } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {Response} from "express";
import  * as path from "path";
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { CreateArquivo } from './DTO/createArquivo';
interface FileParams {
  fileName : string;
}
interface DeleteFileParams {
  arquivoId : string;
}
@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('arquivo')
export class ArquivoController {
  constructor(private readonly arquivoService: ArquivoService) {}
  
  @Get('findallforpessoas/:id/take/:take/skip/:skip/:filter?')
  async GetAllForPessoas(
      @Param('id') id: string,
      @Param('take') take:string,
      @Param('skip') skip:string, 
      @Param('filter') filter?:string
     
      ){
     return this.arquivoService.findAllForPessoas(id,take,skip,filter);
  }


  @Post("/upload")
  @UseInterceptors(FileInterceptor('file', {
     storage: diskStorage({
       destination: './uploads',
       filename: (req, file, cb) => {
         const randomName = randomUUID();
         return cb(null, `${randomName}${path.extname(file.originalname)}`);
       },
     }),
     fileFilter: (req, file, cb) => {
       const allowedMimes = ['image/jpeg', 'image/png', 'application/pdf'];
       if (allowedMimes.includes(file.mimetype)) {
         cb(null, true);
       } else {
         
         cb(new BadRequestException('Tipo de arquivo não suportado'), false);
       }
     },
     limits: {
       fileSize: 3 * 1024 * 1024, // 3MB em bytes
     },
   }))
  async uploadFile(@UploadedFile() file : any,@Body() data:CreateArquivo) {
     return this.arquivoService.uploadFile(file,data);
    
   }
 
  
   @Get("/file/getfile/:id")
  async getFile(@Res() res : Response ,   @Param('id') id: string)
   {
      const arquivo = await this.arquivoService.getFile(id);
       if(!arquivo){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error:'Erro ao buscar esse arquivo'});
       }
     const uploadsDir = path.resolve(process.cwd(), 'uploads'); // Caminho absoluto para a pasta de uploads
     const filePath = path.join(uploadsDir, arquivo.url);

     res.sendFile(filePath, (err) => {
      if (err) {
        console.error(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error:'Erro ao buscar esse arquivo'});
      }
    });
     
   }
 
 
   @Get("/file/delete/:id")
   deleteFile(@Param('id') id: string,) {
    //  const uploadsDir = path.resolve(process.cwd(), 'uploads'); // Caminho absoluto para a pasta de uploads
    //  const filePath = path.join(uploadsDir, file.fileName);
     
    //  // Verifica se o arquivo existe antes de excluí-lo
    //  if (fs.existsSync(filePath)) {
    //    // Exclui o arquivo
    //    fs.unlink(filePath, (err) => {
    //      if (err) {
    //        console.error(err);
    //        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Erro ao excluir o arquivo');
    //      } else {
    //        res.status(HttpStatus.OK).send('Arquivo excluído com sucesso');
    //      }
    //    });
    //  } else {
    //    res.status(HttpStatus.NOT_FOUND).send('Arquivo não encontrado');
    //  }
    return this.arquivoService.deleteFile(id);
   }

}
