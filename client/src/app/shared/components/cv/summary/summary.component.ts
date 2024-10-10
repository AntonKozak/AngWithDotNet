import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  @Input() summaryText: string =
    'I am a junior full-stack developer with a passion for learning and problem-solving. I have experience with JavaScript, TypeScript, Angular, React, Node.js, Express, MongoDB, and SQL. I am looking for a position where I can grow and develop my skills further.';
}
