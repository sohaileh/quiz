import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-session-expiry',
  templateUrl: './session-expiry.component.html',
  styleUrls: ['./session-expiry.component.scss']
})
export class SessionExpiryComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) private data: any,private dialogRef: MatDialogRef<SessionExpiryComponent>) { }

  ngOnInit(): void {
  }
  closeDialog(){
    this.dialogRef.close({result:true});
  }

}
