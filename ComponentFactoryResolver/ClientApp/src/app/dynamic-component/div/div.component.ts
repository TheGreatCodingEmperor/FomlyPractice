import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChildren, ViewContainerRef, QueryList, Input } from '@angular/core';
import { TemplateComponent } from '../template/template.component';
import { DynamicComponentService } from '../dynamic-component.service';

@Component({
  selector: 'div.app-div',
  template:`
    <ng-container #container *ngFor="let item of group"></ng-container>
  `,
  styleUrls: ['./div.component.css']
})
export class DivComponent extends TemplateComponent implements OnInit,AfterViewInit {
  ngOnInit() {
    this.containers = this.containers;
    console.log('debug div');
    console.log(this.containers);
    if(this.style)
    {this.hostStyle = this.doms.bypassSecurityTrustStyle(this.style);
      console.log('host');
    console.log(this.hostStyle)}
  }
  ngAfterViewInit(){
    super.ngAfterViewInit();
  }

}
