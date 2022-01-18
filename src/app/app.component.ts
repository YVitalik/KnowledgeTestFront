import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { KNOWLEDGE_API_URL } from './app-injection-tokens';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = "knowledge test";

  constructor(private http: HttpClient,
    @Inject(KNOWLEDGE_API_URL) private apiUrl: string,
    private jwtHelper: JwtHelperService,
    ) { }

  login(form: NgForm) {
    const credentials = JSON.stringify(form.value);
    this.http.post(`${this.apiUrl}knowledge/account/login`, credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem("jwt", token)
    }, err => {
      console.log("Something goes wrong");
    });
  }

  logout() {
    localStorage.removeItem("jwt");
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("jwt");
    if (token) {
      return true;
    }
    else {
      return false;
    }
  }
}
