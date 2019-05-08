import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GridComponent, GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, SortDescriptor, orderBy, State } from '@progress/kendo-data-query';

import { EmployeesService} from "../shared/employees.service"

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  public gridView: GridDataResult;
  public pageSize = 10;
  public skip = 0;
  private data: Object[];

  constructor(
    public employeeREST: EmployeesService,
    private router: Router,
    private route: ActivatedRoute) {
      this.loadItems();
    }

  ngOnInit() {
    this.loadEmployeesData();
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  private loadItems(): void {
      this.gridData = {
          data: this.employees.slice(this.state.skip, this.state.skip + this.state.take),
          total: this.employees.length
      };
  }

  public employees: any = [];
  
  public state: State = {
    skip: 0,
    take: 5,

    filter: {
      logic: 'and',
      filters: []
    }
  };

  public gridData: GridDataResult = process(this.employees, this.state);

  public dataStateChange(state: DataStateChangeEvent): void {
      this.state = state;
      this.gridData = process(this.employees, this.state);
  }

  onClickEditButton(employeeId: number) {
    this.router.navigate(['detail', employeeId], { relativeTo: this.route });
  }

  loadEmployeesData(){
    return this.employeeREST.getAllEmployees().subscribe((data:{}) => {
      this.employees = data;
      this.loadItems();
    })
  }

}
