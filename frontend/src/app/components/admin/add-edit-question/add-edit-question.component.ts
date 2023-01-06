import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { AdminService } from "../services/admin.service";
import { ThemePalette } from "@angular/material/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToasterNotificationsService } from "../../shared/services/toaster-notifications.service";
import { InfoDialogComponent } from "../../shared/info-dialog/info-dialog.component";

@Component({
  selector: "app-add-edit-question",
  templateUrl: "./add-edit-question.component.html",
  styleUrls: ["./add-edit-question.component.scss"],
})
export class AddEditQuestionComponent implements OnInit {
  color: ThemePalette = "primary";
  UploadFile: any;
  editingQuestion = false;
  savingQuestion = false;
  quizStatus = "";
  questions: any = [];
  questionType: string = "";
  questionBank: FormGroup;
  quizId: any;
  ckeConfig: any = {};
  quizQuestions = [];
  answer: any;
  errorMessage = "";
  correctAnswerIndex: any;
  answerSelected = false;
  selectedAnswerIndex: number;
  totalOptions: number = 0;
  totalQuestions:number
  maxOptionsLimitReached = false;
  questionId: any = {};
  responseSaved:boolean
  selectedOption: any;
  name:any;
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private dialog: MatDialog,
    private toastr:ToasterNotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) {
    this.ckeConfig = {
      allowedContent: false,
      forcePasteAsPlainText: true,
      removePlugins: "horizontalrule,specialchar,about,list,others",
      removeButtons:
        "Save,NewPage,Preview,Print,Templates,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Find,Select,Button,ImageButton,HiddenField,JustifyBlock,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Smiley,PageBreak,Iframe,ShowBlocks,Cut,Copy,Paste,Image,Format,Source,Maximize,Styles,Anchor,SpecialChar,PasteFromWord,PasteText,Scayt,Undo,Redo,Strike,RemoveFormat,Indent,Outdent,Blockquote,Underline,exportpdf",
    };
  }

  ngOnInit(): void {
    this.questionBank = this.fb.group({
      question: ["",{validators:[Validators.required]}],
      type: ['Choose Question Type'],
      file: [null],
      points: [,{validators:[Validators.required]}],
      correctAnswer: [""],
      timeLimit: [,{validators:[Validators.required]}],
      options: this.fb.array([]),
    });
    if (this.data.question) {
      this.questionId = this.data._id;
      this.questionType = this.data.type;
      this.questionBank.patchValue({
        question: this.data.question,
        type: this.data.type,
        file: this.data.file,
        points: this.data.points,
        correctAnswer: this.data.correctAnswer,
        timeLimit: this.data.timeLimit,
      });
      this.correctAnswerIndex = this.data.options.findIndex(
        (option) => option.option === this.data.correctAnswer
      );
      // this.answerSelected = true;
      this.selectedAnswerIndex = this.correctAnswerIndex;
      this.answer = this?.data?.options[this.correctAnswerIndex]?.option;
      this.questionBank.setControl(
        "options",
        this.setExistigOptions(this.data.options)
      );
    }
    this.adminService.quizQuestions$.subscribe({
      next:(response:any)=>{
        this.quizQuestions = response?.questionBank;
        this.totalQuestions= this.quizQuestions.length
         
      }
    })
  }

  typeOfQuestions = [
    {
      type: "image",
    },
    {
      type: "mcq",
    },
    {
      type: "video",
    },
    {
      type: "audio",
    },
  ];

  setQuestionType(event:any) {
    console.log(event);
    this.questionType=event
  }
  onChange(event:any) {
    this.name=event.value.name; 
  }
  get options() {
    return this.questionBank.get("options") as FormArray;
  }

  addOptions() {
    const questionOptions = this.fb.group({
      option: [""],
    });
    this.options.push(questionOptions);
    this.totalOptions++;
    if (this.totalOptions == 5) this.maxOptionsLimitReached = true;
  }

  removeOption(pos) {
    if(this.correctAnswerIndex==pos){
      this.dialog.open(InfoDialogComponent,{
        data:'This option is set as correct answer, you cannot delete it.',
        disableClose: true
      })
        return
      }
    this.options.removeAt(pos);
    const options = this.questionBank.get('options').value
      this.correctAnswerIndex = options.findIndex((option)=> option.option === this.answer)
    this.totalOptions--;
    this.maxOptionsLimitReached = false;
  }

  uploadFile(event: any) {
    const file: any = event.target.files[0];
    this.UploadFile = file;
  }

  addQuestion() {
    this.errorMessage = "";
    this.savingQuestion = true;
    const formData = new FormData();
    formData.append("question", this.questionBank.get("question").value);
    formData.append("file", this.UploadFile);
    formData.append("type", this.questionBank.get("type").value);
    formData.append("timeLimit", this.questionBank.get("timeLimit").value);

    formData.append(
      "options",
      JSON.stringify(this.questionBank.get("options").value)
    );
    formData.append("points", this.questionBank.get("points").value);
    formData.append("correctAnswer", this.answer);

    this.adminService.saveQuestion(formData, this.data).subscribe(
      (response: any) => {
        this.adminService.quizQuestions$.next(response);
        this.savingQuestion = false;
        this.quizQuestions = response.questionBank;
        this.quizStatus = response.status;
        this.questionBank.reset();
        this.options.clear();
        this.answerSelected = false;
        this.correctAnswerIndex=444
        this.totalOptions=0
        this.maxOptionsLimitReached=false
        this.questionBank.patchValue({
          type: "Choose Question Type",
        });
        this.questionType='Choose Question Type'
        this.toastr.showSuccess("Question added");
      },
      (error) => {
        this.savingQuestion = false;
        this.answerSelected = false;
        this.toastr.showError(error.error.message);
      }
    );
  }

  getCorrectAnswer(i, event: any) {
    if (event.checked) {
      this.answer = this.questionBank.get("options").value[i].option;
      // this.answerSelected = true;
      // this.selectedAnswerIndex = i;
      this.correctAnswerIndex=i
    } else {
      this.answerSelected = false;
      this.answer='correctAnswerisDeSelectedTest'
      this.correctAnswerIndex=444
    }
  }

  setExistigOptions(options: any): any {
    const questionOptions = new FormArray([]);
    options.forEach((element) => {
      questionOptions.push(
        this.fb.group({
          option: element.option,
        })
      );
    });
    this.totalOptions = questionOptions.length;
    if (this.totalOptions == 5) this.maxOptionsLimitReached = true;
    return questionOptions;
  }
  editQuestion() {
    this.editingQuestion = true;
    const formData = new FormData();
    formData.append("question", this.questionBank.get("question").value);
    formData.append("file", this.UploadFile);
    formData.append("type", this.questionBank.get("type").value);
    formData.append("timeLimit", this.questionBank.get("timeLimit").value);

    formData.append(
      "options",
      JSON.stringify(this.questionBank.get("options").value)
    );
    formData.append("points", this.questionBank.get("points").value);
    const correctOption = this.questionBank.get(`options.${this.correctAnswerIndex}`).value
    this.answer= correctOption.option
    formData.append("correctAnswer",this.answer);
    this.adminService
      .editQuestion(formData, this.questionId, this.data.quizId)
      .subscribe({
        next: (response: any) => {
          this.errorMessage = "";
          this.adminService.quizQuestions$.next(response);
        this.toastr.showSuccess("Question edited");
          this.editingQuestion = false;

          this.closeDialogModel();
        },
        error: (error) => {
          this.editingQuestion = false;
          this.toastr.showError(error.error.message);
        },
        complete: () => {},
      });
  }

  closeDialogModel() {
    this.dialog.closeAll();
    this.options.clear();
    this.questionBank.reset();
    this.answerSelected = false;
    this.questionType = "";
    this.questionBank.patchValue({
      type: "Choose Question Type",
    });
  }

  saveQuiz(){
    if(this.totalQuestions >=5)
    this.dialog.closeAll()
    else{
      const dialogRef= this.dialog.open(InfoDialogComponent,{
        data:'Quiz must atleast have 5 Questions',
        disableClose: true,
        width:'300px'
      })
    }
      
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.questionBank.controls[controlName].hasError(errorName);
  };
}

