import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService { // será add os métodos de consumo da API da model Tema

  constructor(private http: HttpClient) { } // criação do construtorhttp para permitir a utilização dos médotos http. Para o consumo do Tema, inicialmente foi criado a model tema, seguido da tema.service.ts (ng g s service/tema.)

  token = { // o objeto token irá receber um headers (name e value)
    headers: new HttpHeaders().set('Authorization', environment.token) // no método HttpHeaders() vou colocar valor de (nome, token) igual fazíamos no postman.
  }

  // são 3 tipos de gets referenciados no back-end: getAll getById getByNameTema
  getAllTema(): Observable<Tema[]>{ // método getAllTema faz um requisição ao back-end por meio de um get para pegar todos os temas . O observable garante que é pedido um objeto Tema[] e que é retornado um objeto do tipo Tema[]
    return this.http.get<Tema[]>('http://localhost:8080/tema', this.token) // this.token: criado no header
  }

  postTema(tema: Tema): Observable<Tema>{ //método tema recebe uma variável do tipo objeto Tema e a envia por meio de uma requisição  tipo post ao back-end. O Observable irá garantir que a variável tema seja do tipo Tema tanto em seu recebimento no front quanto na resposta da requisição pelo back-end.
    return this.http.post<Tema>('http://localhost:8080/tema', tema, this.token) // além do caminho do backend e a variável tem, o token é passado pois para poder dar um post é preciso estar logado.
  }

  getByIdTema(id: number): Observable<Tema>{
    return this.http.get<Tema>(`http://localhost:8080/tema/${id}`, this.token)
  }

  putTema(tema: Tema): Observable<Tema>{// após criar os componentes tema-edit (ng g c edit/tema-edit) e tema-delete (ng g c delete/tema-delete), e fazer as suas rotas em app.routing.module.ts. Voltar aqui em tema.component.ts para fazer os métodos de atualização de tema e dele.
    return this.http.put<Tema>('http://localhost:8080/tema', tema, this.token)
  }

  deleteTema(id: number){
    return this.http.delete(`http://localhost:8080/tema/${id}`, this.token) // abrir crase para conseguir passar o parâmetro id
  }

}
