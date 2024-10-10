import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

interface Education {
  degree: string;
  institution: string;
  orientation: string;
  period: string;
  kode: string;
  linkName: string;
  link: string;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [NgFor],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent {
  yH: Education = {
    degree: 'Yrkeshögskoleexamen (400,0 yhp)',
    institution: 'Jönköping University',
    orientation: 'Webbutvecklare .NET',
    period: '2022-2024',
    kode: 'Kontrollkode: M8AM2-VJE3I',
    linkName: 'Bevis på Ladok',
    link: 'https://www.student.ladok.se/kontrollera',
  };

  @Input() education: Education[] = [this.yH];
}
