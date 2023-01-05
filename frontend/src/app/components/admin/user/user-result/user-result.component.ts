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
    this.adminService.organizationUsers$.subscribe({
      next: (response: any) => {
        this.fullName = `${response[0].firstName} ${response[0].lastName}`;
      },
      error: (error) => {},
      complete: () => {},
    });
    this.getOrganizationUsers();
    this.userId = this.route.snapshot.queryParamMap.get("id");
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
