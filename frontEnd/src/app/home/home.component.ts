import { Component, OnInit } from '@angular/core';
import { Authenticate } from '../shared/model/authenticate.model';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user: Authenticate;
  constructor(private authService: AuthService) {
   }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(x => {
      this.user = Object.assign(x); // Busca o valor de user autenticado no sistema;
    });

    if (!this.user) { // Verifica se o usuario é vazio, se for irá entrar no if
      this.user = JSON.parse(localStorage.getItem('user')) as Authenticate; // Busca o usuario na sessão
    }
  }

}
