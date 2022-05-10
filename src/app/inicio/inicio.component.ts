import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private router: Router// mpara mandar de inicio para a rota entrar é preciso inicialmente injetar a dependência Router
  ) { }

  ngOnInit() {// ao iniciar o componente inicio, verifique se tem token
    if(environment.token == ''){
      alert('Sua seção expirou, faça o login novamente.')
      this.router.navigate(['/entrar']) // navega de inicio para entrar (login)

    }
  }

}
