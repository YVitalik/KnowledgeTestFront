import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddtestComponent } from './addtest/addtest.component';
import { AppComponent } from './app.component';
import { EdittestComponent } from './edittest/edittest.component';
import { FindtestComponent } from './findtest/findtest.component';
import { FuncforadminComponent } from './funcforadmin/funcforadmin.component';
import { FuncforteacherComponent } from './funcforteacher/funcforteacher.component';
import { RegisterComponent } from './register/register.component';
import { RolesComponent } from './roles/roles.component';
import { TestComponent } from './test/test.component';
import { UsertestsComponent } from './usertests/usertests.component';

const routes: Routes = [
  { path: 'teacherfunc', component: FuncforteacherComponent},
  { path: 'addtest', component: AddtestComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: TestComponent },
  { path: 'findtest', component: FindtestComponent },
  { path: 'mytests', component: UsertestsComponent },
  { path: 'edit', component: EdittestComponent },
  { path: 'admin', component: FuncforadminComponent },
  { path: 'roles', component: RolesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
