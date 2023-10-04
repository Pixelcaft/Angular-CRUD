import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { FormComponent } from './components/form/form.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

// const routes: Routes = [];

const routes: Routes = [
  {path: '', component: UserListComponent},
  {path: 'form', component: FormComponent},
  {path: 'user-info', component: UserInfoComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
