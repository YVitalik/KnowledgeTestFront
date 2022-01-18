import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { KNOWLEDGE_API_URL } from './app-injection-tokens';
import { environment } from 'src/environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, NgForm } from '@angular/forms';

import {MatCard, MatCardModule} from '@angular/material/card';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import { TestComponent } from './test/test.component';
import { FindtestComponent } from './findtest/findtest.component';
import { UsertestsComponent } from './usertests/usertests.component';
import { FuncforteacherComponent } from './funcforteacher/funcforteacher.component';
import { AddtestComponent } from './addtest/addtest.component';
import { EdittestComponent } from './edittest/edittest.component';
import { FuncforadminComponent } from './funcforadmin/funcforadmin.component';
import { RolesComponent } from './roles/roles.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    TestComponent,
    FindtestComponent,
    UsertestsComponent,
    FuncforteacherComponent,
    AddtestComponent,
    EdittestComponent,
    FuncforadminComponent,
    RolesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.whiteListedDomains
      }
    }),
     NgbModule
  ],
  providers: [{
    provide: KNOWLEDGE_API_URL,
    useValue: environment.knowledgeApi
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
