import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { EquipamentoModule } from './equipamento/equipamento.module';
import { BeneficioModule } from './beneficio/beneficio.module';
import { EntregraModule } from './entregra/entregra.module';


@Module({
  imports: [PrismaModule, UsuarioModule,AuthModule, PessoaModule, EquipamentoModule, BeneficioModule, EntregraModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
