import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {
  tema: Tema = new Tema() // instanciando a variável do tipo objeto Tema

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute // fornece a rota ativa
  ) { }

  ngOnInit() {// garantir que usuario está logado
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }
    let id = this.route.snapshot.params['id']// o id está sendo pego da rota ativa
    this.findByIdTema(id) // com o id, eu trago o tema
  }
  findByIdTema(id:number){// o id está vindo da rota ques está ativa no momento por isso a dependência ActivetedRoute
    this.temaService.getByIdTema(id).subscribe((resp: Tema)=>{
      this.tema = resp// a variável tema instanciada recebe a resposta do tema
    })
  }

  atualizar(){
    this.temaService.putTema(this.tema).subscribe((resp:Tema)=>{
    this.tema = resp
    alert('Tema atualizado com sucesso')
    this.router.navigate(['/tema'])
    })
  }

}
