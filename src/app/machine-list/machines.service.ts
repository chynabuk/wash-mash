import { Injectable, signal } from '@angular/core';
import { Machine, MachineType, Status } from './machine.model';

@Injectable({
  providedIn: 'root'
})
export class MachinesService {
  private machines = signal<Machine[]>([]);
  allMachines = this.machines.asReadonly();

  constructor() {
    this.populate();
  }

  private populate(): void{
    this.addMachine({
      name: '1',
      status: Status.f,
      type: MachineType.w
    });

    this.addMachine({
      name: '2',
      status: Status.o,
      type: MachineType.w
    });
    this.addMachine({
      name: '3',
      status: Status.o,
      type: MachineType.w,
      time: this.generateTime(1, 2)
    });
    this.addMachine({
      name: '4',
      status: Status.f,
      type: MachineType.w
    });
    this.addMachine({
      name: '5',
      status: Status.f,
      type: MachineType.d

    });
    this.addMachine({
      name: '6',
      status: Status.o,
      type: MachineType.d

    });
    // const now =  new Date();
    // now.setMinutes(now.getMinutes() + 1);
    this.addMachine({
      name: '7',
      status: Status.o,
      type: MachineType.d,
      time: this.generateTime(1, 2)
    });
    
  }

  updateMachineTime(machine: Machine, dateTime: Date){
    this.machines.update(oldValues => {
      oldValues.map(m => {
        if(m === machine){
          m.time = dateTime;
        }
        return m;
      });
      return oldValues;
    })
  }
  
  updateMachineStatus(machine: Machine, status: Status){
    this.machines.update(oldValues => {
      oldValues.map(m => {
      if(m === machine){
        m.status = status;
        if(status === Status.f) {
          m.time = undefined;
          this.playRingtone();
        }
        else m.time = this.generateTime(90, 8);
      }
      return m;
    });
    return oldValues;
    })
  }
  private playRingtone(): void {
    const audio = new Audio('/assets/audio/ringtone.mp3');
    audio.play().catch(error => console.log('Error playing audio:', error));
  }

  private addMachine(machine: Machine){
    if(machine.status === Status.o){
      if(!machine.time){
        if(machine.name === '3') machine.time = this.generateTime(2, 1);
        else machine.time = this.generateTime(8, 50);
      }
      
    }
    this.machines.update((oldValues) => [...oldValues, machine]);
  }

  private generateTime(min: number, max: number){
    const now = new Date();
    now.setMinutes(now.getMinutes() + Math.random() * (max - min) + min);
    return now;
  }
}