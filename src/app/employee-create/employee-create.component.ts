import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService} from "../shared/employees.service"

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  @Input() employeeDetail = {
    name:'',
    lastName:'',
    designation:'',
    project:'',
    status:false,
    joinDate:new Date()
  }

  constructor(public employeesREST:EmployeesService, public router: Router) { }

  ngOnInit() {
  }

  public showError: Boolean = false;

  addEmployee(){
    if ((this.employeeDetail.name === null || 0 === this.employeeDetail.name.trim().length)
      || (this.employeeDetail.lastName === null || 0 === this.employeeDetail.lastName.trim().length)) {
        this.showError = true;
    } else {
      this.employeesREST.createEmployee(this.employeeDetail).
        subscribe((data:{}) => {this.router.navigate(['/employees-list'])})
    }
  }
  
}
