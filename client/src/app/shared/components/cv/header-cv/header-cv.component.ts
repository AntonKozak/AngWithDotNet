import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-cv',
  standalone: true,
  imports: [],
  templateUrl: './header-cv.component.html',
  styleUrl: './header-cv.component.scss',
})
export class HeaderCvComponent {
  @Input() name: string = 'Anton Kozak';
  @Input() title: string = 'Full-Stack Developer';
  @Input() email: string = 'antonkozak3533@gmail.com';
  @Input() linkedin: string =
    'https://www.linkedin.com/in/anton-kozak-004584a2/';
  @Input() github: string = 'https://github.com/AntonKozak';
}
