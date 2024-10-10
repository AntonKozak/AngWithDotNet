import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss'
})
export class TextAreaComponent {

@Input() placeholder: string = 'Enter text here';  
@Input() value: string = '';  
@Input() rows: number = 5;  
@Input() disabled: boolean = false;

// Output event when the text changes
@Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();

// Emit the value when the textarea content changes
onValueChange(event: Event): void {
  const target = event.target as HTMLTextAreaElement;
  this.valueChanged.emit(target.value);
}
}
