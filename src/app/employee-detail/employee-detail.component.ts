import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router} from '@angular/router';
import { EmployeesService } from '../shared/employees.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  constructor(
    public employeesREST: EmployeesService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private globals: Globals
  ) { }

  ngOnInit() {
      this.employeesREST.getEmployee(this.id).subscribe((data:{}) => {
        this.employeeDetail = data;
      })
  }
  public showError: Boolean = false;
  id = this.activatedRoute.snapshot.params['id'];
  employeeDetail: any = {};

  updateEmployee(){
    if ((this.employeeDetail.name === null || 0 === this.employeeDetail.name.trim().length)
      || (this.employeeDetail.lastName === null || 0 === this.employeeDetail.lastName.trim().length)) {
        this.showError = true;
    } else {
      if(window.confirm(this.globals.alertUpdateEmployee)){
        this.employeesREST.updateEmployee(this.id, this.employeeDetail).subscribe((data => {this.router.navigate(['/employees-list'])}))
      }
    }
  }
}
