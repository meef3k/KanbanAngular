import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  public priorities: string[] = ["Low", "Medium", "High"];
  public states: string[] = ["To do", "In progress", "Done"];

  public taskForm!: FormGroup;
  public taskIdToEdit!: number;
  public isUpdateActive: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private api: ApiService, private toastService: NgToastService){

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val=>{
      this.taskForm = this.fb.group({
        name: [''],
        description: [''],
        priority: [''],
        state: [''],
        startDate: [''],
        finishDate: [''],
        epicId: Number(val['epicId'])
      });
    });

    this.activatedRoute.params.subscribe(val => {
      this.taskIdToEdit = val['id'];
      if (this.taskIdToEdit) {
        this.isUpdateActive = true;
        this.api.getTaskId(this.taskIdToEdit)
          .subscribe({
            next: (res) => {
              this.fillFormToEdit(res);
            },
            error: (err) => {
              console.log(err);
            }
          })
      }
    });
  }

  submit(){
    this.api.postTaskCreate(this.taskForm.value).subscribe(res =>{
      this.toastService.success({detail: "Success", summary: "Task added", duration: 3000});
      this.taskForm.reset;
      this.router.navigate(['epics', res.epicId])
    });
  }

  update(){
    this.api.updateTask(this.taskForm.value, this.taskIdToEdit).subscribe(res =>{
      this.toastService.success({detail: "Success", summary: "Task modified", duration: 3000});
      this.taskForm.reset;
      this.router.navigate(['epics', res.epicId])
    });
  }

  fillFormToEdit(task: Task){
    this.taskForm.setValue({
      name: task.name,
      description: task.description,
      priority: task.priority,
      state: task.state,
      startDate: task.startDate,
      finishDate: task.finishDate,
      epicId: task.epicId
    });
  }
}
