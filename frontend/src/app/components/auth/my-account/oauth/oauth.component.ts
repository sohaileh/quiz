import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.sass']
})
export class OauthComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.ouathLogin()
  }
  ouathLogin(){
 
      const appId = '63bba42e5ae42f5628b0d338';
    const ClientId = '63bba4774f3dd05d344c5ce1';
    const appURL = 'https://gsftestapi.educian.com/';
    const serverURL = 'http://localhost:4200/oauth/callback';
    let url = `${appURL}/exgsfsso/authorize?response_type=code&redirect_uri=${serverURL}&app_id=${appId}&client_id=${ClientId}&scope=openid%20profile&state=xjsueokjdi_der`;
    window.location.href=`${url}`
  }
}
