import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.sass"],
})
export class MyAccountComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  links = [
    {
      label: "Sign In",
      path: "/auth/login",
    },
    {
      label: "Sign Up",
      path: "/auth/register",
    },
  ];
  activeLink = this.links[0];
}
