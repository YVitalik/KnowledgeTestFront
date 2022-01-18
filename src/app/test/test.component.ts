import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { KNOWLEDGE_API_URL } from '../app-injection-tokens';
import { ReceiveAnswersDto } from '../models/receiveanswearsdto';
import { TestDto } from './test';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  allTests: TestDto[] = [];
  answears: ReceiveAnswersDto[] = [];
  testQuestions: string[] = [];
  testStarted: boolean = false;
  public counter: number = 0;
  public needToAutoClick: boolean = false;
  public currentTestId?: number;

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

  getTestQuestions(testId: number) {
    return this.http.get<string[]>(this.apiUrl + "knowledge/test/starttest/" + testId).subscribe(res => {
      this.currentTestId = testId;
      this.testQuestions = res;
      this.testStarted = true;
      for (let test of this.allTests) {
        if (test.id == testId) {
          this.startCountdown(test.timeInMin!);
          this.needToAutoClick = true;
        }
      }
    })
  }

  startCountdown(timeInMin: number) {
    this.counter = timeInMin;
    this.doCountdown();
  }

  doCountdown() {
    setTimeout(() => {
      this.counter = this.counter - 1;
      this.processCountdown();
    }, 60000);
  }

  processCountdown() {
    if (this.counter == 0 && this.needToAutoClick === true) {
        let button = document.getElementById('finishTest');
        button!.click();
        this.needToAutoClick = false;
        console.log("Button was automatically clicked!")
    }
    else if (this.counter == 0 && this.needToAutoClick === false) {
      console.log("Button was not automatically pressed, user passsed test by himself")
    }
    else {
      this.doCountdown()
      console.log("Count down" + this.counter)
    }
  }

  checkAnswears(form: NgForm) {
    for (const field in form.controls) {
      this.answears.push(new ReceiveAnswersDto("answear",form.controls[field].value))
    }
    const answearsJson = JSON.stringify(this.answears);
    while(this.answears.length) {
      this.answears.pop();
    }
    this.needToAutoClick = false;
    this.counter = 1;
    this.http.post(this.apiUrl + 'knowledge/test/finishtest/' + this.currentTestId, answearsJson, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      this.testStarted = false;
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
