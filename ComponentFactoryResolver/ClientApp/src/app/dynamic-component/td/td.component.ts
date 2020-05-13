import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TemplateComponent } from '../template/template.component';
import { DynamicComponentService } from '../dynamic-component.service';

@Component({
  selector: 'td.app-td',
  template:`
  <ng-container #container *ngFor="let item of group"></ng-container>
  `,
  styleUrls: ['./td.component.css']
})
export class TdComponent extends TemplateComponent implements OnInit{
  ngOnInit(){
    if(this.style)
    {this.hostStyle = this.doms.bypassSecurityTrustStyle(this.style);
      console.log('host');
    console.log(this.hostStyle)}
  }
}
