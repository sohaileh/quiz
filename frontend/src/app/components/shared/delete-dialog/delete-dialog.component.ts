import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SharedServiceService } from '../services/shared-service.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    private sharedService:SharedServiceService,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    public router: Router,

     @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }

  ngOnInit(): void {

}

  deleteQuiz()
  {
    this.sharedService.deleteQuiz(this.data).subscribe((res)=> {
      this.dialogRef.close({res});

   })
}


onNoClick(): void {
  this.dialogRef.close();
}

deleteUser()
{
  this.sharedService.deleteUser(this.data).subscribe((res )=> {
    this.dialogRef.close({res});

 })

}



}
