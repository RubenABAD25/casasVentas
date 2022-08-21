import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class RegisterComponent{

  constructor(private modal: NgbActiveModal) { }

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
