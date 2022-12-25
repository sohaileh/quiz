import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dialogue-message',
  templateUrl: './dialogue-message.component.html',
  styleUrls: ['./dialogue-message.component.scss']
})
export class DialogueMessageComponent implements OnInit {
message:any;
cancelButtonText:any;
  id: any;
  quizId: string;
  params:any;
  constructor(  @Inject(MAT_DIALOG_DATA) private data: any,private dialogRef: MatDialogRef<DialogueMessageComponent>,private router:Router,private route:ActivatedRoute) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.ok || this.cancelButtonText;
      }
    }
    this.dialogRef.updateSize('100%','100%',
   
    )
  
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    // this.quizId = localStorage.getItem('quizId')
  }

  onConfirmClick() {
    this.dialogRef.close({result:true});
  }
  
}

  

