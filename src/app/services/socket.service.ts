import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  mySubject : Subject<number> = new Subject<number>();

  constructor(public _socket: Socket) { 
  }

  socketConnect(){
    this._socket.connect();
  }

  joinRoom(room:any, user: string){
    this._socket.emit('join-room', {room, user});
    this._socket.fromEvent('room-joined').subscribe(data =>{
      console.log(data)   
    }) 

  }

    leaveRoom(room:any, user:string){
    this._socket.emit('leave-room',  {room, user});
    this._socket.fromEvent('room-exited').subscribe(data =>{
      console.log(data);
    }) 
  }

  sendResponse(data:any){
    this._socket.emit('send-student-response', data)
    // this._socket.fromEvent('data-recieved').subscribe(data =>{
    //   console.log(data);
    // }) 
  }

  // dataRecieved(){
  //   this._socket.fromEvent('data-recieved').subscribe(data =>{
  //    return this.mySubject.next(data['sdId'])
  //   }) 
  // }

  
}
