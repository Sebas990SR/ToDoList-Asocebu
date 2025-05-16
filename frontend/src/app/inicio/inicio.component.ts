import { Component, OnInit, ViewChild } from '@angular/core';
import { PantallaEsperaComponent } from '../pantalla-espera/pantalla-espera.component';
import { faPlus, faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{
  
  faPlus = faPlus;
  faList = faList;

  protected modules: any = [];

  protected tareas: any;
  protected dataEdicion: any;
  
  protected moduloActual: number;

  
  @ViewChild(PantallaEsperaComponent, {static: false}) pantallaEspera: PantallaEsperaComponent | undefined;

  constructor(){
    this.modules = [
      true,
      false,
      false
    ];
    this.moduloActual = 0;
  }

  ngOnInit(): void {
    setTimeout(() =>{
      this.pantallaEspera?.activarModoEspera();
    });
    
    setTimeout(() =>{
      this.pantallaEspera?.desactivarModoEspera();
    }, 500);
  }

  protected reiniciarValores(){
    this.dataEdicion = [];
  }

  protected abrirModulo(i: number, bandera: boolean = true){
    this.pantallaEspera?.activarModoEspera();
    this.reiniciarValores();
    setTimeout(() =>{
      this.modules[this.moduloActual] = false;
      this.modules[i] = true;
      this.moduloActual = i;
      this.pantallaEspera?.desactivarModoEspera();

      if(!bandera){
        this.pantallaEspera?.desactivarModoEspera();
      }
    });
  }

}
