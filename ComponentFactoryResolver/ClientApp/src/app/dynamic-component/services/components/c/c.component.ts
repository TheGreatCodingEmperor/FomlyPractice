import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { TemplateComponent } from '../template/template.component';

@Component({
  selector: '.app-c',
  template:`
    <input type="checkbox" [(ngModel)]="value" [formControl]="form"/>
  `,
  styleUrls: ['./c.component.css']
})

export class CComponent extends TemplateComponent implements OnInit,AfterViewInit {
  value=false;
  ngOnInit(){
    if(this.style)
    {this.hostStyle = this.doms.bypassSecurityTrustStyle(this.style);
      console.log('host');
    console.log(this.hostStyle)}
  }
  ngAfterViewInit(){
    super.ngAfterViewInit();
  }

  setAttributes(){
    
  }
}
