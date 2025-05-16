import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionTareasComponent } from './creacion-tareas.component';

describe('CreacionTareasComponent', () => {
  let component: CreacionTareasComponent;
  let fixture: ComponentFixture<CreacionTareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreacionTareasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreacionTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
