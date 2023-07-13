import { Component, OnInit } from '@angular/core';
import { Epic } from '../models/epic.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-epic-detail',
  templateUrl: './epic-detail.component.html',
  styleUrls: ['./epic-detail.component.scss']
})
export class EpicDetailComponent implements OnInit {
  public epicId!: number;
  epicDetails!: Epic;

  constructor(private activatedRoute: ActivatedRoute, private toast: NgToastService, private router: Router, private confirm: NgConfirmService, private api: ApiService){

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val=>{
      this.epicId = val['id'];
      this.fetchEpicDetails(this.epicId);
    });
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
}
