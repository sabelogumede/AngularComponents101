import { Component, Input, Output, OnInit, OnDestroy, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges{
  // ***Lifesycle hooks**
  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy():void{
    this.clearTimeout();
  }

  ngOnChanges(changes):void{
    console.log("init value updated to: ", changes.init.currentValue);
    this.startCountdown();
  }

  // ****properties***
  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();

  @Input() init:number = null;
  public counter:number = 0;
  // Timer Private Ref
  private countdownTimerRef:any = null;

  constructor() { }

  // ***methods***

  startCountdown(){
    if(this.init && this.init >0){
      // clear timer that is working
      this.clearTimeout();
      this.counter = this.init;
      this.doCountdown();
    }
  }

  doCountdown(){
    // timer private ref
    this.countdownTimerRef = setTimeout(()=>{
      this.counter = this.counter -1;
      this.processCountdown();
    }, 1000);
  }

  // clean timer ref - Method
  private clearTimeout(){
    if(this.countdownTimerRef){
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
  }

  processCountdown(){
    //emit event COUNT
    this.onDecrease.emit(this.counter);
    console.log("count is ", this.counter);

    if(this.counter == 0){
      //emit event COUNTER END
      this.onComplete.emit();
      console.log("--counter end--")
    }
    else{
      this.doCountdown();
    }
  }

}
