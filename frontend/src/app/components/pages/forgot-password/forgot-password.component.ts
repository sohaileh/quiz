
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { validateAllFormFields } from 'src/app/utils/validateform';
import { HomePageService } from '../../shop/services/home-page.service';
import { LoaderService } from '../../shared/services/loader.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup
  passwordModel: any = {}
  hide: Boolean = true;
  constructor(private homePageService: HomePageService, private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.createForm()
  }
  createForm() {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(null, []),
    })
  }
  reset() {
    validateAllFormFields(this.forgotPasswordForm)
    this.loaderService.showLoader();
    if (!this.forgotPasswordForm.valid) {
      return
    } else {
      this.passwordModel = this.forgotPasswordForm.value
      this.passwordModel.baseUrl = "kashmirsearch.com"
      this.passwordModel.siteX = "Kashmir Search"
      this.passwordModel.site = localStorage.getItem(("siteId"))
      this.passwordModel.systemUser = 0
      if(this.passwordModel.password===this.passwordModel.Rpassword){
      this.homePageService.ForgotPassword(this.passwordModel).subscribe({
        next: (response: any) => {
          if (response.statusCode == 200) {
            alert(response.message)
            this.forgotPasswordForm.reset()
          } else {
            alert(response.message)
            this.forgotPasswordForm.reset()
            this.passwordModel={}
          }
          this.loaderService.hideLoader();
        },
        complete: () => {
        },
        error: (err: any) => {
        }
      })
    }else{
     
      alert("Password & Retype Password should be same")
    }
    }
  }
  showPassword() {
    this.hide = !this.hide
  }
}
