import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
import { PantallaEsperaModule } from '../pantalla-espera/pantalla-espera.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreacionTareasModule } from '../creacion-tareas/creacion-tareas.module';
import { ListadoTareasModule } from '../listado-tareas/listado-tareas.module';

@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    PantallaEsperaModule,
    FontAwesomeModule,
    CreacionTareasModule,
    ListadoTareasModule
  ]
})
export class InicioModule { }
