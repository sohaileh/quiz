import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupServiceService } from '../../services/group-service.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

  addGroupMemberForm: FormGroup;
  groupModel: any = {};
  organizationId: any ;
  
  hide: Boolean = true;
 
  disabled: boolean = true;
  totalQuizzes = [];
  editQuizAssign = [];
  userId: any = {};
  dialogOpened = false;
  roles: string[];
  passwordError=false
  groupId: string;
  constructor(
    private fb: FormBuilder,
   private groupservice:GroupServiceService,
    public router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    // private toatr: ToasterNotificationsService
  ) {}

  ngOnInit(): void {
    this.addGroupMemberForm = this.fb.group({
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
          ),
          Validators.minLength(8),
        ],
      ],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      emailAddress: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"),
        ],
      ],
      organization: ["",[Validators.required]],
    });
    this.groupId = this.route.snapshot.queryParamMap.get("id");

  }

  saveMemberDetails() {
    // this.groupModel.organizationId = localStorage.getItem("userId");
    
   if(this.addGroupMemberForm.valid){
    this.groupservice.saveMemberDetails(this.groupId,this.addGroupMemberForm.value).subscribe((res)=>{

    })
   }
   
  }

  
  }
  