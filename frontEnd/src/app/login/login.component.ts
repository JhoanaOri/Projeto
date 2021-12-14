import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { Authenticate } from '../shared/model/authenticate.model';
import { AuthService } from '../shared/service/auth.service';
import { BaseCrudService } from '../shared/service/base-crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private service: BaseCrudService,
    private dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required], // cria as propriedades do form para receber as informações dos inputs
      password: ['', Validators.required]
    });
  }

  ngOnInit(){
    // if (await this.authService.checkAuthenticated()) {
    //   await this.router.navigate([this.returnUrl]);
    // }
  }

  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;

        this.service.findByUser(username, password).subscribe(x => {
          if ( x ) {
            this.authService.setAuth({authenticate: true} as Authenticate);// Set autenticação true;
            var dialogRef = this.dialog.open(DialogComponent, {
              width: '80%',
              data: {mensagem: 'Login realizado com sucesso'}
            });
        
            dialogRef.afterClosed().subscribe((result) => {
              this.router.navigate(['']);
            });
          } else {
            this.authService.setAuth({authenticate: false} as Authenticate);
            this.form.controls['username'].setErrors({valid: false}); // coloca erro no campo input
            this.form.controls['password'].setErrors({valid: false});
          }
        })
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

}
