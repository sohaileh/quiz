import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { validateAllFormFields } from 'src/app/utils/validateform';
import { HomePageService } from '../../shop/services/home-page.service';
import { LoaderService } from '../../shared/services/loader.service';
import { AuthService } from '../services/auth.service';
 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup
  userModel: any = {}
  hide: Boolean = true;
  constructor(private authService: AuthService,private loaderService:LoaderService) { }

  ngOnInit(): void {
    this.createForm()
  }
  createForm() {
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, []),
      lastName: new FormControl(null, []),
      emailAddress: new FormControl(null, []),
      password: new FormControl(null, []),
    })
  }
  register() {
    validateAllFormFields(this.registerForm)
    this.loaderService.showLoader();
    if (!this.registerForm.valid) {
      return
    } else {
      this.userModel = this.registerForm.value
      // this.userModel.baseUrl = "kashmirsearch.com"
      // this.userModel.systemUser = 0
      // this.userModel.alias= "abc"
      // this.userModel.loginEmailAddress=this.userModel.emailAddress
      // this.userModel.site=localStorage.getItem(("siteId"))
      // this.userModel.siteRoleType=63
      // this.userModel.supervisor=0
      // this.userModel.varifyEmail=false,
      // this.userModel.cellPhone="9876546790"
      // this.userModel.lastLogin="2022-08-03T11:14:25.691Z"
      // this.userModel.failedLoginCount=0
      // this.userModel.isActive=true
      // this.userModel.createdBySystemUser=0
      // this.userModel.createdOnDate="2022-08-03T11:14:25.691Z"
      // this.userModel.updatedBySystemUser= 0
      // this.userModel.updatedOnDate="2022-08-03T11:14:25.691Z"
      // this.userModel.isActiveDirectory= true
      // this.userModel.googleKey="AIzaSyDcNokcpLBZxrK0YL6w9jD7Qhboqp-u8wo"
      // this.userModel.isLocked= true
      // this.userModel.activationKey="BAC"
     
      this.authService.register(this.userModel).subscribe({
        next: (response: any) => {
          if (response.statusCode == 201) {
            console.log(response)
            alert("User Registered Successfully")
            this.registerForm.reset()
            this.userModel = {};
          } else {
            
            alert('registered')
            this.registerForm.reset()
            this.userModel = {};
          }
          this.loaderService.hideLoader();
        },
        complete: () => {
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