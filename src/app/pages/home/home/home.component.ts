import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  user_fn: string;
  user_email: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private _us: UserService,
    private _snackBar: MatSnackBar) {}

  logout(){
    this._us.setUserLogout();
    this._snackBar.ngOnDestroy();
  }

  ngOnInit(): void {
    this.user_fn = this._us.getFullname();
    this.user_email = this._us.getEmail();
  }

}
