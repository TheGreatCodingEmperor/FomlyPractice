import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { TemplateComponent } from '../template/template.component';
import { DynamicComponentService } from '../dynamic-component.service';

@Component({
  selector: '.app-a',
  template:`
    <input type="radio" value="hello" [formControl]="form"/>
  `,
  styleUrls: ['./a.component.css']
})
export class AComponent extends TemplateComponent implements OnInit,AfterViewInit {


  ngOnInit() {
    if(this.style)
    {this.hostStyle = this.doms.bypassSecurityTrustStyle(this.style);
      console.log('host');
    console.log(this.hostStyle)}
  }
  ngAfterContentChecked(){
    super.ngAfterViewInit();
  }

}
