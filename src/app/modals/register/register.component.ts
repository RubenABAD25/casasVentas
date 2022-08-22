import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
    password: ['', Validators.required],
  });

  constructor(
    private modal: NgbActiveModal,
    private formBuilder: FormBuilder,
  ) { }

  // public isInValid(input: string) {
  //   return this.loginForm.get(input)?.invalid && this.loginForm.get(input)?.touched;
  // }

  // public isValid(input: string) {
  //   return this.loginForm.get(input)?.valid;
  // }


  public close(confirm: boolean): void {
    this.modal.close(confirm);
  }

  public dismiss(): void {
    this.modal.dismiss('closed');
  }

}
