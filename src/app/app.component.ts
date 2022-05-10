import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public auth: AuthService// foi instanciado neste ponto para que fosse possível fazer a lógica do método logado() que está em auth.service.ts no app.component.html. É public para ser acessado além do documento ts, que no caso é o html.

  ){}

}
