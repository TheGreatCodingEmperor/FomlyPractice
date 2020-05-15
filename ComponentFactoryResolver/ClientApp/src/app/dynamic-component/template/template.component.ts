import { Component, OnInit, Input, ViewContainerRef, ViewChild, ViewChildren, QueryList, ChangeDetectorRef, AfterViewInit, AfterContentChecked, ChangeDetectionStrategy, HostBinding, OnDestroy, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormlyStruct, DynamicComponentService } from '../dynamic-component.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  // styleUrls: ['./template.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateComponent implements AfterViewInit,AfterContentChecked,OnInit,OnChanges{
  @HostBinding('style') hostStyle;
  @ViewChildren('container', <any>{ read: ViewContainerRef,  static: false }) containers: QueryList<ViewContainerRef>;
  @Input() form:FormControl;
  @Input() group:FormlyStruct[]=[];
  @Input() formGroup:FormGroup;
  @Input() style:string;
  @Input() css:string;

  constructor(
    protected cdref:ChangeDetectorRef,
    protected dynamicService:DynamicComponentService,
    protected doms: DomSanitizer
  ) { }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  // ngOnDestroy(){
  //   console.log('destroy');
  // }

  ngOnInit(){
    console.log('init');
    if(this.style)
    {this.hostStyle = this.doms.bypassSecurityTrustStyle(this.style);
      console.log('host');
    console.log(this.hostStyle)}
  }

  ngAfterViewInit(){
    console.log('build form');
    this.dynamicService.buildForm(this.group,this.containers,this.formGroup);
    setTimeout(() => {
      this.cdref.detectChanges();
    }, 1);
  }
  ngOnChanges(){
    console.log('change');
    this.dynamicService.buildForm(this.group,this.containers,this.formGroup);
    setTimeout(() => {
      this.cdref.detectChanges();
    }, 1);
  }

}
