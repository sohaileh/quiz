
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { validateAllFormFields } from 'src/app/utils/validateform';
import { LoaderService } from '../../../shared/services/loader.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup
  passwordModel: any = {}
  hide: Boolean = true;
  constructor( private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.createForm()
  }
  createForm() {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(null, []),
    })
  }

  showPassword() {
    this.hide = !this.hide
  }
}
