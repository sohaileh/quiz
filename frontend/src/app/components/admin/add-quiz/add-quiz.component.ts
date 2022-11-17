import { Component, HostListener, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AdminService } from "../services/admin.service";

@Component({
  selector: "app-add-quiz",
  templateUrl: "./add-quiz.component.html",
  styleUrls: ["./add-quiz.component.scss"],
})
export class AddQuizComponent implements OnInit {
  // url:string=''
  UploadFile: any;
  questions: any = [];
  quizInfo: boolean = false;
  questionType: string = "";
  totalQuestionInQuiz: number = 0;
  questionNo: number = 1;
  quizData: any = {};
  questionBank: any = [];
  // image:any
  enableRegisterButon: boolean = false;
  quizDetails: any = {};
  quizId: any;
  registerQuiz: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerQuiz = this.fb.group({
      organizationName: ["test"],
      eventName: ["test"],
      totalQuestions: [2],
      totalTime: [2],
      description: ["this is a test quiz ."],
      endDate: [null],
      reward: ["e-certificat"],

      questionBank: this.fb.group({
        question: ["test quiz"],
        type: ["mcq"],
        file: [null],
        marks: [2],
        correctAnswer: ["a"],
        options: this.fb.array([]),
      }),
    });
  }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    event.returnValue = false;
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
    this.questionType = QuestionType.type;
  }
  get options() {
    return this.registerQuiz.get("questionBank.options") as FormArray;
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

  submitInfo() {
    this.quizInfo = true;

    this.totalQuestionInQuiz = this.registerQuiz.get("totalQuestions").value;
    this.quizDetails = {
      organizationName: this.registerQuiz.get("organizationName").value,
      eventName: this.registerQuiz.get("eventName").value,
      totalQuestions: this.registerQuiz.get("totalQuestions").value,
      totalTime: this.registerQuiz.get("totalTime").value,
      description: this.registerQuiz.get("description").value,
      reward: this.registerQuiz.get("reward").value,
      endDate: this.registerQuiz.get("endDate").value,
    };

    this.adminService.submitInfo(this.quizDetails).subscribe((res: any) => {
      this.quizId = res._id;
    });
  }

  uploadFile(event: any) {
    const file: any = event.target.files[0];
    this.UploadFile = file;
  }

  addQuestion() {
    this.questionBank.push(this.registerQuiz.get("questionBank").value);
    const formData = new FormData();
    formData.append(
      "question",
      this.registerQuiz.get("questionBank.question").value
    );
    formData.append("file", this.UploadFile);
    formData.append("type", this.questionType);
    formData.append(
      "correctAnswer",
      this.registerQuiz.get("questionBank.correctAnswer").value
    );
    formData.append(
      "options",
      JSON.stringify(this.registerQuiz.get("questionBank.options").value)
    );
    formData.append("marks", this.registerQuiz.get("questionBank.marks").value);
    this.questionType = "";
    this.options.clear();

    this.adminService
      .saveQuestion(formData, this.quizId)
      .subscribe((res: any) => {
        console.log(res);
      });

    this.registerQuiz.reset();

    if (this.questionNo == this.totalQuestionInQuiz - 1) {
      this.enableRegisterButon = true;
    }
    this.questionNo++;
  }

  submitQuiz() {
    this.addQuestion();
    this.router.navigate(["/home/dashboard"]);
  }
}
