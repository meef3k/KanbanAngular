import { Component, OnInit } from '@angular/core';
import { Epic } from '../models/epic.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-epic-detail',
  templateUrl: './epic-detail.component.html',
  styleUrls: ['./epic-detail.component.scss']
})
export class EpicDetailComponent implements OnInit {
  public epicId!: number;
  epicDetails!: Epic;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService){

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
  }
}
