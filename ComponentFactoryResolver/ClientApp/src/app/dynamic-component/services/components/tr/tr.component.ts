import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TemplateComponent } from '../template/template.component';
export interface TrAttributes{
  colspan:string,
  rowspan:string
}
export class trAttributes implements TrAttributes{
  colspan = '1';
  rowspan = '2';
}

@Component({
  selector: 'tr.app-tr',
  template:`
  <ng-container #container *ngFor="let item of group"></ng-container>
  `,
  styleUrls: ['./tr.component.css']
})
export class TrComponent extends TemplateComponent implements OnInit {
  ngOnInit(){
    if(this.style)
    {this.hostStyle = this.doms.bypassSecurityTrustStyle(this.style);
      console.log('host');
    console.log(this.hostStyle)}
  }
  setAttributes(){
    
  }
}
