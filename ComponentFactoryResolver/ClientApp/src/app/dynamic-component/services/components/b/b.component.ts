import { Component, OnInit, Input, ChangeDetectorRef, OnChanges, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TemplateComponent } from '../template/template.component';
export interface BAttributes{
  className:string,
  style:string,
  type:string // text/number
}
export class BAttributes implements BAttributes{
  className = '';
  style = '';
  type = 'text';
}
@Component({
  selector: '.app-b',
  template: `
    <input type="text" [ngClass]="css" [formControl]="form"/>
  `,
  styleUrls: ['./b.component.css']
})
export class BComponent extends TemplateComponent implements OnInit, AfterViewInit {
  ngAfterViewInit() {
    super.ngAfterViewInit();
    // console.log('after');
    // this.cdref.detectChanges();
  }

  ngOnInit() {
  }

  setAttributes(){

  }

}
