import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { KNOWLEDGE_API_URL } from '../app-injection-tokens';
import { AddTestDto } from '../models/addtestdto';

@Component({
  selector: 'app-addtest',
  templateUrl: './addtest.component.html',
  styleUrls: ['./addtest.component.css']
})
export class AddtestComponent {

  constructor(private http: HttpClient,
    @Inject(KNOWLEDGE_API_URL) private apiUrl: string,
    private jwtHelper: JwtHelperService,
    private router: Router
    ) { }

  addTest(form: NgForm) {
    const test: AddTestDto = new AddTestDto(form.value.testName, parseInt(form.value.timeInMin)) 
    const testJson = JSON.stringify(test);
    this.http.post(`${this.apiUrl}knowledge/teacher/addtest`, testJson, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      this.router.navigate(['teacherfunc'])
    }, (err: HttpErrorResponse) => {
      switch(err.status) {
        case 401:
          this.router.navigateByUrl("")
          break;
        case 403:
          this.router.navigateByUrl("")
          break;
      }
    });
  }
}
