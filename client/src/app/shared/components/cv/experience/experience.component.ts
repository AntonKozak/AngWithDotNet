import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

interface Experience {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [NgFor],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  HMS: Experience = {
    title: 'Junior Full-Stack Developer',
    company: 'HMS',
    period: '01.11.2023 - 01.06.2024',
    responsibilities: [
      'Developed a full-stack web application using Angular ',
      'Utilized Angular Material for the UI',
      'Used Git for version control',
      'State management with NgRx',
      'Implemented RESTful APIs using C#',
      'Babel for transpiling',
      'Jasmine for unit testing',
      'Jenkins for CI/CD',
      'OOP principles and SOLID principles',
    ],
  };

  @Input() experiences: Experience[] = [this.HMS];
}
