import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authenticate } from './shared/model/authenticate.model';
import { AuthService } from './shared/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Projeto';
  public teste: any;
  public user = {} as Authenticate;

  constructor(// Serve para fazer todo o crud basico da aplicação, comunicação com o backEnd
    private authService: AuthService,// AuthService serve para receber e armazenar/enviar informações da autenticação;
    private router: Router, // Router Modulo serve para navegação nas rotas
    )
  {
    localStorage.setItem('user', JSON.stringify(this.user)); // Cria a sessão vazia.
    this.authService.getAuth().subscribe(x => { // Se inscreve para receber qlq alteração de permissao do usuario
      this.user = Object.assign(x); // recebe o usuario e clona o objeto de usuario para que ele mude de posição na memoria
      localStorage.setItem('user', JSON.stringify(this.user)); // insere o valor recebido na sessão
    });
  }

  public logout(){
    this.authService.setAuth({authenticate: false} as Authenticate); // Desloga o usuario do sistema alterando o valor de authenticate para false;
    this.router.navigate(['']);// Navega pára rota inicial do sistema que é a home
  }

}
