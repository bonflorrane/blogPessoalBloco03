import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {// no path qdo fala que é direcionado para o componente login, é aqui em específico que vem(dúvida)

  userLogin: UserLogin = new UserLogin //Para que seja utilizado o [(ngModel)] é preciso que inicialmente o objeto userLogin seja declarado

  constructor(
    private auth: AuthService, //injetar a dependência authService
    private router: Router //injetar a dependencia router

  ) { }

  ngOnInit() {
    window.scroll(0,0)

  }

  entrar(){
    this.auth.entrar(this.userLogin).subscribe({//
      next:
      (resp: UserLogin)=> {
      this.userLogin = resp
      environment.token = this.userLogin.token// para acessar os atributos de userLogin é necessário criar uma variável global. Ir em enviroment.prod ( enviroment é um objeto que auxiliar a trabalhar com variáveis globais ). Todos os atributos digitados pelo usuário no login é armazenado em enviromentPontoAlgumaCoisa.
      environment.nome=this.userLogin.nome
      environment.foto=this.userLogin.foto
      environment.id =this.userLogin.id

      console.log(environment.token) //validação na qual consigo ver no console os erros: aqui confirmamos se realmente o token foi passado.
      console.log(environment.nome)
      this.router.navigate(['/inicio'])//  Router: direcionamento/novaRota. após o login, o usuário é direcionado a página início (neste momento a aplicação foi parada e o component início criado ng g c inicio). Logo em seguida, foi criada a rota de inicio em app-routing.module.ts
      },
      error: erro =>{
        if(erro.status == 401){
          alert('Usuario ou senha estão incorretos')
        }
      },
    });


  }
}
