import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { LoginComponent } from 'src/app/modals/login/login.component';
import { RegisterComponent } from 'src/app/modals/register/register.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public isAdmin: boolean = false;
  public isLoggedIn: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private as: AuthService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    const sub = this.as.authStatus()
      .subscribe({
        next: data => {
          if (data?.uid != null)
            this.isLoggedIn = true;
          else
            this.isLoggedIn = false;

          this.as.hasRoles(['admin'])
            .then(res => {
              this.isAdmin = res;
            })
            .catch(e => console.error(e))

        },
        error: e => console.error(e),
        complete: () => console.info("Comprobacion de autenticacion completada")
      });
    this.subscriptions.push(sub);


  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  register() {
    const modal = this.modalService.open(RegisterComponent, { size: 'md' });
    modal.result
      .then(confirm => {
        console.log('Confirm:', confirm);
      })
      .catch(e => console.error(e))
  }

  login() {
    const modal = this.modalService.open(LoginComponent);
    modal.result.then(confirm => {
      console.log('Confirm:', confirm);
      // if (confirm)
      //   this.eliminarProducto();
    })
      .catch(e => console.error(e));
  }

  logout() {
    this.as.logout().then(() => {
      this.isLoggedIn = false;
    })
      .catch(e => console.error(e));
  }

}
