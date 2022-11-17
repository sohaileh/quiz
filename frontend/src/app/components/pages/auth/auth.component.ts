import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  links=[
    {
    label:'Sign In',
    path:'/pages/my-account'
    },
    {
    label:'Sign Up',
    path:'/pages/Signup'
    }
    ]
    activeLink = this.links[0];
}
