import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from "../../services/admin.service";

@Component({
  selector: "app-user-result",
  templateUrl: "./user-result.component.html",
  styleUrls: ["./user-result.component.scss"],
})
export class UserResultComponent implements OnInit {
  userId: any = {};
  userResults: any[];
  totalQuizzes: number;
  totalUsers: any;
  emailAddress: any;
  user: any = {};
  loggedUser: any;
  name: void;
  fullName: string;
  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.queryParamMap.get("id");
    this.getUserResults();
    this.userId = localStorage.getItem("userId");
    this.getLoggedUser();
  }
 

  assignQuizToUser() {
    this.router.navigate(["/admin/add-users"]);
  }
  getLoggedUser() {
    this.user.id =this.route.snapshot.queryParamMap.get("id");
    this.adminService.getLoggedUser(this.user).subscribe((res: any) => {
      this.fullName=`${res.firstName} ${res.lastName}`
      this.getOrganizationUsers();
    });
  }

  getOrganizationUsers() {
    this.user.organizationId = localStorage.getItem("userId");
    this.adminService.getOrganizationUsers(this.user).subscribe((res: any) => {
      console.log(res)
    });
  }

  getUserResults() {
    this.adminService.getUserResults(this.userId).subscribe({
      next: (response: any) => {
        this.userResults = response;
        this.totalQuizzes = this.userResults.length;
      },
      error: (error) => {},
      complete: () => {},
    });
  }
  printcertificate(quiz: any) {
    const quizId = quiz.results.output[0]._id;
    this.router.navigate([`/quiz/generate-certificate`], {
      queryParams: { userId: this.userId, quizId: quizId },
    });
  }
}
