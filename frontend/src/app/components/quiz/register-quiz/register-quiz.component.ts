import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
@Component({
  selector: 'app-register-quiz',
  templateUrl: './register-quiz.component.html',
  styleUrls: ['./register-quiz.component.scss']
})
export class RegisterQuizComponent implements OnInit {
  _id: any;
  registerModel:any={};
  registerForm: FormGroup;
  submitted = false;
  attemptQuizes:any=[];
  quizId: any;
  Quiz:any={};
  constructor(
    private fb: FormBuilder,
    private route:ActivatedRoute,
    private router:Router,
    private authService:AuthService,
    
  ) { }

  ngOnInit() {
    
      this.Quiz={quizId:this.route.snapshot.params.id};
      this. attemptQuizes.push(this.Quiz);    
      this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', [Validators.required]],
      password:['',Validators.required]
    }
    );
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.registerModel=this.registerForm.value;
      this.registerModel.role="Student";
      this.registerModel.attemptQuizes=this.attemptQuizes;
      this.authService.register(this.registerModel).subscribe({
        next: (response: any) => {
          console.log(response)
          if (response.statusCode == 201) {
            this.registerForm.reset();
            this.registerModel = {};
            this.router.navigate([`/attempt-quiz/${response.quizId._id}`]);
          } else {
            this.registerForm.reset();
            this.registerModel = {};
            this.router.navigate([`/attempt-quiz/${response.quizId._id}`]);
          }
        },
        error: (err: any) => {
          alert(err.message);
        },
        complete: () => {
          alert("user registered successfully");
          
        
        },
      });
    }
    }
  }

