import { Injectable } from '@angular/core';
import { Router}  from '@angular/router';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  // User
  public apiLink: string = `http://localhost:5000/${btoa('api').replace('=', '')}/`;
  public imageLink: string = `http://localhost:5000/${btoa('api').replace('=', '')}/${btoa('uploads').replace('=', '')}/`

  private profilepic: string;
  private token: string;
  private empId: number;
  private email: string;
  private fname: string;
  private mname: string;
  private lname: string;
  private status: number;
  private dept: string;
  private program: string;
  private passwordchange: number;
  private isLoggedIn: boolean = false;

  // App Version
  public appVersion: string = "v1.0";

  // Presentation
  private presId: number;
  private presName: string;
  private presCode: number;
  private presTheme: string;
  private presFont: string;


  // Presentation Pages

  mySubject : Subject<number> = new Subject<number>();
  mynewSlideID : Subject<number> = new Subject<number>();

  private SlideId: number;
  private SlideNo: number;
  private SlideType: string;

  newsSlideId: any;

  private SlideIdArray: number[];
  
  // Content
  
  constructor(private _router: Router) { }

  getUserID(): number { return this.empId};
  getToken(): string { return this.token};
  getEmail(): string { return this.email};
  getFullname(): string {return this.fname+' '+this.mname+' '+ this.lname};
  getStatus(): number {return this.status};
  getDept(): string {return this.dept};
  getProg(): string {return this.program};
  getPasswordChange(): number {return this.passwordchange};

  setUserLoggedIn(id:number, token: string, email:string, fname:string, mname: string, lname:string, status: number, dept: string, program: string,passwordchange: number){
    
    this.isLoggedIn = true;
    this.empId = id ;
    this.token = token;
    this.email = email;
    this.fname = fname;
    this.mname = mname;
    this.lname = lname;
    this.status = status;
    this.dept = dept;
    this.program = program
    this.passwordchange = passwordchange;
  }

  setUserLogout(){
    this.setUserLoggedIn(0,'','','','','',0,'','',0);
    this.isLoggedIn = false;
    this._router.navigate(['/']);
  }

  isUserLoggedIn(): boolean { 
    return this.isLoggedIn  
  }

  getPresentationId(): number { return this.presId }
  getPresentationCode(): number { return this.presCode }
  getPresentationName(): string { return this.presName }
  getPresentationTheme(): string { return this.presTheme }
  getPresentationColor(): string { return this.presFont }

  // setPresentation(id: number, code: number,sName: string, sTheme: string){
  //   this.presId = id;
  //   this.presCode = code;
  //   this.presName = sName;

  //   if (!sTheme){
  //     this.presTheme = 'Default';
  //   }else{
  //     this.presTheme = sTheme;
  //   }
    
  // }

  // VINCENT
  setPresentation(id: number,sName: string, code: number){
    this.presId = id;
    this.presName = sName;
    this.presCode = code;
  }
  // 
  
  

  getSlideId(): any { this.mySubject.next(this.SlideId) 
                      return this.SlideId
                    };
                      
  getSlideNo(): number {return this.SlideNo}
  getSlideType(): string {return this.SlideType}

  setSlideDetails(id: number,sType: string){
    this.SlideId = id;
    this.SlideType = sType;
  }

  setSocketSlideId(slideId: any){
    this.newsSlideId = slideId
  }

  getSocketSlideId(): any {return this.mynewSlideID.next(this.newsSlideId)};


  // VIEW HISTORY
  setSlideId(id: number){
    this.SlideId = id;
  }
  setTheme(stheme: string, sfont: string){
    this.presTheme = stheme;
    this.presFont = sfont;
  }

}


