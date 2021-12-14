import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/model/user.model';
import { BaseCrudService } from '../shared/service/base-crud.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  private returnUrl: string;

  public user = {} as User;
  
  constructor(
    private fb: FormBuilder,
    private service: BaseCrudService,
    protected location: Location,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required], // cria as propriedades do form para receber as informações dos inputs
      email: ['', Validators.email],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    const currentState = (this.location.getState() as any);
    this.buscarUsuario((currentState.id) ? currentState.id : null);
  }

  private buscarUsuario(id: string){
    if (this.ehEditar() && id !== null) {
      this.service.findById(id).subscribe(x => {
        this.user = x;
      })
    }
  }

  public ehEditar(): boolean{
    return this.getState().editar;
  }

  getState() {
    return this.location.getState() as any || {};
  }

  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const password = this.form.get('password')?.value;
        const passwordConfirmation = this.form.get('passwordConfirmation')?.value;

        const passwordEhIgual = password === passwordConfirmation;

        if (passwordEhIgual && (this.user.id == null || this.user.id == undefined)) {
          this.service.create(this.user).subscribe(x => {
            this.mensagem('Salvo com sucesso');
          });
        } else if (passwordEhIgual) {
          this.service.update(this.user).subscribe(x => {
            this.mensagem('Editado com sucesso');
          });
        } else {
          this.form.controls['password'].setErrors({valid: false}); // coloca erro no campo input
          this.form.controls['passwordConfirmation'].setErrors({valid: false});
        }

      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

  private mensagem(mensagem: string){
    var dialogRef = this.dialog.open(DialogComponent, {
      width: '80%',
      data: {mensagem: mensagem}
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate(['']);
    });
  }

}
