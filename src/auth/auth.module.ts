import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';


import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';
import { RolesGuard } from './guards/roles.guard';



@Module({
  imports:[UsuarioModule,JwtModule.register({
    secret:process.env.JWT_SECRET,
    signOptions:{expiresIn:'1d'},
  })],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy,RolesGuard,UsuarioModule],
  exports: [AuthService],

})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
