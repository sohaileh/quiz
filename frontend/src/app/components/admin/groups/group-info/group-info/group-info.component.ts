import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupServiceService } from '../../services/group-service.service';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.scss']
})
export class GroupInfoComponent implements OnInit {
  userResults: any = [];
  totalQuizzes: any;
  groupId: string;
  groupName: string;

  constructor(private router: Router, private route: ActivatedRoute, private groupservice: GroupServiceService) { }

  ngOnInit(): void {
    this.groupId = this.route.snapshot.paramMap.get('id')
    this.groupName = this.route.snapshot.queryParamMap.get('name')
    this.groupservice.getGroupMembers(this.groupId).subscribe((res) => {
      console.log(res)
      this.userResults = res;
    })
  }
  addMember() {
    this.router.navigateByUrl(`/admin/add-member/${this.groupId}`)
  }
}
