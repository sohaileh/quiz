import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { validateAllFormFields } from "src/app/utils/validateform";
// import { HomePageService } from '../../shop/services/home-page.service';
import { ActivatedRoute, Router } from "@angular/router";
import { LoaderService } from "src/app/components/shared/services/loader.service";
import { AuthService } from "../../services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  registerForm: FormGroup;
  authModel: any = {};
  @ViewChild("container", { static: false }) public container;
  userModel: any;
  hide:boolean=true;
  errMessage=''
  @ViewChild('f') regForm;
  constructor(
    public router: Router,
    private loaderService: LoaderService,
    private readonly authService: AuthService,
    private renderer: Renderer2,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.form();  
  }
  createForm() {
    this.loginForm = new FormGroup({
      emailAddress: new FormControl(null, [Validators.required,
      Validators.email, Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]),
      password: new FormControl(null,Validators.required),
    });
  }
  get signIn(){
    return this.loginForm.controls;
  }
  signinup(btn: any, container: any) {
    const action = btn.innerText == "SIGN UP" ? "addClass" : "removeClass";
    action == "removeClass"
      ? this.renderer.removeClass(container, "sign-up-mode")
      : this.renderer.addClass(container, "sign-up-mode");
  }
  onSubmitLogin() {
    validateAllFormFields(this.loginForm);
    this.loaderService.showLoader();
    if (!this.loginForm.valid) {
      return;
    } else {
      this.authModel = this.loginForm.value;
      this.authService.login(this.authModel).subscribe({
        next: (response: any) => {
          if (response.statusCode == 200) {
            localStorage.setItem("userId", response.user._id);
            // console.log("userId", response);
            this.loginForm.reset();
            const redirectUrl = this.route.snapshot.queryParamMap.get('redirectURL')
            redirectUrl?this.router.navigate([`/${redirectUrl}`]):this.router.navigate(["/home/dashboard"]);
          } else {
            this.loginForm.reset();
            localStorage.setItem("userId", response.user._id);
            const redirectUrl = this.route.snapshot.queryParamMap.get('redirectURL')
            redirectUrl?this.router.navigate([`/${redirectUrl}`]):this.router.navigate(["/home/dashboard"]);
          }
          this.loaderService.hideLoader();
        },
        error: (err: any) => {
          console.log();
        },
        complete: () => {
          this.authModel = {};
        },
      });
    }
  }
  // showPassword() {
  //   this.hide = !this.hide
  // }
  register() {
    // validateAllFormFields(this.registerForm);
    // this.loaderService.showLoader();
   if (!this.registerForm.valid) {
      return;
    } else {
      this.userModel = this.registerForm.value;
      console.log(this.userModel);
      this.authService.register(this.userModel).subscribe({
        next: (response: any) => {
          if (response.statusCode == 201) {
            
            this.registerForm.reset();
            this.regForm.resetForm();
            this.userModel = {};
          } else {
            this.regForm.resetForm();
            this.registerForm.reset();
            this.userModel = {};
          }
          this.loaderService.hideLoader();
        },
        error: (err: any) => {
          console.log('error',err)
        },
        complete: () => {
          this.registerForm.clearValidators();
        },
      });
    }
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }
  form() {
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null,[ Validators.required]),
      emailAddress: new FormControl(null, [
        Validators.required,
        Validators.email, Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")
      ]),
      password: new FormControl(null, [Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),Validators.minLength(8)])
    });
    
  }
  get formError() {
    return this.registerForm.controls;
  }
  // onChange(event: any) {
  //   this.newVal = event.target.value;
  //   if (this.newVal == "Student") {
  //     this.registerForm.controls.organization.setValue("") ;
  //     this.registerForm.get("firstName").setValidators(Validators.required);
  //     this.registerForm.get("lastName").setValidators(Validators.required);
  //     this.registerForm.get("organization").clearValidators();
  //     this.isShow = true;
  //   } else if (this.newVal == "Organisation") {
  //     this.registerForm.controls.firstName.setValue("") ;
  //     this.registerForm.controls.lastName.setValue("") ;
  //     this.registerForm.get("firstName").clearValidators();
  //     this.registerForm.get("lastName").clearValidators();
  //     this.registerForm
  //       .get("organization")
  //       .setValidators(Validators.required);
  //     this.isShow = false;
  //   }
  // }
}
