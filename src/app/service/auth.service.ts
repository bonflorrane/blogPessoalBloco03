import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {//A Service irá acessar os endpoints criados no backend, tendo 2 métodos principais (entrar e cadastrar)

  constructor(
    private http: HttpClient //é necessário fazer o import do médoto HttpClient. No entanto, para que isto ocorra aqui. É necessário, ir antes em: app.modules: (1- em imports:[escrever HttpClientModule]) -> (2 - é necessário adicionar o import dele na primeira linha do programa, não é feito automaticamente: import{HttpClientModule} from '@angular/common/http')
  ) { }

  entrar(userLogin: UserLogin): Observable<UserLogin>{// precisa receber uma variável  que tem um tipo objeto por causa da model UserLogin(parâmetro)do tipo UserLogin(model criada). Observable: garante que um userLogin será adicionado aqui (garante a ida e a volta como Json do tipo UserLogin)
    return this.http.post<UserLogin>('http://localhost:8080/usuarios/logar', userLogin) // irá retornar um post  do tipo UserLogin(caminho porta do back-end, passando o objeto recebido como parâmetro, e que quero enviar para o back-end)
  }

  cadastrar(user:User):Observable<User>{//precisa de um objeto do tipo User, sendo que é garantido que um user será adicionado aqui
    return this.http.post<User>('http://localhost:8080/usuarios/cadastrar', user)// <User>: garante que será entregue um usuário do tipo User para o endpoint
  }

  logado(){//método logado para saber se o usuário está logado ou não ( se um token foi gerado ou não). Lembrando que o token só é gerado quando a pessoa clica em entrar.
    let ok: boolean = false

    if(environment.token != ''){
      ok = true
    }
    return ok
  }


}
