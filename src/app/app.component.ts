import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MachineListComponent } from './machine-list/machine-list.component';
import { MachineComponent } from './machine-list/machine/machine.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MachineComponent, MachineListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'washing-machine';
}