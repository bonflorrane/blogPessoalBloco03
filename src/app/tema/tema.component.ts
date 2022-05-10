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

  ngOnInit() {//será verificado a presença do token, assim como ocorreu no componente inicio. Já que para a pessoa ter acesso a página Tema ela deve estar logada. E caso deslogada, o menu e o rodapé não aparecem
    if(environment.token == ''){
      alert('Sua seção expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }
    this.findAllTemas()// toda vez que iniciar a página tema, mostrará todos temas
  }

  findAllTemas(){//para mostrar uma lista de temas (retorna um array de temas)
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }

  cadastrar(){// será chamado no botão cadastrar no html.
    this.temaService.postTema(this.tema).subscribe((resp:Tema) =>{//implementando o postTema
      this.tema = resp
      alert('Tema cadastrado com sucesso')
      this.findAllTemas()//após cadastrar, é pedido que mostre todos os temas de novo
      this.tema = new Tema() // com isso o ngModel = tema.descricao é apagado, mais por uma questão de UX
    })

  }

}
