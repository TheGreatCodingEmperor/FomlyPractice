import { Component, OnInit, ChangeDetectorRef, HostBinding } from '@angular/core';
import { TemplateComponent } from '../template/template.component';
export interface TdAttributes {
  colspan: string,
  rowspan: string
}
export class tdAttributes implements TdAttributes {
  colspan = '1';
  rowspan = '1';
}
@Component({
  selector: 'td.app-td',
  template: `
  <ng-container #container *ngFor="let item of group"></ng-container>
  `,
  styleUrls: ['./td.component.css']
})
export class TdComponent extends TemplateComponent implements OnInit {
  @HostBinding('attr.colspan') colspan;
  @HostBinding('attr.rowspan') rowspan;

  ngOnInit() {
    if (this.style) {
    this.hostStyle = this.doms.bypassSecurityTrustStyle(this.style);
      console.log('host');
      console.log(this.hostStyle)
    }
    // this.setAttributes();
  }

  ngOnChanges(){
    this.setAttributes();
  }

  setAttributes(){
    if(!this.attributes){
      this.attributes = new tdAttributes();
    }
    console.log('set attributes td');
    console.log(this.attributes);
    let td:TdAttributes = this.attributes;
    this.colspan =td.colspan;
    this.rowspan =td.rowspan;
  }
}
