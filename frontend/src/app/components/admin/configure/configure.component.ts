import { Component, Inject, OnInit } from "@angular/core";

@Component({
  selector: "app-configure",
  templateUrl: "./configure.component.html",
  styleUrls: ["./configure.component.scss"],
})
export class ConfigureComponent implements OnInit {
  dateTime: Date;
  constructor() {}

  ngOnInit() {
    this.dateTime = new Date();
  }
}
