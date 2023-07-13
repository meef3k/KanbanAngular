import { Component, OnInit } from '@angular/core';
import { Epic } from '../models/epic.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-epic-detail',
  templateUrl: './epic-detail.component.html',
  styleUrls: ['./epic-detail.component.scss']
})
export class EpicDetailComponent implements OnInit {
  public epicId!: number;
  epicDetails!: Epic;
  public dataTodoSource!: MatTableDataSource<Task>;
  public dataDoingSource!: MatTableDataSource<Task>;
  public dataDoneSource!: MatTableDataSource<Task>;
  public tasks!: Task[];

  displayedColumns: string[] = ["name", "actions"];

  constructor(private activatedRoute: ActivatedRoute, private toast: NgToastService, private router: Router, private confirm: NgConfirmService, private api: ApiService){

  }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(val=>{
      this.getTodoTasks(val['id']);
      this.getDoingTasks(val['id']);
      this.getDoneTasks(val['id']);
      this.epicId = val['id'];
      this.fetchEpicDetails(this.epicId);
    });
  }

  getTodoTasks(id: number){
    this.api.getTasks(id).subscribe(res=>{
      this.tasks = res.filter(task => task.state === "To do");;
      this.dataTodoSource = new MatTableDataSource(this.tasks);
    })
  }

  getDoingTasks(id: number){
    this.api.getTasks(id).subscribe(res=>{
      this.tasks = res.filter(task => task.state === "In progress");;
      this.dataDoingSource = new MatTableDataSource(this.tasks);
    })
  }

  getDoneTasks(id: number){
    this.api.getTasks(id).subscribe(res=>{
      this.tasks = res.filter(task => task.state === "Done");;
      this.dataDoneSource = new MatTableDataSource(this.tasks);
    })
  }

  fetchEpicDetails(epicId: number){
    this.api.getEpicId(epicId)
      .subscribe({
        next: (res) => {
          this.epicDetails = res;
        },
        error: (err) => {
          console.log(err);
        }
      })
  };

  edit(id: number) {
    this.router.navigate(['epics/edit', id])
  }

  delete(id: number){
    this.confirm.showConfirm("Are you sure?",
    ()=>{
      this.api.deleteEpic(id).subscribe(res=>{
        this.toast.success({ detail: "Success", summary: "Deleted successfully", duration: 3000});
        this.router.navigate(['epics'])
      });
    },
    ()=>{

    });
  }

  edit_task(id: number) {
    this.router.navigate(['tasks/edit', id])
  }

  delete_task(id: number){
    this.confirm.showConfirm("Are you sure?",
    ()=>{
      this.api.deleteTask(id).subscribe(res=>{
        console.log(res);
        this.toast.success({ detail: "Success", summary: "Deleted successfully", duration: 3000});
        this.router.navigate(['epics', this.epicId])
      });
    },
    ()=>{

    });
  }
}
