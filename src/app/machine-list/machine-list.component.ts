import { Component, inject } from '@angular/core';
import { Machine, Status } from './machine.model';
import { MachineComponent } from './machine/machine.component';
import { MachinesService } from './machines.service';
import { WashmachineComponent } from './washmachine/washmachine.component';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [MachineComponent, WashmachineComponent],
  templateUrl: './machine-list.component.html',
  styleUrl: './machine-list.component.css'
})
export class MachineListComponent {
  private machinesService = inject(MachinesService);
  machines = this.machinesService.allMachines;

  onTimeUpdate(machineDateTime: {
    machine: Machine,
    dateTime: Date
  }){
    this.machinesService.updateMachineTime(machineDateTime.machine, machineDateTime.dateTime);
  }

  onStatusUpdate(machineStatus: {
    machine: Machine,
    status: Status
  }){
    this.machinesService.updateMachineStatus(machineStatus.machine, machineStatus.status);
  }
}
