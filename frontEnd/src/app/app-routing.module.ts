import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Rota inicial do sistema
  { path: 'login', component: LoginComponent }, // Rota login
  { path: 'cadastrar', component: CadastroComponent }, // Rota Cadastro
  { path: 'consultar', component: ConsultarComponent }, // Rota Consultar
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
