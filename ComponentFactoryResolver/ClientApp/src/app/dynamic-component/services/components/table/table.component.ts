import { Component, OnInit, ChangeDetectorRef, Renderer, ElementRef, HostBinding } from '@angular/core';
import { TemplateComponent } from '../template/template.component';
import { DomSanitizer } from '@angular/platform-browser';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'table.app-table',
  host: {
    '[style]': 'styleAsString()'
  },
  template: `
  <ng-container #container *ngFor="let item of group"></ng-container>
  `,
  styleUrls: ['./table.component.css']
})
export class TableComponent extends TemplateComponent implements OnInit {
  ngOnInit() {
    console.log(this.style);
    if(this.style)
    {this.hostStyle = this.doms.bypassSecurityTrustStyle(this.style);
      console.log('host');
    console.log(this.hostStyle)}
  }

  setAttributes(){
    
  }
}
