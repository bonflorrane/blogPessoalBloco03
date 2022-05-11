import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem() // foi criada somente no início do CRUD de Postagem [ Model Postagem -> ServicePostagem ng g s service/postagem -> criou método postPostagem em service.postagem.ts -> veio aqui instanciar a variável postagem]
  listaPostagens: Postagem[]

  tema: Tema = new Tema
  listaTemas: Tema[]
  idTema: number

  user: User = new User
  idUser = environment.id


  constructor(
    private router: Router,// mpara mandar de inicio para a rota entrar é preciso inicialmente injetar a dependência Router
    private postagemService: PostagemService,// injetando a dependência servicepostagem
    private temaService: TemaService, // injetando a dependencia de TemaService pois acessaremos a lista de temas
    private authService: AuthService

  ) { }

  ngOnInit() {// ao iniciar o componente inicio, verifique se tem token
    if(environment.token == ''){
      alert('Sua seção expirou, faça o login novamente.')
      this.router.navigate(['/entrar']) // navega de inicio para entrar (login)

    }
    this.authService.refreshToken();
    this.getAllTemas(); // já no início da página todos os métodos são mostrados
    this.getAllPostagens() // todas postagens vão aparecer ao iniciar a página

  }

  getAllTemas(){// o array listaTemas recebe todos os temas
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas=resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=>{
      this.listaPostagens = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp:User)=>{
      this.user = resp
      console.log(this.user)
    })

  }

  publicar(){
    this.tema.id = this.idTema // o postagem.tema recebe o  idTema que vem do ngMOdel
    this.postagem.tema =this.tema //o objeto postagem recebe este tema que é preenchido por this.id

    this.user.id = this.idUser // pegando o id do user que está logado
    this.postagem.usuario = this.user // peguei o usuário certo em cima e passo para a postagem

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      alert('Postagem realizada com sucesso!')
      this.postagem = new Postagem() //limpa os campos do modal
      this.getAllPostagens() // após publicar a postagem ,já aparecer todas postagens atualizadas
    })

  }

}
