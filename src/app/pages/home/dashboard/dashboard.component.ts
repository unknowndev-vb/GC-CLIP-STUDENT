import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';

export interface Presentations {
  sName_fld: string;
  updatedOn: string;
  createdOn: string;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  contents = [];
  code: string;
  Error: boolean = false;
  presentation: any;

  displayedColumns: string[] = ['position','sName_fld', 'Action'];
  dataSource = new MatTableDataSource<Presentations>();

  value = '';
  pageSize = 7;
  Source: any;
  pageOption = [5, 10, 25, 100];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _socket: SocketService,
    private _ds: DataService,
    private _us: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getHistory();
    this._us.setSlideId(null);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  searchThis(){
    this.value = ""
  }
  applyFilter(){
    this.dataSource.filter = this.value.trim().toLocaleLowerCase();
  }

  getHistory(){
    this._ds.processData1('history/getSlideHistory/students',  this._us.getUserID(), 2)?.subscribe((res: any)=>{
      let load = this._ds.decrypt(res.d)
      this.Source = load;
      this.presentation = this.Source;
      this.dataSource = new MatTableDataSource(this.Source); 
      this.dataSource.sort = this.sort;
      console.log(load);

    }, err =>{
      console.log('err', err)
    });
  }

  codeEnter(){
    this._ds.processData1('slides/getByCode/students', this.code, 2)?.subscribe((res: any)=>{
      let load = this._ds.decrypt(res.d)
      console.log(load);
      if(load != null){
        this._us.setPresentation(load[0].id,load[0].sName_fld,load[0].sCode_fld);
        // console.log(this._us.getPresentationTheme());
        this._socket.joinRoom(this.code, this._us.getFullname());
        this._router.navigate(['presentation']);
        this.setHistory();

        this._us.setTheme(load[0].sTheme_fld, load[0].sColor_fld);
      }else{
        console.log('Code doesnt exists')
      }
    }, err =>{
      console.log('err', err)
    });
    
  }
  

  setHistory(){
    this._ds.processData1('history/setSlideHistory/students', {sId: this._us.getPresentationId(), studId: this._us.getUserID()}, 2)?.subscribe((res: any)=>{
      let load = this._ds.decrypt(res.d)
      console.log(load);
      // if(load != null){
      //   this._us.setPresentation(load[0].id,load[0].sName_fld);
      //   console.log(this._socket.joinRoom(this.code));
      //   this._router.navigate(['presentation']);
      // }else{
      //   console.log('Code doesnt exists')
      // }
    }, err =>{
      console.log('err', err)
    });
  }

  viewPresentation(data){

    // console.log(data);
    
    this._us.setSlideId(data);
    
    this._ds.processData1('slides/'+data,'', 2)?.subscribe((res: any)=>{
      let load = this._ds.decrypt(res.d);
      console.log('GET',load);
      this._us.setTheme(load.sTheme_fld,load.sColor_fld);
      this._snackBar.ngOnDestroy();
      this._router.navigate(['/history']);
    })
    
    
  }
  
}
