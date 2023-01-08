import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.scss']
})
export class GroupInfoComponent implements OnInit {
userResults: any;
totalQuizzes: any;
  groupId: string;

  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.groupId=this.route.snapshot.paramMap.get('id')
    console.log(this.groupId)
  }
  addMember(){
    this.router.navigateByUrl(`/admin/add-member/${this.groupId}`)
  }
}
