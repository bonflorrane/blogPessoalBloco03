import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User
  confirmarSenha: string // vai receber o valor da senha
  tipoUsuario:string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0) //para que o usuário fique no topo da tela

  }

  confirmaSenha(event: any){
    this.confirmarSenha = event.target.value  //o que o input receber é atribuido para o this.confirmaSenha

  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  }

  cadastrar(){

    this.user.tipo =this.tipoUsuario

    if(this.user.senha != this.confirmarSenha){
      alert('As senhas estão incorretas')
    } else{
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/entrar'])
        alert('Usuário cadastrado com sucesso!')

      })
    }
  }
}
