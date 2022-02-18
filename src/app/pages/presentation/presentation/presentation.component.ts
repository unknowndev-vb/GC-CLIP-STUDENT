import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NumericLiteral } from 'typescript';


@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {

  slides: string;
  contents = {};
  heading: string = "Waiting for the presentation to start...";
  subheading: string;
  paragraph: string;
  description: string;
  image: string;
  countDown: number = 5;
  slideTimer: number;
  // image = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  showOptions: string;
  // showOptions: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  stype: string;
  sendRes: string;
  presTheme = this._us.getPresentationTheme();
  presFont = this._us.getPresentationColor();

  constructor(
    private _router: Router,
    private _socket: SocketService,
    private _ds: DataService, 
    public _us: UserService
    ) { }
    
  ngOnInit(): void {
    this._socket.socketConnect();
    this._socket._socket.fromEvent('data-recieved').subscribe(data =>{
      console.log(data)
      
      this.heading = data['sData'].heading_fld;
      this.subheading = data['sData'].subheading_fld;
      this.stype =  data['stype'];

      // image name access using image link
      this.image = data['sData'].image_fld;
      // use ngFor to Iterate array of showOptions
      this.showOptions = data['optionData']

      this._us.setSlideDetails(data['sDetailid'], data['stype']);
    });
    this._socket._socket.fromEvent('timer-recieved').subscribe(data =>{

      this.countDown = data['countDown'];
      this.slideTimer = data['slideTimer']
      console.log( this.countDown, this.slideTimer)
    })
  }

  leaveRoom(){
    this._socket.leaveRoom(this._us.getPresentationCode(),this._us.getFullname() )
    this._router.navigate(['/main']);
  }

  sendResponse(){
    if(this.sendRes){
      this._ds.processData1('response/insert/students',{sdId: this._us.getSlideId(), studId: this._us.getUserID(), response: this.sendRes}, 2)?.subscribe((res: any)=>{
        let load = this._ds.decrypt(res.d);
        console.log("Response:",load);
        this._socket.sendResponse({room: this._us.getPresentationCode(), studRespo: this.sendRes, studId: this._us.getUserID()});
        this.hide();
        this.sendRes = null;
      }, err =>{
        this.hide();
        console.log('err', err)
      
      });
    }else{
      console.log('Fill the required field')
    }

  }

  

  hide(){
    let hide = document.getElementById('fixed-form');
    hide.classList.add('hide');
  }
  
}
