import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { QuizService } from "../services/quiz.service";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { HasElementRef } from "@angular/material/core/common-behaviors/color";
import { AdminService } from "../../admin/services/admin.service";

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
    private adminService:AdminService
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
        console.log('userResult',response)
        this.quizTitle = response.quizTitle
        this.playedOn=response?.userResultDetails?.results[0]?.playedOn
        console.log(response.userResultDetails.results[0].playedOn)
      },error:()=>{},complete:()=>{}
    })
  }

  // @ViewChild("para") para: ElementRef;
  @ViewChild("print", { static: true }) print: ElementRef;

  // ngAfterViewInit() {
  //   console.log("on after view init", this.para);
  //   this.pdfData = this.para.nativeElement;
  //   this.printPdf();
  // }

  // generateCertificate() {
  //   this.quizService.generateCertificate(this.userId, this.quizId).subscribe(
  //     (res: any) => {
  //       this.firstName = res.userDetails[0].firstName;
  //       this.lastname = res.userDetails[0].lastName;
  //       this.eventName = res.quizDetails[0].eventName;
  //       this.organizationName = res.quizDetails[0].organizationName;
  //       this.playedOn = res.playedOn;
  //     },
  //     (error: any) => {},
  //     () => {}
  //   );
  // }


  // printPdf() {
  //   this.generatePdf(this.pdfData);
  // }

  // generatePdf(htmlcontent) {
  //   html2canvas(htmlcontent).then((canvas) => {
  //     let fileWidth = 290;
  //     let fileHeight = 190;
  //     const fileUrl = canvas.toDataURL("img/png");
  //     let pdf = new jsPDF("l", "mm", "a4");
  //     pdf.addImage(fileUrl, "PNG", 5, 5, fileWidth, fileHeight);
  //     pdf.save("certificate");
  //   });
  // }
  // getCertificateDetails(){

  // }
}
