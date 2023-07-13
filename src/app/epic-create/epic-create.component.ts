import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-epic-create',
  templateUrl: './epic-create.component.html',
  styleUrls: ['./epic-create.component.scss']
})
export class EpicCreateComponent implements OnInit {
  public priorities: string[] = ["Low", "Medium", "High"];
  public states: string[] = ["To do", "In progress", "Done"];

  public epicForm!: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, private toastService: NgToastService){

  }

  ngOnInit(): void {
    this.epicForm = this.fb.group({
      name: [''],
      description: [''],
      priority: [''],
      state: ['']
    });
  }

  submit(){
    this.api.postEpicCreate(this.epicForm.value).subscribe(res =>{
      this.toastService.success({detail: "Success", summary: "Epic added", duration: 3000});
      this.epicForm.reset();
    });
  }
}
