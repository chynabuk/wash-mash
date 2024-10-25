import { Component, input, OnInit, output } from '@angular/core';
import { interval } from 'rxjs';
import { Machine, Status } from '../machine.model';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './machine.component.html',
  styleUrl: './machine.component.css'
})
export class MachineComponent implements OnInit{
  machine = input.required<Machine>();
  updateTime = output<{
    machine: Machine,
    dateTime: Date
  }>();

  updateStatus = output<{
    machine: Machine,
    status: Status
  }>();

  ngOnInit(): void {
      interval(1000).subscribe(() => {
        if(this.machine().time){
          this.getDifferenceOfTime(this.machine().time!);
        }
      })
  }

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
