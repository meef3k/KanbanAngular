import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Epic } from '../models/epic.model';
import { Task } from '../models/task.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = "http://localhost:3000/epics";
  private taskUrl: string = "http://localhost:3000/tasks";
  private userUrl: string = "http://localhost:3000/users";

  constructor(private http: HttpClient) { }

  getUserId(id: number) {
    return this.http.get<User>(`${this.userUrl}/${id}`)
  }

  postEpicCreate(createObj: Epic) {
    return this.http.post<Epic>(`${this.baseUrl}`, createObj)
  }

  getEpics() {
    return this.http.get<Epic[]>(`${this.baseUrl}`)
  }

  updateEpic(registerObj: Epic, id: number) {
    return this.http.put<Epic>(`${this.baseUrl}/${id}`, registerObj)
  }

  deleteEpic(id: number) {
    return this.http.delete<Epic>(`${this.baseUrl}/${id}`)
  }

  getEpicId(id: number) {
    return this.http.get<Epic>(`${this.baseUrl}/${id}`)
  }

  getTasks(id: number){
    return this.http.get<Task[]>(`${this.baseUrl}/${id}/tasks`)
  }

  postTaskCreate(createObj: Task) {
    return this.http.post<Task>(`${this.taskUrl}`, createObj)
  }

  updateTask(registerObj: Task, id: number) {
    return this.http.put<Task>(`${this.taskUrl}/${id}`, registerObj)
  }

  deleteTask(id: number) {
    return this.http.delete<Task>(`${this.taskUrl}/${id}`)
  }

  getTaskId(id: number) {
    return this.http.get<Task>(`${this.taskUrl}/${id}`)
  }
}
