import { Component, HostListener, Inject, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormArray,
  FormBuilder,
} from "@angular/forms";
import { AdminService } from "../services/admin.service";
import { ThemePalette } from "@angular/material/core";
import { MatDialog,MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-add-edit-question',
  templateUrl: './add-edit-question.component.html',
  styleUrls: ['./add-edit-question.component.scss']
})
export class AddEditQuestionComponent implements OnInit {

  color: ThemePalette = "primary";
  UploadFile: any;
  quizStatus=''
  questions: any = [];
  questionType: string = "";
  questionBank: FormGroup;
  quizId: any;
  ckeConfig: any = {};
  quizQuestions = [];
  answer: any;

  questionId: any = {};
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any
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
      console.log('data',this.data)
    this.questionBank = this.fb.group({
      question: [""],
      type: ["Choose Question Type"],
      file: [null],
      marks: [],
      correctAnswer: [""],
      timeLimit: [],
      options: this.fb.array([]),
    });
    if(this.data){
      this.questionId = this.data._id;
      this.questionType = this.data.type;
      this.questionBank.patchValue({
        question: this.data.question,
        type: this.data.type,
        file: this.data.file,
        marks: this.data.marks,
        correctAnswer: this.data.correctAnswer,
        timeLimit: this.data.timeLimit,
      });
  
      this.questionBank.setControl(
        "options",
        this.setExistigOptions(this.data.options)
      );
    }
    
  }


  typeOfQuestions = [
    {
      type: "face-recognition",
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

  setQuestionType(QuestionType) {
    console.log(QuestionType);
    this.questionType = QuestionType;
  }
  get options() {
    return this.questionBank.get("options") as FormArray;
  }

  addOptions() {
    const questionOptions = this.fb.group({
      option: [""],
    });

    this.options.push(questionOptions);
  }

  removeOption(pos) {
    this.options.removeAt(pos);
  }

  uploadFile(event: any) {
    const file: any = event.target.files[0];
    this.UploadFile = file;
  }

  addQuestion() {
    const formData = new FormData();
    formData.append("question", this.questionBank.get("question").value);
    formData.append("file", this.UploadFile);
    formData.append("type", this.questionBank.get("type").value);
    formData.append("timeLimit", this.questionBank.get("timeLimit").value);

    formData.append(
      "options",
      JSON.stringify(this.questionBank.get("options").value)
    );
    formData.append("marks", this.questionBank.get("marks").value);
    formData.append("correctAnswer", this.answer);
    this.options.clear();

    this.adminService.saveQuestion(formData).subscribe((response: any) => {
      this.adminService.quizQuestions$.next(response)
      this.quizQuestions = response.questionBank;
      this.quizStatus= response.status
      this.questionBank.reset();
    this.questionBank.patchValue({
      type:'Choose Question Type'
    })
    },(error)=>{
      console.log(error.error.message)
    });
    
    
  }

  getCorrectAnswer(i, event: any) {
    if (event.checked) {
      this.answer = this.questionBank.get("options").value[i].option;
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
    return questionOptions;
  }
  editQuestion() {
    const formData = new FormData();
    formData.append("question", this.questionBank.get("question").value);
    formData.append("file", this.UploadFile);
    formData.append("type", this.questionBank.get("type").value);
    formData.append("timeLimit", this.questionBank.get("timeLimit").value);

    formData.append(
      "options",
      JSON.stringify(this.questionBank.get("options").value)
    );
    formData.append("marks", this.questionBank.get("marks").value);
    formData.append("correctAnswer", this.answer);

    this.adminService.editQuestion(formData, this.questionId).subscribe({
      next: (response: any) => {
        this.adminService.quizQuestions$.next(response)
        this.closeDialogModel();
      },
      error: (error) => {},
      complete: () => {},
    });
  }

  closeDialogModel() {
    this.dialog.closeAll()
    this.options.clear();
    this.questionBank.reset();
    this.questionType = "";
    this.questionBank.patchValue({
      type:'Choose Question Type'
    })
  }
 

  

}
