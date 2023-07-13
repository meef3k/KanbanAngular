import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';
import { ApiService } from '../services/api.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  public taskId!: number;
  public epicId!: number;
  taskDetails!: Task;

  constructor(private activatedRoute: ActivatedRoute, private toast: NgToastService, private router: Router, private confirm: NgConfirmService, private api: ApiService){

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val=>{
      this.taskId = val['id'];
      this.epicId = val['epicId'];
      this.fetchTaskDetails(this.taskId);
    });
  }

  fetchTaskDetails(taskId: number){
    this.api.getTaskId(taskId)
      .subscribe({
        next: (res) => {
          this.taskDetails = res;
        },
        error: (err) => {
          console.log(err);
        }
      })
  };

  edit(id: number) {
    this.router.navigate(['tasks/edit', id])
  }

  delete(id: number){
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
