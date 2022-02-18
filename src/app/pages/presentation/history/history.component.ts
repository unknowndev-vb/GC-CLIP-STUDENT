
import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { trigger, transition, animate, style , state } from '@angular/animations'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  animations: [trigger("fade", [
    state("void", style({ opacity: 0 })),
    transition("void <=> *", [animate("1s ease-in-out")])
    ])]
})
export class HistoryComponent implements OnInit {
  slides = [];
  currentIndex = 0;
  slideContents = [];
  min: number;
  percent: number;
  presTheme = this._us.getPresentationTheme();
  presFont = this._us.getPresentationColor();

  @HostListener('window:keyup.arrowleft', ['$event'])
  @HostListener('window:keyup.arrowright', ['$event'])

  selectionChange(event:any, i: any) {

    if(this.slides.length > 1){
      if(event.key == "ArrowRight"){
        this.currentIndex++;
          if(this.currentIndex == this.slides.length){
            this.currentIndex = 0;
            this.percent = 0;
          }
          this.slideSelector(this.slides[this.currentIndex]);
          this.percent += this.min;
          
      }
      if(event.key == "ArrowLeft"){
        this.currentIndex--;
          if(this.currentIndex < 0){
            this.currentIndex = this.slides.length - 1;
            this.percent = this.min * this.slides.length;
          }
          else{
            this.percent -= this.min;
          }
          this.slideSelector(this.slides[this.currentIndex]);
      }
    }
  }

  slideSelector(item: any){
    this._us.setSlideDetails(item.id,item.sType_fld);
    this.getContent();
  }
  
  constructor(
    private _ds: DataService,
    private _us: UserService
    ) { }

  ngOnInit(): void {
    
    console.log(this._us.getPresentationColor());
    this.openPresentation();
  }

  getContent(){
    this._ds.processData1('contents/getallcontents/students', this._us.getSlideId(), 2)?.subscribe((res: any)=>{
          let load = this._ds.decrypt(res.d);
          this.slideContents = load;
        });
  }

  openPresentation(){
    
    this._ds.processData1('slides/getDetails/students', this._us.getSlideId(), 2)?.subscribe((res: any)=>{
      let load = this._ds.decrypt(res.d);
      console.log(load);
      this.slideSelector(load[0]);
      this.slides = load;
      this.min = 100 / this.slides.length;
      this.percent = this.min;

    });
    
  }

  

  

}
