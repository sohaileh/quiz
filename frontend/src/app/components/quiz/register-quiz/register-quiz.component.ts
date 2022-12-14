import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { QuizService } from '../services/quiz.service';
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
   private quizService:QuizService
    
  ) { }

  ngOnInit() {
      this.quizId=this.route.snapshot.params.id
      this.attemptQuizes.push(this.Quiz);    
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
      this.registerModel.quizId= this.quizId
      this.quizService.isQuizAssigned(this.registerModel).subscribe({
        next: (response: any) => {
            const quizId=response[0].quizId
          if (response.statusCode == 201) {
            console.log('res',response)
            this.registerForm.reset();
            this.registerModel = {};
            this.router.navigate([`/student/quiz-attempt/${quizId}`]);
          } else {
            this.registerForm.reset();
            this.registerModel = {};
            this.router.navigate([`/student/quiz-attempt/${quizId}`]);

          }
        },
        error: (error) => {
          alert(error.error);
        },
        complete: () => {
         
          
        
        },
      });
    }
    }
  }

