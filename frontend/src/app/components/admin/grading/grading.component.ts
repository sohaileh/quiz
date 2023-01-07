import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-grading",
  templateUrl: "./grading.component.html",
  styleUrls: ["./grading.component.scss"],
})
export class GradingComponent implements OnInit {
  inputFields = [{ value: "" }];
  constructor() {}

  ngOnInit(): void {}

  addInputField() {
    this.inputFields.push({ value: "" });
  }

  deleteInputField(index: number) {
    this.inputFields.splice(index, 1);
  }
}
