import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LataModule } from './lata/lata.module';
import { MarcaModule } from './marca/marca.module';
import { TamañoModule } from './tamaño/tamaño.module';
import { SaborModule } from './sabor/sabor.module';
import { EspecialidadModule } from './especialidad/especialidad.module';
import { EdicionEspecialModule } from './edicion-especial/edicion-especial.module';
import { DescripcionModule } from './descripcion/descripcion.module';
import { PaisModule } from './pais/pais.module';
import { CajaModule } from './caja/caja.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, }), TypeOrmModule.forRoot({ type: 'postgres', url: process.env.DATABASE_URL, autoLoadEntities: true, synchronize: true, }), LataModule, MarcaModule, TamañoModule, SaborModule, EspecialidadModule, EdicionEspecialModule, DescripcionModule, PaisModule, CajaModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
