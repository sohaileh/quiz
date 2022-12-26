import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../../admin/services/admin.service';
import { AuthService } from '../../auth/services/auth.service';
import { QuizService } from '../services/quiz.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../../shared/info-dialog/info-dialog.component';
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
  quizTitle: any;
  quizStatus: any;
  constructor(
    private fb: FormBuilder,
    private route:ActivatedRoute,
    private router:Router,
   private quizService:QuizService,
   private adminService:AdminService,
   private dialog: MatDialog
    
  ) { }

  ngOnInit() {
      this.quizId=this.route.snapshot.params.id
      this.attemptQuizes.push(this.Quiz);    
      this.registerForm = this.fb.group({
      emailAddress: ['', [Validators.required]],
      password:['',Validators.required]
    }
    );
    // this.quizId= localStorage.getItem('quizId')
    this.adminService.getQuizQuestions(this.quizId).subscribe({
      next:(response:any)=>{
        this.quizTitle=response.quizTitle
        this.quizStatus= response.status
      },
      error:(error)=>{
        console.log(error.error.message)
      },
      complete:()=>{}
    })
   
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.registerModel=this.registerForm.value;
      this.registerModel.role="student";
      this.registerModel.attemptQuizes=this.attemptQuizes;
      this.registerModel.quizId= this.quizId

      this.quizService.isQuizAssigned(this.registerModel).subscribe({
        
        next: (response: any) => {
            const quizId=response[0].quizId
          if (response.statusCode == 201) {
            console.log('res',response)
            this.registerForm.reset();
            this.registerModel = {};
          
            
          } else {
            this.registerForm.reset();
            this.registerModel = {};
           
            this.router.navigate([`/quiz-info/${quizId}`]);
          }
         
        },
        error: (error) => {
          this.dialog.open(InfoDialogComponent,{
              data:error.error,
              disableClose: true
          })
        },
        complete: () => {
      
        },
      });
    }
    }
   

}
