import { Component, OnInit } from "@angular/core";
import { AdminService } from "../services/admin.service";

@Component({
  selector: "app-configure",
  templateUrl: "./configure.component.html",
  styleUrls: ["./configure.component.scss"],
})
export class ConfigureComponent implements OnInit {
  dateTime: Date;
  quizId:any={}
  quizTitle=''
  quizStatus=''
  constructor(private adminService:AdminService) {
    this.adminService.menu$.next(true)
    this.quizId = localStorage.getItem('quizId')
  }

  ngOnInit() {
    this.dateTime = new Date();
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
  ngOnDestroy(){
    this.adminService.menu$.next(false)
  }
}
