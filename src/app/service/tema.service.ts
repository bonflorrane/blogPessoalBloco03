import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService { // será add os métodos de consumo da API da model Tema

  constructor(private http: HttpClient) { } // criação do construtorhttp para permitir a utilização dos médotos http

  token = { // o objeto token irá receber um headers (name e value)
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  // são 3 tipos de gets referenciados no back-end: getAll getById getByNameTema
  getAllTema(): Observable<Tema[]>{ // método getAllTema
    return this.http.get<Tema[]>('http://localhost:8080/tema', this.token) // this.token: criado no header
  }

  postTema(tema: Tema): Observable<Tema>{
    return this.http.post<Tema>('http://localhost:8080/tema', tema, this.token)
  }

}
