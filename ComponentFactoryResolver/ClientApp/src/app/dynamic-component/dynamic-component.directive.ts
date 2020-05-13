import { Directive,ViewContainerRef } from '@angular/core';
import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';
import { CComponent } from './c/c.component';

@Directive({
  selector: '[appDynamicComponent]'
})
export class DynamicComponentDirective {
  private components = {
    a:AComponent,
    b:BComponent,
    c:CComponent
  }

  constructor(
    public viewContainerRef:ViewContainerRef
  ) { }
}
