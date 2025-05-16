import { afterNextRender, AfterViewInit, Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PantallaEsperaComponent } from '../pantalla-espera/pantalla-espera.component';
import { GestionService } from '../services/gestion.service';
import { isPlatformBrowser } from '@angular/common';
import { faTrash, faTriangleExclamation, faArrowLeft, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
declare var window: any;

@Component({
  selector: 'app-listado-tareas',
  standalone: false,
  templateUrl: './listado-tareas.component.html',
  styleUrl: './listado-tareas.component.css'
})
export class ListadoTareasComponent implements OnInit, AfterViewInit {
  @Output() desplegarMenuPrincipal = new EventEmitter();
  @Output() abrirEdicionTarea = new EventEmitter();

  
  faTrash = faTrash;
  faTriangleExclamation = faTriangleExclamation;
  faArrowLeft = faArrowLeft;
  faCheck = faCheck;
  faXmark = faXmark;

  protected tareas: any;
  protected tareaActual: any;
  protected modalAlerta: any;
  protected modalEdicion: any;

  isAmpliado: boolean = false;
  protected rerender: boolean;
  protected bandera: boolean;

  protected idEliminar: number | undefined;
  protected idEditar: number | undefined;

  @ViewChild(PantallaEsperaComponent, { static: false }) pantallaEspera:
    | PantallaEsperaComponent
    | undefined;

  constructor(private tareasService: GestionService, private snackBar: MatSnackBar, @Inject(PLATFORM_ID) private platformId: Object) {

    this.rerender = false;
    this.bandera = false;

  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Este bloque solo se ejecuta en el navegador
      const modalEl = document.getElementById('modalAlerta');
      if (modalEl) {
        this.modalAlerta = new window.bootstrap.Modal(modalEl, {
          keyboard: false,
          backdrop: 'static',
        });
      }

      const modalEd = document.getElementById('modalEdicion');
      if (modalEd) {
        this.modalEdicion = new window.bootstrap.Modal(modalEd, {
          keyboard: false,
          backdrop: 'static',
        });
      }
    }
  }

  ngOnInit(): void {
    this.pantallaEspera?.activarModoEspera();
    this.obtenerTareas();
  }

  protected obtenerTareas() {
    this.tareasService.getTasks().subscribe({
      next: (resp: any) => {
        this.tareas = resp;
        setTimeout(() => {
          this.rerender = true;
          this.pantallaEspera?.desactivarModoEspera();
        }, 100);
      },
      error: (e: any) => {
        setTimeout(() => {
          this.rerender = true;
          this.pantallaEspera?.desactivarModoEspera();
        }, 100);
      },
    });
  }

  protected eliminarTarea() {
    let promesa: any;
    promesa = this.tareasService.deleteTask(this.idEliminar!);

    promesa
      .then(() => {
        this.snackBar.open('Tarea eliminada correctamente', 'Cerrar', {
          duration: 4000,
        });
        setTimeout(() => {
          this.obtenerTareas();
          this.pantallaEspera?.desactivarModoEspera();
        }, 100);
      })
      .catch(() => {
        this.snackBar.open('Error al eliminar la tarea', 'Cerrar', {
          duration: 4000,
        });
        setTimeout(() => {
          this.pantallaEspera?.desactivarModoEspera();
        }, 100);
      });
  }

  protected editarTarea(){

    if(!this.bandera){
      var data: any = {
        id: this.idEditar,
        titulo: this.tareaActual.titulo,
        descripcion: this.tareaActual.descripcion,
        isCompleted: true
      }
    } else {
      var data: any = {
        id: this.idEditar,
        titulo: this.tareaActual.titulo,
        descripcion: this.tareaActual.descripcion,
        isCompleted: false
      }
    }

    let promesa: any;
    promesa = this.tareasService.updateTask(this.idEditar!, data);

    promesa
      .then(() => {
        this.rerender = false;
        this.snackBar.open('Tarea actualizada correctamente', 'Cerrar', {
          duration: 4000,
        });
        setTimeout(() => {
          this.obtenerTareas();
          this.pantallaEspera?.desactivarModoEspera();
        }, 100);
      })
      .catch((e: any) => {
        this.snackBar.open('Error al actualizar la tarea', 'Cerrar', {
          duration: 4000,
        });
        setTimeout(() => {
          this.pantallaEspera?.desactivarModoEspera();
        }, 100);
      });
  }

  openModal(i: number) {
    this.idEliminar = i;
    this.modalAlerta.show();
  }

  openModal2(i: number, bandera: boolean, indice: any) {
    this.idEditar = i;
    this.modalEdicion.show();
    this.bandera = bandera;
    this.tareaActual = this.tareas[indice];
  }

  protected volver() {
    this.desplegarMenuPrincipal.emit();
  }

}
