import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { AdminService } from "../../admin/services/admin.service";
import { QuizService } from "../services/quiz.service";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit {
  // ckeditorContent: any=this.data
  ckeConfig: {
    allowedContent: boolean;
    forcePasteAsPlainText: boolean;
    removePlugins: string;
    removeButtons: string;
  };
  sendInvitationForm: FormGroup;
  editor: any;
  userId: string;
  totalUsers: any;
  emailAddress: any;
  quizStatus: any;
  constructor(
    private quizService: QuizService,
    @Inject(MAT_DIALOG_DATA) public data: { data: any },
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {
    this.ckeConfig = {
      allowedContent: false,
      forcePasteAsPlainText: true,
      removePlugins: "horizontalrule,specialchar,about,list,others",
      removeButtons:
        "Save,NewPage,Preview,Print,Templates,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Find,Select,Button,ImageButton,HiddenField,JustifyBlock,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Smiley,PageBreak,Iframe,ShowBlocks,Cut,Copy,Paste,Image,Format,Maximize,Styles,Anchor,SpecialChar,PasteFromWord,PasteText,Scayt,Undo,Redo,Strike,RemoveFormat,Indent,Outdent,Blockquote,Underline,exportpdf",
    };
  }

  ngOnInit(): void {
    this.createForm();
    this.editor = this.data.data.data;
    this.userId = localStorage.getItem('userId')
    if (this.userId) {
      this.adminService.getUserDetails(this.userId).subscribe({
        next: (resposne: any) => {
          
          this.emailAddress = resposne.emailAddress;
          console.log(this.emailAddress);
        },
      });
    }
  }
  createForm() {
    this.sendInvitationForm = new FormGroup({
      from: new FormControl(),
      to: new FormControl([""]),
      cc: new FormControl([""]),
      subject: new FormControl(),
      editor: new FormControl(),
    });
  }
  sendEmailInvitation() {
    this.quizService
      .sendEmailInvitation(this.sendInvitationForm.value)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
