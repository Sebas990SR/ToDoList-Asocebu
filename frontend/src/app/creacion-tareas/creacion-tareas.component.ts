import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PantallaEsperaComponent } from '../pantalla-espera/pantalla-espera.component';
import { GestionService } from '../services/gestion.service';
import { isPlatformBrowser } from '@angular/common';
import { faArrowLeft, faTimes, faCheck, faFloppyDisk, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
declare var window: any;

@Component({
  selector: 'app-creacion-tareas',
  standalone: false,
  templateUrl: './creacion-tareas.component.html',
  styleUrl: './creacion-tareas.component.css'
})
export class CreacionTareasComponent implements OnInit, AfterViewInit {
  @Input() dataEdicion: any;
  @Output() desplegarMenuPrincipal = new EventEmitter();
  @Output() desplegarListaTareas = new EventEmitter();

  faArrowLeft = faArrowLeft;
  faTimes = faTimes;
  faCheck = faCheck;
  faFloppyDisk = faFloppyDisk;
  faTriangleExclamation = faTriangleExclamation;

  protected formularioTarea: FormGroup;
  protected modalAlerta: any;

  protected habilitarGuardarTarea: boolean;

  @ViewChild(PantallaEsperaComponent, { static: false }) pantallaEspera:
    | PantallaEsperaComponent
    | undefined;

  constructor(private snackBar: MatSnackBar, private servicioTareas: GestionService, @Inject(PLATFORM_ID) private platformId: Object) {

    this.formularioTarea = new FormGroup({
      titulo: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
    });

    this.habilitarGuardarTarea = false;
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
    }
  }

  ngOnInit(): void {
  }

  openModal() {
    this.modalAlerta.show();
  }

  protected setFormulario() {
    this.t['titulo'].setValue(this.dataEdicion.titulo);
    this.t['descripcion'].setValue(this.dataEdicion.descripcion);

    setTimeout(() => {
      this.pantallaEspera?.desactivarModoEspera();
    }, 100);
  }

  protected validarFormularioTarea() {
    if (this.formularioTarea.valid) {
      this.habilitarGuardarTarea = true;
    } else {
      this.habilitarGuardarTarea = false;
    }
  }

  protected guardarTarea() {
    this.pantallaEspera?.activarModoEspera();
    this.consolidarInformacion();
  }

  protected consolidarInformacion() {
    var data: any;
    data = this.formularioTarea.value;

    let promesa: any;
    promesa = this.servicioTareas.addTask(data);

    promesa
      .then(() => {
        this.snackBar.open('Tarea registrada correctamente', 'Cerrar', {
          duration: 4000,
        });
        this.formularioTarea.reset();
        this.habilitarGuardarTarea = false;
        setTimeout(() => {
          this.pantallaEspera?.desactivarModoEspera();
        }, 100);
      })
      .catch(() => {
        this.snackBar.open('Error al registrar la tarea', 'Cerrar', {
          duration: 4000,
        });
        setTimeout(() => {
          this.pantallaEspera?.desactivarModoEspera();
        }, 100);
      });
  }

  get t() {
    return this.formularioTarea.controls;
  }

  protected volver() {
    this.desplegarMenuPrincipal.emit();
  }
}
