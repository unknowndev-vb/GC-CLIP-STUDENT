import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  constructor(
    private _us: UserService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }
  toggleSideBar(){
    this.toggleSidebarForMe.emit();
  }
  logout(){
    this._us.setUserLogout();
    this._snackBar.ngOnDestroy();
  }
}
