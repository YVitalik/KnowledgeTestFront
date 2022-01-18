import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { KNOWLEDGE_API_URL } from '../app-injection-tokens';
import { ReadDetailedResults } from '../models/readdetailedresults';
import { ReadUserTestDto } from '../models/readusertestdto';

@Component({
  selector: 'app-usertests',
  templateUrl: './usertests.component.html',
  styleUrls: ['./usertests.component.css']
})
export class UsertestsComponent implements OnInit {

  userTests: ReadUserTestDto[] = [];
  testDetails: ReadDetailedResults[] = [];
  showDetails: boolean = false;

  constructor(private http: HttpClient, @Inject(KNOWLEDGE_API_URL) private apiUrl: string, private router: Router) { }

  ngOnInit(): void {
    this.getUserTests().subscribe(res => {
      this.userTests = res;
    });
  }

  getUserTests(): Observable<ReadUserTestDto[]> {
    return this.http.get<ReadUserTestDto[]>(`${this.apiUrl}knowledge/results/testsresults`)
  }

  getTestDetails(id: number) {
    return this.http.get<ReadDetailedResults[]>(this.apiUrl + "knowledge/results/showdetails/" + id)
            .subscribe(res => {
              this.testDetails = res;
              this.showDetails = true;
            } , (error: HttpErrorResponse) => {
              switch(error.status) {
                case 401:
                  this.router.navigateByUrl("")
                  break;
                case 403:
                  this.router.navigateByUrl("")
                  break;
              }
            })
  }

  returnAllUserTests() {
    this.showDetails = false;
    while (this.testDetails.length) {
      this.testDetails.pop();
    }
  }

}
