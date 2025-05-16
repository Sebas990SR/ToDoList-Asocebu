import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Tarea } from '../interfaces/tarea';

@Injectable({
  providedIn: 'root',
})
export class GestionService {

  protected arregloTareas: any = [];
  private apiUrl = 'http://localhost:5000/api/todo';

  constructor(private http: HttpClient) {
  }

  getTasks(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  addTask(task: Tarea): Promise<Tarea> {
    return firstValueFrom(this.http.post<Tarea>(this.apiUrl, task));
  }

  updateTask(id: number, updatedTask: Tarea): Promise<Tarea> {
    return firstValueFrom(this.http.put<Tarea>(`${this.apiUrl}/${id}`, updatedTask));
  }

  deleteTask(id: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }
  
}
