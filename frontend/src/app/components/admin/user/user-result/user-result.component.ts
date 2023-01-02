import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-user-result',
  templateUrl: './user-result.component.html',
  styleUrls: ['./user-result.component.scss']
})
export class UserResultComponent implements OnInit {

  userId:any={}
  userResults:any[]
  totalQuizzes:number
  constructor(private adminService:AdminService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.queryParamMap.get("id");
    this.getUserResults()
  }

  getUserResults(){
    this.adminService.getUserResults(this.userId).subscribe({
      next:(response:any)=>{
        this.userResults=response
        this.totalQuizzes= this.userResults.length
      },
      error:(error)=>{

      },
      complete:()=>{}
    })
}
}
