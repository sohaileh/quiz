import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-session-expiry',
  templateUrl: './session-expiry.component.html',
  styleUrls: ['./session-expiry.component.scss']
})

export class SessionExpiryComponent implements OnInit {
  quizId: any;

  constructor(private router:Router,private route:ActivatedRoute ) { }

  ngOnInit(): void {
    this.quizId=this.route.snapshot.paramMap.get('id');
  }
  closeQuiz(){
  this.router.navigate([`/quiz/quiz-result/${this.quizId}`],{queryParamsHandling:'preserve'});
  }

}
