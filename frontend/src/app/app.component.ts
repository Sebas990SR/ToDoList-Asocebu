import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InicioModule } from './inicio/inicio.module';
import { PantallaEsperaModule } from './pantalla-espera/pantalla-espera.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    PantallaEsperaModule,
    InicioModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
