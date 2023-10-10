import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { FormComponent } from './components/form/form.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'add-user', component: FormComponent },
  {path: 'update-user/:id', component: FormComponent},
  { path: 'user/:id', component: UserInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
