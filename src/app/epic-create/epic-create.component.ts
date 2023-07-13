import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-epic-create',
  templateUrl: './epic-create.component.html',
  styleUrls: ['./epic-create.component.scss']
})
export class EpicCreateComponent implements OnInit {
  public priorities: string[] = ["Low", "Medium", "High"];
  public states: string[] = ["To do", "In progress", "Done"];

  public epicForm!: FormGroup;

  constructor(private fb: FormBuilder){

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
    console.log(this.epicForm.value);
  }
}
