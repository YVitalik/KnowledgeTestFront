import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { KNOWLEDGE_API_URL } from '../app-injection-tokens';
import { AssignUserToRolesDto } from '../models/assignusertorolesdto';
import { CreateRoleDto } from '../models/createroledto';
import { ReadRolesDto } from '../models/readrolesdto';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  allRoles: ReadRolesDto[] = [];
  showStartPage: boolean = true;
  showAddRoleForm: boolean = false;
  showAssignUserToRolesForm: boolean = false;

  constructor(private http: HttpClient, @Inject(KNOWLEDGE_API_URL) private apiUrl: string) { }

  ngOnInit(): void {
    this.getAllRoles().subscribe(res => {
      this.allRoles = res;
    })
  }

  getAllRoles(): Observable<ReadRolesDto[]> {
    return this.http.get<ReadRolesDto[]>(this.apiUrl + "knowledge/admin/getroles")
  }

  startRoleCreation() {
    this.showStartPage = false;
    this.showAddRoleForm = true;
  }

  startAssignUserToRoles() {
    this.showAssignUserToRolesForm = true;
    this.showStartPage = false;
    this.showAddRoleForm = false;
  }

  createRole(form: NgForm) {
    const newRole: CreateRoleDto = new CreateRoleDto(form.value.rolename) 
    const newRoleJson = JSON.stringify(newRole);
    this.http.post(`${this.apiUrl}knowledge/admin/createrole`, newRoleJson, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      this.showStartPage = true;
      this.showAddRoleForm = false;
    }, err => {
      alert("Test name is already choosen, please choose another");
    });
  }

  cancel() {
    this.showStartPage = true;
    this.showAddRoleForm = false;
    this.showAssignUserToRolesForm = false;
  }

  assignUserToRoles(form: NgForm) {
    const rolesToAdd: string[] = [];
    for (const [key, value] of Object.entries(form.value)) {
      if (value === true) {
        rolesToAdd.push(key)
      }
    }
    const assignRoles: AssignUserToRolesDto = new AssignUserToRolesDto(form.value.username, rolesToAdd);
    const assignRolesJson = JSON.stringify(assignRoles);

    this.http.post(this.apiUrl + "knowledge/admin/assignusertorole" , assignRolesJson, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      console.log(assignRolesJson)
      this.showStartPage = true;
      this.showAddRoleForm = false;
      this.showAssignUserToRolesForm = false;
    }, err => {
      console.log(assignRolesJson)
      alert("Username is already taken, please choose other");
    });

  }
}


