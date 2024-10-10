import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgFor],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  arrayOfSkills: string[] = [
    'C#',
    'AngularTS',
    'ReactJS',
    'SQL',
    'NoSQL',
    'MongoDB',
    'Jira',
    'Azure',
    'Git',
    'CI/CD',
    'Jenkins',
    'Docker',
    'Scrum',
    'Agile',
  ];

  @Input() skills: string[] = this.arrayOfSkills;
}
