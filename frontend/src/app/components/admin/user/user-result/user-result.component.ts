import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-user-result',
  templateUrl: './user-result.component.html',
  styleUrls: ['./user-result.component.scss']
})
export class UserResultComponent implements OnInit {

  userId:any={}
  userResults:any[]
  totalQuizzes:number
  totalUsers: any;
  emailAddress: any;
  user: any={};
  loggedUser:any;
  name: void;
  fullName: string;
  constructor(private adminService:AdminService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.queryParamMap.get("id");
    this.getUserResults()
    this.adminService.organizationUsers$.subscribe({
      next:(response:any)=>{
      this.totalUsers = response.length+1
      },
      error:(error)=>{},
      complete:()=>{}
    })
    this.getOrganizationUsers();
    console.log(this.router.url)
    this.userId = this.route.snapshot.queryParamMap.get('id')
    if(this.userId){
      this.adminService.getUserDetails(this.userId).subscribe({
        next:(resposne:any)=>{
          this.fullName =`${resposne.firstName} ${resposne.lastName}`
         
          }
      })
    }
   
  }
  getLoggedUser() {
    this.user.id = this.userId;
    this.adminService.getLoggedUser(this.user).subscribe((res: any) => {
      this.loggedUser = res;
      this.getOrganizationUsers();
    });
  }

  getOrganizationUsers() {
    this.user.organizationId = localStorage.getItem("userId");
    this.adminService.getOrganizationUsers(this.user).subscribe((res: any) => {
      res.push(this.loggedUser);
      this.totalUsers = res.length;
    });
  }

  getUserResults(){
    this.adminService.getUserResults(this.userId).subscribe({
      next:(response:any)=>{
        this.userResults=response
        this.totalQuizzes= this.userResults.length
      },
      error:(error)=>{

      },
      complete:()=>{}
    })
}
}
