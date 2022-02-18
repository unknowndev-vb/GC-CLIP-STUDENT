import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  user_Name: string;
  user_Dept: string;
  user_Prog: string;

  constructor(
    private user: UserService,
    private ds: DataService
  ) { }

  ngOnInit(): void {
    this.user_Name = this.user.getFullname();
    // console.log(this.user.getFullname());
    this.user_Dept = this.user.getDept();
    this.user_Prog = this.user.getProg();
  }

}
