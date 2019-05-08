import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'employees-list', pathMatch: 'full'},
  {path: 'employee-create', component: EmployeeCreateComponent},
  {path: 'employees-list', component: EmployeesListComponent},
  {path: 'employee-detail/:id', component: EmployeeDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
