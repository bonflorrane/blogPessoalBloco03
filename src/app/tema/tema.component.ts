import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {
  tema: Tema = new Tema() // precisa instanciar o objeto tema que será pego pelos NgModule
  listaTemas: Tema[] // observable joga os dados neste array


  constructor(
    private router: Router,
    private temaService: TemaService

  ) { }

  ngOnInit() {
    if(environment.token == ''){
      alert('Sua seção expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }
    this.findAllTemas()// toda vez que iniciar a página tema, mostrará todos
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }

  cadastrar(){
    this.temaService.postTema(this.tema).subscribe((resp:Tema) =>{
      this.tema = resp
      alert('Tema cadastrado com sucesso')
      this.findAllTemas() 
      this.tema = new Tema() // com isso o ngModel = tema.descricao é apagado, mais por uma questão de UX
    })

  }

}
