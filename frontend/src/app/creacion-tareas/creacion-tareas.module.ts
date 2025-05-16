import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreacionTareasComponent } from './creacion-tareas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PantallaEsperaModule } from '../pantalla-espera/pantalla-espera.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [CreacionTareasComponent],
  imports: [
    CommonModule, 
    PantallaEsperaModule,
    FormsModule,
    MatTooltipModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    CreacionTareasComponent,
  ],
})
export class CreacionTareasModule {}
