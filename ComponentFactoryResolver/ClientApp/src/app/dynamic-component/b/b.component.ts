import { Component, OnInit, Input, ChangeDetectorRef, OnChanges, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TemplateComponent } from '../template/template.component';
import { DynamicComponentService } from '../dynamic-component.service';
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
    console.log('init');
    if (this.style) {
    this.hostStyle = this.doms.bypassSecurityTrustStyle(this.style);
      console.log('host');
      console.log(this.hostStyle)
    }
  }
  // getStyle(){
  //   if(!this.style)return {};
  //   let style = {};
  //   let sp = this.style.split(';').map(i=>style[i.split(':')[0]]=i.split(':')[1]);
  //   console.log(style);
  //   return style?style:{};
  // }

}
