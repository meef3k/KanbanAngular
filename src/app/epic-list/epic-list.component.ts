import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Epic } from '../models/epic.model';
import { ApiService } from '../services/api.service';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-epic-list',
  templateUrl: './epic-list.component.html',
  styleUrls: ['./epic-list.component.scss']
})
export class EpicListComponent implements OnInit {
  public dataSource!: MatTableDataSource<Epic>;
  public epics!: Epic[];

  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ["name", "description", "priority", "state", "actions"];

  constructor(private api: ApiService, private toast: NgToastService, private router: Router, private confirm: NgConfirmService){

  }

  ngOnInit(): void {
    this.getEpics();
  }

  getEpics(){
    this.api.getEpics().subscribe(res=>{
      this.epics = res;
      this.dataSource = new MatTableDataSource(this.epics);
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(id: number) {
    this.router.navigate(['epics/edit', id])
  }

  delete(id: number){
    this.confirm.showConfirm("Are you sure?",
    ()=>{
      this.api.deleteEpic(id).subscribe(res=>{
        this.toast.success({ detail: "Success", summary: "Deleted successfully", duration: 3000});
        this.getEpics();
      });
    },
    ()=>{

    });
  }
}
