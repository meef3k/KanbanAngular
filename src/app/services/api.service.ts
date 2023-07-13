import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Epic } from '../models/epic.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = "http://localhost:3000/epics";

  constructor(private http: HttpClient) { }

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
}
