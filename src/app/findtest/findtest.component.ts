import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { KNOWLEDGE_API_URL } from '../app-injection-tokens';
import { TestDto } from '../test/test';

@Component({
  selector: 'app-findtest',
  templateUrl: './findtest.component.html',
  styleUrls: ['./findtest.component.css']
})
export class FindtestComponent {

  choosenTests: TestDto[] = []

  constructor(private http: HttpClient, @Inject(KNOWLEDGE_API_URL) private apiUrl: string) { }

  getTests(testsToFind: string) {
    this.http.get<TestDto[]>(this.apiUrl +"knowledge/test/find/" + testsToFind).subscribe(res => {
      this.choosenTests = res;
    })
  }

}
