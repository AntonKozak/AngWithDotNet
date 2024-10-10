import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface Reference {
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [NgFor],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss',
})
export class ReferencesComponent {
  roman: Reference = {
    name: 'Roman',
    position: 'Senior Development Engineer',
    company: 'DHsolution',
    email: 'roman.matvichuk@gmail.com',
    phone: '+46739764913',
  };

  johan: Reference = {
    name: 'Johan Häggström',
    position: 'Senior Development Engineer',
    company: 'SwedLock AB',
    email: 'Joh@hms.se',
    phone: '+46738404133',
  };
  anders: Reference = {
    name: 'Anders',
    position: 'Senior Development Engineer',
    company: 'HMS networks',
    email: 'Ann@hms.se',
    phone: '+46702062052',
  };

  karin: Reference = {
    name: 'Karin',
    position: 'Senior Development Engineer',
    company: 'HMS networks',
    email: 'kaka@hma.se',
    phone: '+46726013034',
  };

  @Input() references: Reference[] = [
    this.roman,
    this.johan,
    this.anders,
    this.karin,
  ];
}
