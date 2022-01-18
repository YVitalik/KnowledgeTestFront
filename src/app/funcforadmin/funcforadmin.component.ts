import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { KNOWLEDGE_API_URL } from '../app-injection-tokens';
import { ReadUserInfoDto } from '../models/readuserinfodto';
import { UpdateUserDto } from '../models/updateuserdto';

@Component({
  selector: 'app-funcforadmin',
  templateUrl: './funcforadmin.component.html',
  styleUrls: ['./funcforadmin.component.css']
})
export class FuncforadminComponent implements OnInit {

  allUsers: ReadUserInfoDto[] = []
  userToUpdateId: string = "";
  showAllUsersTable: boolean = true;
  showEditUserCredentialsForm: boolean = false; 

  constructor(private http: HttpClient, @Inject(KNOWLEDGE_API_URL) private apiUrl: string, private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers().subscribe(res => {
      this.allUsers = res;
    })
  }

  getAllUsers(): Observable<ReadUserInfoDto[]> {
    return this.http.get<ReadUserInfoDto[]>(this.apiUrl + "knowledge/admin")
  }

  startUserUpdate(userId: string) {
    this.userToUpdateId = userId;
    this.showAllUsersTable = false;
    this.showEditUserCredentialsForm = true;
  }

  updateUser(form: NgForm) {
    const updatedUser: UpdateUserDto = new UpdateUserDto(this.userToUpdateId, form.value.username, form.value.email, form.value.password);
    const updatedUserJson = JSON.stringify(updatedUser);
    this.http.post(this.apiUrl + "knowledge/admin/updateuser", updatedUserJson, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      this.ngOnInit();
      this.showAllUsersTable = true;
      this.showEditUserCredentialsForm = false; 
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

  deleteUser(userId: string) {
    this.http.post(this.apiUrl + "knowledge/admin/deleteuser/" + userId, {
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

}
