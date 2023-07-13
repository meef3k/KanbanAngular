import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { Epic } from '../models/epic.model';

@Component({
  selector: 'app-epic-create',
  templateUrl: './epic-create.component.html',
  styleUrls: ['./epic-create.component.scss']
})
export class EpicCreateComponent implements OnInit {
  public priorities: string[] = ["Low", "Medium", "High"];
  public states: string[] = ["To do", "In progress", "Done"];

  public epicForm!: FormGroup;
  public epicIdToEdit!: number;
  public isUpdateActive: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private api: ApiService, private toastService: NgToastService){

  }

  ngOnInit(): void {
    this.epicForm = this.fb.group({
      name: [''],
      description: [''],
      priority: [''],
      state: ['']
    });

    this.activatedRoute.params.subscribe(val => {
      this.epicIdToEdit = val['id'];
      this.api.getEpicId(this.epicIdToEdit).subscribe(res=>{
        this.isUpdateActive = true;
        this.fillFormToEdit(res);
      });
    });
  }

  submit(){
    this.api.postEpicCreate(this.epicForm.value).subscribe(res =>{
      this.toastService.success({detail: "Success", summary: "Epic added", duration: 3000});
      this.epicForm.reset;
    });
  }

  update(){
    this.api.updateEpic(this.epicForm.value, this.epicIdToEdit).subscribe(res =>{
      this.toastService.success({detail: "Success", summary: "Epic added", duration: 3000});
      this.epicForm.reset;
      this.router.navigate(['epics'])
    });
  }

  fillFormToEdit(epic: Epic){
    this.epicForm.setValue({
      name: epic.name,
      description: epic.description,
      priority: epic.priority,
      state: epic.state
    });
  }
}
