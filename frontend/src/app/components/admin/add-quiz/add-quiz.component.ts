import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { AdminService } from "../services/admin.service";
import { ThemePalette } from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import { AddEditQuestionComponent } from "../add-edit-question/add-edit-question.component";
import { ActivatedRoute } from "@angular/router";
import { ConfirmationDialogComponent } from "../../shared/confirmation-dialog/confirmation-dialog.component";
import { ToasterNotificationsService } from "../../shared/services/toaster-notifications.service";
import jsPDF from "jspdf";

import html2canvas from "html2canvas";
import jspdf from "jspdf";
@Component({
  selector: "app-add-quiz",
  templateUrl: "./add-quiz.component.html",
  styleUrls: ["./add-quiz.component.scss"],
})
export class AddQuizComponent implements OnInit {
  @ViewChild("content", { static: true }) content: ElementRef;
  color: ThemePalette = "primary";
  quizStatus=''
  quizTitle=''
  quizData: any = {};
  quizDetails: any = {};
  quizId: any;
  quizQuestions = [];
  questionId: any = {};
  showButton=false
  hideOptions=false
  addQuestion:boolean=true
  hide:boolean=false;
  constructor(
    private adminService: AdminService,
    private dialog:MatDialog,
    private route:ActivatedRoute,
   private toastr:ToasterNotificationsService
  ) {
    this.adminService.menu$.next(true)

  }
  ngOnInit(): void {     
    this.quizId= this.route.snapshot.paramMap.get('id')
    this.getQuizQuestions();
    this.adminService.quizQuestions$.subscribe({
      next:(response:any)=>{
        this.quizQuestions = response?.questionBank;
        if(this.quizQuestions?.length !=0)
            this.addQuestion=false
            else
            this.addQuestion=true
        this.quizStatus= response?.status
        this.quizTitle = response?.quizTitle
      }
    })
    
    this.adminService.print.subscribe(
      data => 
      {
        console.log('next subscribed value: ' + data);
        // this.name = data;
        this.downloadPDF();
      }
    );

  }
  
  downloadPDF() {
    var data = document.getElementById("content");
    html2canvas(data).then(canvas => {
   
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL("pdf");
      let pdf = new jspdf("p", "mm", "a4");
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("MYPdf.pdf"); 
    });
  
  }

  
  getQuizQuestions() {
    this.adminService.getQuizQuestions(this.quizId).subscribe({
      next: (response: any) => {
        this.adminService.quizQuestions$.next(response)
        this.quizQuestions = response.questionBank;
        this.quizStatus= response.status
        this.quizTitle = response.quizTitle
     
      },
      error: (error) => {},
      complete: () => {},
    });
  }

  editdialog(question) {
    question.quizId=this.quizId
   const dialogRef= this.dialog.open(AddEditQuestionComponent,{
      data:question,
      width:'900px',
      height:'87%',
      disableClose: true
    })
   
  }

  deleteQuestion(question) {
   const dialogRef= this.dialog.open(ConfirmationDialogComponent,{
      data:'Are you sure you want to delete this question.',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(({ confirmation }) => {
        if(!confirmation)
        return
        this.adminService.deleteQuestion(question,this.quizId).subscribe({
          next: (response: any) => {
            this.adminService.quizQuestions$.next(response);
            this.quizQuestions = response.questionBank;
            this.quizStatus = response.status
            this.quizTitle= response.quizTitle
          },
          error: (error) => {},
          complete: () => {
            this.toastr.showSuccess('Question deleted')
          },
        });
    }); 
    
  }
  

  addQuestionDialog(){
    this.dialog.open(AddEditQuestionComponent,{
      data:this.quizId,
      width:'900px',
      height:'87%' ,
      disableClose: true
    })
  }
 

  ngOnDestroy(){
    this.adminService.menu$.next(false)
  }
}
