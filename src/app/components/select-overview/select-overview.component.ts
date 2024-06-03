import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-select-overview',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './select-overview.component.html',
  styleUrl: './select-overview.component.css'
})
export class SelectOverviewComponent {

  @Input()
  driversNames!: string[];

  selectedDriver:string = "";



  @Output() messageEvent = new EventEmitter<string>();
  sendMessage(value : any) {
    this.messageEvent.emit(value);
  }
}
