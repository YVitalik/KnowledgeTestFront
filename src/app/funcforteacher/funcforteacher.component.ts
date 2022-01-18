import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { KNOWLEDGE_API_URL } from '../app-injection-tokens';
import { CreateQuestionDto } from '../models/createquestiondto';
import { TestDto } from '../test/test';

@Component({
  selector: 'app-funcforteacher',
  templateUrl: './funcforteacher.component.html',
  styleUrls: ['./funcforteacher.component.css']
})
export class FuncforteacherComponent implements OnInit {

  addQuestionToTestId: number = 0;
  allTests: TestDto[] = []
  showFormForAddingQuestion: boolean = false;

  constructor(private http: HttpClient, @Inject(KNOWLEDGE_API_URL) private apiUrl: string,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllTests().subscribe(res => {
      this.allTests = res;
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

  cancel() {
    this.showFormForAddingQuestion = false;
  }

  getAllTests(): Observable<TestDto[]> {
    return this.http.get<TestDto[]>(`${this.apiUrl}knowledge/test`)
  }

  deleteTest(testId: number) {
    this.http.post(this.apiUrl + "knowledge/teacher/deletetest/" + testId, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      this.ngOnInit();
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

  beginAddingQuestion(testId: number) {
    this.addQuestionToTestId = testId;
    this.showFormForAddingQuestion = true;
  }

  addQuestion(form: NgForm) {
    const question: CreateQuestionDto = new CreateQuestionDto(form.value.question, form.value.answear);
    this.http.post(this.apiUrl + "knowledge/teacher/addquestion/" + this.addQuestionToTestId, question, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(res => {
      this.showFormForAddingQuestion = false;
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
