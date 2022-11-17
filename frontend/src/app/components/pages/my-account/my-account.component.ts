import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { validateAllFormFields } from 'src/app/utils/validateform';
// import { HomePageService } from '../../shop/services/home-page.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../shared/services/loader.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  loginForm: FormGroup
  hide: Boolean = true;
  authModel: any
  constructor( private router: Router,
    private loaderService: LoaderService, private readonly authService:AuthService) { }

  ngOnInit(): void {
    this.createForm()
  }
  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, []),
      password: new FormControl(null, []),
    })
  }
  login() {
    validateAllFormFields(this.loginForm)
    this.loaderService.showLoader();
    if (!this.loginForm.valid) {
      
      return
    } else {
      this.authModel = this.loginForm.value
      // this.authModel.baseUrl = "kashmirsearch.com"
      
      this.authService.login(this.authModel).subscribe({
        next: (response: any) => {
          if (response.statusCode == 200) {
            this.loginForm.reset()
            alert("User authenticated")
          } else {
            this.loginForm.reset()
            console.log('rec')
            alert(response.message)
          }
          this.loaderService.hideLoader();
        },
        complete: () => {
          this.authModel = {};
        },
        error: (err: any) => {
        }
      })
    }
  }
  showPassword() {
    this.hide = !this.hide
  }
}
