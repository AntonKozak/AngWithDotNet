import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DeskopHeaderComponent } from './deskop-header/deskop-header.component';
import { MobileHeaderComponent } from './mobile-header/mobile-header.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, MobileHeaderComponent, DeskopHeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isMobile: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe((result) => {
      this.isMobile = result.matches;
    });
  }
}
