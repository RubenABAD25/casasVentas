import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  private files!: File[];

  public images: string[] = [];

  public registerForm = this.formBuilder.nonNullable.group({
    image: ['', Validators.required],
    title: ['', [Validators.required]],
    description: ['', Validators.required],
    price: [0, Validators.required],
  });

  constructor(
    private ps: ProductService,
    private modal: NgbActiveModal,
    private formBuilder: FormBuilder,
  ) { }

  public onSubmit() {
    if (this.registerForm.invalid) {
      return Object.values(this.registerForm.controls).forEach(control => {
        if (control instanceof FormGroup)
          Object.values(control.controls).forEach(ctrl => ctrl.markAsTouched());
        else
          control.markAsTouched();
      });
    }
    const image = this.registerForm.getRawValue().image;
    const title = this.registerForm.getRawValue().title;
    const description = this.registerForm.getRawValue().description;
    const price = this.registerForm.getRawValue().price;

    console.log(this.files, title, description, price);

    const product: Product = {
      title: title,
      price: price,
      description: description,
    };

    this.ps.create(product, this.files)
    .then(res=>{
      this.close(true);
      alert('Vivienda registrada');
    })
    .catch(e=>console.error(e))
  }

  public loadFile(event: any) {
    this.files = <File[]>event.target.files;
    for (const file of this.files) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const src = reader.result;
        if (typeof src == 'string') {
          this.images.push(src);
          console.log(src);
        }
      }
    }
  }

  public isInValid(input: string) {
    return this.registerForm.get(input)?.invalid && this.registerForm.get(input)?.touched;
  }

  public isValid(input: string) {
    return this.registerForm.get(input)?.valid;
  }


  public close(confirm: boolean): void {
    this.modal.close(confirm);
  }

  public dismiss(): void {
    this.modal.dismiss('closed');
  }

}
