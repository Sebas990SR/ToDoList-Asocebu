import { Component } from '@angular/core';

@Component({
  selector: 'app-pantalla-espera',
  standalone: false,
  templateUrl: './pantalla-espera.component.html',
  styleUrl: './pantalla-espera.component.css'
})
export class PantallaEsperaComponent {

  protected mostrar = false;

  activarModoEspera() {
    this.mostrar = true;
  }

  desactivarModoEspera() {
    this.mostrar = false;
  }

}
