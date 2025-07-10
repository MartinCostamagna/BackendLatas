import { Module } from '@nestjs/common';
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

@Module({
  imports: [LataModule, MarcaModule, TamañoModule, SaborModule, EspecialidadModule, EdicionEspecialModule, DescripcionModule, PaisModule, CajaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
