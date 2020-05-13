import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TemplateComponent } from '../template/template.component';
import { DynamicComponentService } from '../dynamic-component.service';

@Component({
  selector: '.app-c',
  template:`
    <input type="checkbox" [(ngModel)]="value" [formControl]="form"/>
  `,
  styleUrls: ['./c.component.css']
})

export class CComponent extends TemplateComponent implements OnInit {
  value=false;
  ngOnInit(){
    if(this.style)
    {this.hostStyle = this.doms.bypassSecurityTrustStyle(this.style);
      console.log('host');
    console.log(this.hostStyle)}
  }
}
