import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loading: boolean = false;

  public loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
    password: ['', Validators.required],
  });

  constructor(
    private as: AuthService,
    private modal: NgbActiveModal,
    private formBuilder: FormBuilder,
  ) { }

  public onSubmit() {
    if (this.loginForm.invalid) {
      return Object.values(this.loginForm.controls).forEach(control => {
        if (control instanceof FormGroup)
          Object.values(control.controls).forEach(ctrl => ctrl.markAsTouched());
        else
          control.markAsTouched();
      });
    }

    this.loading = true;

    const email = this.loginForm.getRawValue().email;
    const password = this.loginForm.getRawValue().password;

    this.as.login(email, password)
    .then(() => {
      this.loading = false;
      this.close(true);
    })
    .catch(error => {
      this.loading = false;
      console.error(error);
      // Swal.fire('¡Algo salio mal!', 'Por favor verifique sus credenciales e inténtelo nuevamente', 'error');
    });

  }

  public isInValid(input: string) {
    return this.loginForm.get(input)?.invalid && this.loginForm.get(input)?.touched;
  }

  public isValid(input: string) {
    return this.loginForm.get(input)?.valid;
  }


  public close(confirm: boolean): void {
    this.modal.close(confirm);
  }

  public dismiss(): void {
    this.modal.dismiss('closed');
  }

}
