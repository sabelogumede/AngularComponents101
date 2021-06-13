import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // properties
  counterProgress:number = 0;
  totalCountdown:number = 15;

  constructor() { }

  /* methods
  - when counter is finished?
  - update counter
  */
  updateProgress($event){
    this.counterProgress = (this.totalCountdown - $event)/this.totalCountdown
    *100;
  }

  countdownfinished(){
    console.log("countdown has finished");
  }


}
