import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArquivo } from './DTO/createArquivo';
import * as fs from 'fs/promises'; 
import * as fssync from 'fs'; 
import  * as path from "path";
@Injectable()
export class ArquivoService {

    constructor(private prisma: PrismaService){}
    async uploadFile(file:any,data:CreateArquivo){
        try {
          if (!file) {
            throw new HttpException('Nenhum arquivo foi enviado', HttpStatus.BAD_REQUEST);
          }
          const dataResponse = {
            ...data,
            url:file.filename
          }
        
          const  response = await this.prisma.arquivo.create({
            data:dataResponse
          })
          return response;

        } catch (error) {
           this.deleteArquivo(file)
          if (error instanceof HttpException) {
            throw error; // Se já for um HttpException, apenas jogue-o novamente
          } else {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
          }
        }
      }
     async deleteFile(id:string){
       
        const arquivo= await this.prisma.arquivo.findUnique({
            where:{
               id
            }
        })
        console.log(arquivo)
        if(!arquivo){
            return {error:'Arquivo não encontrado'};
        }
        const uploadsDir = path.resolve(process.cwd(), 'uploads'); // Caminho absoluto para a pasta de uploads
        const filePath = path.join(uploadsDir, arquivo.url);
   
    
            try {
            // Verifica se o arquivo existe
            await fs.access(filePath);
            
            // Exclui o arquivo
            await fs.unlink(filePath);
             
            await this.prisma.arquivo.delete({
                where:{
                    id:arquivo.id
                }
            })

            return {success:'Arquivo excluído com sucesso'};
            } catch (error) {
            if (error.code === 'ENOENT') {
                return {error:'Arquivo não encontrado'};
            } else {
                console.error(error);
                return {error:'Erro ao excluir o arquivo'};
                
            }
            }
     }

     deleteArquivo(file:any){
     
             const uploadsDir = path.resolve(process.cwd(), 'uploads'); // Caminho absoluto para a pasta de uploads
             console.log(uploadsDir)
             const filePath = path.join(uploadsDir, file.filename);
             console.log(uploadsDir)
            // Verifica se o arquivo existe antes de excluí-lo
            if (fssync.existsSync(filePath)) {
            // Exclui o arquivo
            fssync.unlink(filePath, (err) => {
                if (err) {
                console.log(err);
                
                } else {
                    console.log('Arquivo excluído com sucesso');
                }
            });
            } else {
                console.log('Arquivo não encontrado');
            }
    }
}
