import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { KNOWLEDGE_API_URL } from '../app-injection-tokens';
import { UpdateQuestionDto } from '../models/updatequestiondto';
import { UpdateTestDto } from '../models/updatetestdto';
import { TestDto } from '../test/test';

@Component({
  selector: 'app-edittest',
  templateUrl: './edittest.component.html',
  styleUrls: ['./edittest.component.css']
})
export class EdittestComponent implements OnInit {

  currentTestId: number = 0;
  currentQuestionId: number = 0;
  allTests: TestDto[] = [];
  testQuestions: UpdateQuestionDto[] = [];
  showStartPage: boolean = true;
  showUpdateTestForm: boolean = false;
  showTestQuestionsTable: boolean = false;
  showUpdateQuestionsForm: boolean = false;
  

  constructor(private http: HttpClient, @Inject(KNOWLEDGE_API_URL) private apiUrl: string, private router: Router) { }

  ngOnInit(): void {
    this.getAllTests()
        .subscribe(res => {
          this.allTests = res;
        })
  }

  getAllTests(): Observable<TestDto[]> {
    return this.http.get<TestDto[]>(`${this.apiUrl}knowledge/test`)
  }

  startUpdateTest(testId: number) {
    this.currentTestId = testId;
    this.showStartPage = false;
    this.showUpdateTestForm = true;
  }

  updateTest(form: NgForm) {
    const newTestData: UpdateTestDto = new UpdateTestDto(form.value.testName, parseInt(form.value.timeInMin));
    const newTestDataJson = JSON.stringify(newTestData);
    this.http.post(this.apiUrl + "knowledge/teacher/updatetest/" + this.currentTestId, newTestDataJson, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      this.ngOnInit();
      this.showUpdateTestForm = false;
      this.showStartPage = true;
    }, err => {
      console.log(newTestDataJson)
      alert("Test name is already choosen, please choose another");
    });
  }

  showTestQuestions(id: number) {
      return this.http.get<UpdateQuestionDto[]>(this.apiUrl + "knowledge/teacher/testquestions/" + id).subscribe(res => {
      this.testQuestions = res;
      this.showStartPage = false;
      this.showUpdateTestForm = false;
      this.showTestQuestionsTable = true;
      })
  }

  toStart() {
    this.showStartPage = true;
    this.showUpdateTestForm = false;
    this.showTestQuestionsTable = false;
  }

  startEditQuestion(questionId: number) {
    this.currentQuestionId = questionId
    this.showUpdateQuestionsForm = true;
    this.showStartPage = false;
    this.showUpdateTestForm = false;
    this.showTestQuestionsTable = false;
  }

  updateQuestion(form: NgForm) {
    const newQuestionData: UpdateQuestionDto = new UpdateQuestionDto();
    newQuestionData.id = this.currentQuestionId;
    newQuestionData.answear = form.value.answear;
    newQuestionData.question = form.value.question;
    const newQuestionDataJson = JSON.stringify(newQuestionData);
    this.http.post(this.apiUrl + "knowledge/teacher/editquestion" , newQuestionDataJson, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      this.ngOnInit();
      this.showUpdateQuestionsForm = false;
      this.showStartPage = true;
      this.showUpdateTestForm = false;
      this.showTestQuestionsTable = false;
    }, (error: HttpErrorResponse) => {
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

}
