import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-grading",
  templateUrl: "./grading.component.html",
  styleUrls: ["./grading.component.scss"],
})
export class GradingComponent implements OnInit {
  inputFields = [];
  constructor() {}

  ngOnInit(): void {}

  addInputField() {
    this.inputFields.push("");
  }

  deleteInputField(index: number) {
    this.inputFields.splice(index, 1);
  }
}
