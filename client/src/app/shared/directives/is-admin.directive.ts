import { Directive } from '@angular/core';

@Directive({
  selector: '[appIsAdmin]',
  standalone: true
})
export class IsAdminDirective {

  constructor() { }

}
