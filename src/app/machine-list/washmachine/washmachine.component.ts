import { Component, ElementRef, input, Input, OnInit, output, Renderer2 } from '@angular/core';
import { interval } from 'rxjs';
import { Machine, Status } from '../machine.model';

@Component({
  selector: 'app-washmachine',
  templateUrl: './washmachine.component.html',
  standalone: true,
  styleUrls: ['./washmachine.component.css']
})
export class WashmachineComponent implements OnInit {
  machine = input.required<Machine>();
  updateTime = output<{
    machine: Machine,
    dateTime: Date
  }>();

  updateStatus = output<{
    machine: Machine,
    status: Status
  }>();
  @Input() machineNumber!: number;
  isActive = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    // this.turnOn();
    // setTimeout(() => {
    //   this.turnOff();
    // }, 3000); // 3 seconds for demo
    var washer = createWashmachine(1);
    this.el.nativeElement.parentElement.appendChild(washer);
    let flag = false;
    interval(1000).subscribe(() => {
            if(this.machine().time){
              var display = washer.querySelector(".washmachine-display");
              if (display != null) {
                display.innerHTML = this.getDifferenceOfTime(this.machine().time!);
                if (!flag && display.innerHTML != "") {
                  turnOn(washer);
                  flag = true;
                } else if (flag && display.innerHTML == "") {
                  turnOff(washer);
                  flag = false;
                }
              }
            }
          })
  }

//   ngOnInit(): void {
//     interval(1000).subscribe(() => {
//       if(this.machine().time){
//         this.getDifferenceOfTime(this.machine().time!);
//       }
//     })
// }

getDifferenceOfTime(dateTime: Date){
  const now = new Date();
  console.log('machine endTime', dateTime);
  console.log('current time', now);
  const diffMilliseconds  = dateTime.getTime() - now.getTime();

  if(diffMilliseconds > 0){
    this.updateTime.emit({
      machine: this.machine(),
      dateTime: dateTime
    })
    return this.millisecondsConvertiser(diffMilliseconds);
  }
  else{
    this.updateStatus.emit({
      machine: this.machine(),
      status: Status.f
    });
  }

  return '';
}



private millisecondsConvertiser(milliseconds: number){
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

  let message = '';
  message += hours < 10 ? '0' + hours : hours;
  message += ':';

  message += minutes < 10 ? '0' + minutes : minutes;
  message += ':';

  message += seconds < 10 ? '0' + seconds : seconds;

  return message;
}
}

function createWashmachine(number: number) {
  let washmachine = document.createElement("div");
  washmachine.classList.add("washmachine");

  let washmachine_display = document.createElement("div");
  washmachine_display.classList.add("washmachine-display");
  washmachine.appendChild(washmachine_display);

  let washmachine_buttons = document.createElement("div");
  washmachine_buttons.classList.add("washmachine-buttons");
  washmachine.appendChild(washmachine_buttons);
  
  for (let i = 0; i < 3; i++) {
    let washmachine_button = document.createElement("div");
    washmachine_button.classList.add("washmachine-button");
    washmachine_buttons.appendChild(washmachine_button);
  }

  let washmachine_number = document.createElement("div");
  washmachine_number.classList.add("washmachine-number");
  washmachine_number.innerHTML = number + '';
  washmachine.appendChild(washmachine_number);

  let washmachine_drum = document.createElement("div");
  washmachine_drum.classList.add("washmachine-drum");
  washmachine.appendChild(washmachine_drum);

  let washmachine_drum_animation = document.createElement("div");
  washmachine_drum_animation.classList.add("washmachine-drum-animation");
  washmachine.appendChild(washmachine_drum_animation);
  
  return washmachine;
}

function turnOn(w: any) {
  w.classList.add("active");
}

function turnOff(w: any) {
  w.classList.remove("active");
  new Audio('/assets/audio/ringtone.mp3').play().catch(error => console.log("Error playing audio:", error));
}

var washer = createWashmachine(1);