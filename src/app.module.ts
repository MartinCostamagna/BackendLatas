import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { join } from 'path';
import { LataNoTengoModule } from './lata-no-tengo/lata-no-tengo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: configService.get<number>('POSTGRES_PORT') || 5432,
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        autoLoadEntities: true,
        synchronize: true,
      })
    }), LataModule, MarcaModule, TamañoModule, SaborModule, EspecialidadModule, EdicionEspecialModule, DescripcionModule, LataNoTengoModule, PaisModule, CajaModule, UsersModule, AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/static',
    }),
    LataNoTengoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
