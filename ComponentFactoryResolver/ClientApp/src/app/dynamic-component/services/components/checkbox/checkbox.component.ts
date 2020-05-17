import { Component, OnInit } from '@angular/core';
import { TemplateComponent } from '../template/template.component';

@Component({
  selector: 'app-checkbox',
  template:`
    <mat-checkbox [formControl]="form">Check me!</mat-checkbox>
  `,
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent extends TemplateComponent implements OnInit {

  ngOnInit() {

  }

  setAttributes(){
    
  }

}
