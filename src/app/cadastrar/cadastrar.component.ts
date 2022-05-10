import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {// pode ser acessado de qq lugar app.routing

  user: User = new User// Precisamos aqui trazer o objeto user
  confirmarSenha: string // vai receber o valor da senha
  tipoUsuario:string

  constructor(
    private authService: AuthService, //referenciando o Service (authService) e importa AuthService: injeção de dependência
    private router: Router // injetar uma dependencia chamada Router
  ) { }

  ngOnInit() {
    window.scroll(0,0) //para que o usuário fique no topo da tela
  }

  confirmaSenha(event: any){ //o método confirmaSenha recebe qualquer evento
    this.confirmarSenha = event.target.value  //a variável confirmarSenha será igual ao valor atribuido ao input

  }

  tipoUser(event: any){// o método tipoUser recebe um evento
    this.tipoUsuario = event.target.value //a variável tipoUsuário receberá o valor do input
  }

  cadastrar(){// método cadastrar será chamado no html no botão cadastrar por meio de um evento de clique.

    this.user.tipo =this.tipoUsuario // pegar o tipo de usuário (user.tipo) e colocar dentro da variável tipoUsuário

    if(this.user.senha != this.confirmarSenha){ //Comparação de senhas
      alert('As senhas estão incorretas.')
    } else{
      this.authService.cadastrar(this.user).subscribe((resp: User) => {// o cadastrar depende do authService para fazer o cadastro. O usuario que está sendo preenchido(this.user) é transformado em um objeto Jason (subscribe sobrescreve o objeto typescript para Jason) para que o servidor entenda a requisição. Por meio de uma aero function: variável resposta irá reponder um User.
        this.user = resp
        this.router.navigate(['/entrar']) // após o cadastro, quero que o usuário seja direcionado para a rota interna de entrar. Chama o router para isto.
        alert('Usuário cadastrado com sucesso!')

      })
    }
  }
}
