import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import { DataService } from "../services/data.service";
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  hide = true;
  Error: boolean = false;
  rememberme: any;
  studentLogin: FormGroup;
  counter(i: number) {
    return new Array(i);
}

  constructor(
    private _socket: SocketService,
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder, 
    private _ds: DataService,
     private _user: UserService,  
     private _router: Router
  ) { }

  ngOnInit(): void {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    this.studentLogin = this._fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
      status: ['0'],
      rememberme: [this.rememberme]
    })
    if( localStorage.getItem('rememberme')){
      let email = localStorage.getItem('email');
      let decrypted =  CryptoJS.AES.decrypt( localStorage.getItem('password') ||'', 'Abcdefhjklmnopqrstyvwxyz123')
      let password = decrypted.toString(CryptoJS.enc.Utf8)

      this.studentLogin.setValue({
        email: email,
        password: password,
        status: '0',
        rememberme:  localStorage.getItem('rememberme')
      })
    }

    if(this._user.isUserLoggedIn()){

       this._router.navigate(['/main']);
    }
  }


  getErrorEmail() {
    return this.studentLogin.get('email').hasError('required') ? 'Field is required' :
      this.studentLogin.get('email').hasError('pattern') ? 'Invalid email address!' : '';
  }
  getErrorPassword() {
    return this.studentLogin.get('password').hasError('required') ? 'Field is required' : '';
  }



  signIn(){

    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('rememberme')

    this._ds.processData1('users', this.studentLogin.value, 1)?.subscribe((res: any)=>{
      let load = this._ds.decrypt(res.d)
      load = load.uData;

      this._user.setUserLoggedIn(load.id, load.token, load.email, load.fname, load.mname, load.lname, load.status, load.dept,load.program, load.passwordchange);

          if(this.studentLogin.get('rememberme')?.value){
            let password = CryptoJS.AES.encrypt(this.studentLogin.get('password')?.value, 'Abcdefhjklmnopqrstyvwxyz123').toString()
            localStorage.setItem('rememberme', this.studentLogin.get('rememberme')?.value)
            localStorage.setItem('email', this.studentLogin.get('email')?.value)
            localStorage.setItem('password', password)
          }

          this._router.navigate(['/main']);
          this._snackBar.open("Welcome "+ this._user.getFullname()+ "!", "", {
              duration: 3000,
            });

      }, err =>{
        this.Error = true;
        this._snackBar.open("Invalid Email or Password !!","", {
          duration: 4000,
        });
      });
  }

}

