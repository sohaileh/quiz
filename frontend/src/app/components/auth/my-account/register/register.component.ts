// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../services/auth.service';
// import { LoaderService } from 'src/app/components/shared/services/loader.service';
// import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { validateAllFormFields } from 'src/app/utils/validateform';
// import { Router } from '@angular/router';
// import Swal from 'sweetalert2';
// import { BaseCdkCell } from '@angular/cdk/table';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss']
// })
// export class RegisterComponent implements OnInit {

//   registerForm: FormGroup
//   userModel: any = {}
//   hide: Boolean = true;
//   userId:any={};
//   firstName:any
//   lastName:any
//   email:any
//   user:any={}
//   emailReadOnly:boolean=false
//   updatePasswordEnable:boolean=false

//   constructor(private fb:FormBuilder,private authService: AuthService,private loaderService:LoaderService,public router:Router) { }

//   ngOnInit(): void {
//     this.createForm()
//     this.userId= localStorage.getItem('userId')
//     if(this.router.url=="/auth/register"){
//       this.registerForm.reset()
//     }
//     else{
//       this.updatePasswordEnable=true
//     this.getLoggedUser()

//     }
//   }
//   createForm() {
//     this.registerForm = new FormGroup({
//       firstName: new FormControl(null, []),
//       lastName: new FormControl(null, []),
//       emailAddress: new FormControl(null, []),
//       password: new FormControl(null, []),
//     })
//   }
//   register() {
//     validateAllFormFields(this.registerForm)
//     this.loaderService.showLoader();
//     if (!this.registerForm.valid) {
//       return
//     } else {
//       this.userModel = this.registerForm.value

//       this.authService.register(this.userModel).subscribe({
//         next: (response: any) => {
//           if (response.statusCode == 201) {
//             console.log(response)
//             Swal.fire("User Registered Successfully")
//             this.registerForm.reset()
//             this.userModel = {};
//           } else {

//             Swal.fire('registered')
//             this.registerForm.reset()
//             this.userModel = {};
//           }
//           this.loaderService.hideLoader();
//         },

//         error: (err: any) => {
//           Swal.fire(err.message)
//         }, complete: () => {
//         }
//       })
//     }
//   }
//   showPassword() {
//     this.hide = !this.hide
//   }

//   getLoggedUser(){
//     this.user.id= this.userId
//     this.authService.getLoggedUser(this.user).subscribe((response:any)=>{

//       this.firstName= response.loggedUserDetails.firstName;
//       this.lastName= response.loggedUserDetails.lastName;
//       this.email= response.loggedUserDetails.emailAddress;
//       this.emailReadOnly= true;
//       this.registerForm= this.fb.group({
//         emailAddress: new FormControl({value:' ',disabled:this.emailReadOnly})
//       })
//     })
//   }

//   back(){
//     this.router.navigate(['/home/dashboard'])
//   }

//   update(password:any){
//     this.user.password = password;
//     this.authService.update(this.user).subscribe((res:any)=>{
//       this.authService.logout()
//       this.router.navigate(['/login'])
//     })
//   }
// }

import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { LoaderService } from "src/app/components/shared/services/loader.service";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { validateAllFormFields } from "src/app/utils/validateform";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  organizations = [];
  registerForm: FormGroup;
  userModel: any = {};
  hide: Boolean = true;
  userRole: any;
  userId: any;
  firstName: any;
  lastName: any;
  emailAddress: any;
  password: any;
  user: any = {};
  emailReadOnly: boolean = false;
  updatePasswordEnable: boolean = false;
  constructor(
    private authService: AuthService,
    private loaderService: LoaderService,
    public router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.userId = localStorage.getItem("userId");
    if (this.router.url == "/auth/register") {
      this.registerForm.reset();
    } else {
      this.updatePasswordEnable = true;
      this.getLoggedUser();
    }
    this.authService.userDetails.subscribe((response: any) => {
      this.userRole = localStorage.getItem("userRole");
      if (this.userRole !== "admin" || this.userRole !== "admin") {
        this.getOrganizations();
      }
    });
  }

  createForm() {
    this.registerForm = new FormGroup({
      organization: new FormControl(null, []),
      firstName: new FormControl(null, []),
      lastName: new FormControl(null, []),
      emailAddress: new FormControl(null, []),
      password: new FormControl(null, []),
      role: new FormControl(null, []),
    });
  }
  register() {
    validateAllFormFields(this.registerForm);
    this.loaderService.showLoader();
    if (!this.registerForm.valid) {
      return;
    } else {
      this.userModel = this.registerForm.value;
      console.log("usermodel", this.userModel);

      this.authService.register(this.userModel).subscribe({
        next: (response: any) => {
          if (response.statusCode == 201) {
            Swal.fire("User Registered Successfully");
            this.registerForm.reset();
            this.userModel = {};
          } else {
            Swal.fire("registered");
            this.registerForm.reset();
            this.userModel = {};
          }
          this.loaderService.hideLoader();
        },

        error: (err: any) => {
          Swal.fire(err.message);
        },
        complete: () => {},
      });
    }
  }
  showPassword() {
    this.hide = !this.hide;
  }

  getLoggedUser() {
    this.user.id = this.userId;
    this.authService.getLoggedUser(this.user).subscribe((response: any) => {
      this.firstName = response.loggedUserDetails.firstName;
      this.lastName = response.loggedUserDetails.lastName;
      this.emailAddress = response.loggedUserDetails.emailAddress;
      this.emailReadOnly = true;

      this.registerForm = this.fb.group({
        emailAddress: new FormControl({
          value: "",
          disabled: this.emailReadOnly,
        }),
      });
    });
  }
  back() {
    this.router.navigate(["/home/dashboard"]);
  }
  update(password: any) {
    this.user.password = password;

    this.authService.update(this.user).subscribe(
      (res: any) => {
        this.authService.logout();
        this.router.navigate(["/auth/login"]);
      },
      (err: any) => {
        Swal.fire(err.message);
      },
      () => {}
    );
  }

  getOrganizations() {
    this.authService.getOrganizations().subscribe(
      (res: any) => {
        console.log("organizations", res);
        this.organizations = res;
      },
      (error) => {},
      () => {}
    );
  }
}
