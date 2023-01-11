import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.sass']
})
export class OauthComponent implements OnInit {
  serverUrL=environment.serverUrL
  appId=environment.appId
  appURL=environment.appURL
  ClientId=environment.ClientId
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.ouathLogin()
  }
  ouathLogin(){
    this.authService.getClientId().subscribe({
      next:(response:any)=>{
        console.log('clientId',response)
        let url = `${this.appURL}/exgsfsso/authorize?response_type=code&redirect_uri=${this.serverUrL}&app_id=${this.appId}&client_id=${response.ClientId}&scope=openid%20profile&state=xjsueokjdi_der`;
        window.location.href=`${url}`
      },
      error:(error)=>{},
      complete:()=>{}
    })
   
  }
}
