import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { KNOWLEDGE_API_URL } from '../app-injection-tokens';
import { RegisterDto } from '../models/registerdto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private http: HttpClient,
    @Inject(KNOWLEDGE_API_URL) private apiUrl: string,
    private jwtHelper: JwtHelperService,
    private router: Router
    ) { }

  register(form: NgForm) {
    const registerDto: RegisterDto = new RegisterDto(form.value.username, form.value.password, form.value.email)
    const registerDtoJson = JSON.stringify(registerDto);
    this.http.post(`${this.apiUrl}knowledge/account/register`, registerDtoJson, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      this.router.navigate(['']);
    }, err => {
      console.log(registerDtoJson);
      alert("Username is already taken, please choose other");
    });
  }
}
