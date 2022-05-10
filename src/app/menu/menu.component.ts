import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nome = environment.nome //ao entrar o nome, token, foto e o id do usuário é passado para o enviroment. Estes atributos são trazidos em uma variável local ao menu. E isto ocorre, pois em menu a foto e o nome do usuário são dinâmicos
  foto = environment.foto


  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
/* Antes de criar o método sair: em inicio.component.ts verificamos a presença do token e direcionamos inicio para login. Em seguida, Fomo em menu.component.html e criamos o evento click que irá chamar o método sair() e então aqui no menu.component.ts criamos o método*/

  sair(){// método sair será chamado no botão sair por meio de um evento click
    this.router.navigate(['/entrar'])// sair direcionará a página para login  e além disso, limpa todos os environments ( ao zerar os environments o menu e o rodapé somem e o usuário é deslogado)
    environment.token = ''
    environment.nome = ''
    environment.foto = ''
    environment.id = 0

  }

}
