import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.sass']
})
export class CallbackComponent implements OnInit {
  code=''
  state=''
  constructor(private authService:AuthService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    
   this.code= this.route.snapshot.queryParamMap.get('code')
   this.state= this.route.snapshot.queryParamMap.get('state')
   this.getToken()
  }

  getToken(){

    this.authService.getToken(this.code,this.state).subscribe({
      next:(response:any)=>{
        if(response?.data)
        this.router.navigate(['/home/dashboard'])
       
      },error:(error)=>{
        this.router.navigate(['/auth/login'])
      }
    })
  }

}
