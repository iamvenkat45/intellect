import { UsersListComponent } from './users-list/users-list.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [{
  path: '', component: DashboardComponent, children: [
    {
      path: 'users',
      component: UsersListComponent
    },
    {
      path: 'edit-user/:id',
      component: EditUserComponent
    },
    {
      path: 'edit-user',
      component: EditUserComponent
    },
    {
      path: '', redirectTo: 'users', pathMatch: 'full'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
