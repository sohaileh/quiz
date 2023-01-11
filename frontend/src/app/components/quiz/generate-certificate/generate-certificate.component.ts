import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { QuizService } from "../services/quiz.service";
import { AdminService } from "../../admin/services/admin.service";
import {Location} from '@angular/common';
@Component({
  selector: "app-generate-certificate",
  templateUrl: "./generate-certificate.component.html",
  styleUrls: ["./generate-certificate.component.scss"],
})
export class GenerateCertificateComponent implements OnInit {
  userId: any = {};
  quizId: any = {};
  quizTitle:any={}
  userDetails:any={}
  organizationName: any = "";
  playedOn: any;
  pdfData: any;
  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private adminService:AdminService,
    private router:Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.userId=this.route.snapshot.queryParamMap.get('userId')
    this.quizId= this.route.snapshot.queryParamMap.get('quizId')
    this.adminService.getUserDetails(this.userId).subscribe({
      next: (response) => {
       this.userDetails=response
      },error:(error)=>{},
      complete:()=>{}
    });
    this.adminService.getUserQuizResult(this.userId,this.quizId).subscribe({
      next:(response:any)=>{
        this.quizTitle = response.quizTitle
        this.playedOn=response?.userResultDetails?.results[0]?.playedOn
        console.log(response.userResultDetails.results[0].playedOn)
      },error:()=>{},complete:()=>{}
    })
  }

  @ViewChild("print", { static: true }) print: ElementRef;

  back(){
    this._location.back()
  }
}
