import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { EducationComponent } from '../../shared/components/cv/education/education.component';
import { ExperienceComponent } from '../../shared/components/cv/experience/experience.component';
import { HeaderCvComponent } from '../../shared/components/cv/header-cv/header-cv.component';
import { ProjectsComponent } from '../../shared/components/cv/projects/projects.component';
import { ReferencesComponent } from '../../shared/components/cv/references/references.component';
import { SkillsComponent } from '../../shared/components/cv/skills/skills.component';
import { SummaryComponent } from '../../shared/components/cv/summary/summary.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    NgIf,
    HeaderCvComponent,
    SummaryComponent,
    ExperienceComponent,
    SkillsComponent,
    ProjectsComponent,
    EducationComponent,
    ReferencesComponent,
    MatDivider,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
