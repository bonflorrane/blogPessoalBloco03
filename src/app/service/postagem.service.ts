import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { } // criação do construtorhttp para permitir a utilização dos médotos http. Para o consumo do Tema, inicialmente foi criado a model tema, seguido da tema.service.ts (ng g s service/tema.)

  token = { // o objeto token irá receber um headers (name e value)
    headers: new HttpHeaders().set('Authorization', environment.token) // no método HttpHeaders() vou colocar valor de (nome, token) igual fazíamos no postman.
  }

  // criar o endpoint
  getAllPostagens(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>('http://localhost:8080/postagens', this.token)
  }

  postPostagem(postagem: Postagem): Observable<Postagem>{
    return this.http.post<Postagem>('http://localhost:8080/postagens',postagem, this.token)
  }
}
