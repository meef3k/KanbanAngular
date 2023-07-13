import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public userId!: number;
  userDetails!: User;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private api: ApiService){

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val=>{
      this.userId = 1;
      this.fetchTaskDetails(this.userId);
    });
  }

  fetchTaskDetails(userId: number){
    this.api.getUserId(userId)
      .subscribe({
        next: (res) => {
          this.userDetails = res;
        },
        error: (err) => {
          console.log(err);
        }
      })
  };

  title = 'Kanban-Angular';
}
