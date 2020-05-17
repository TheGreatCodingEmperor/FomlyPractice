import { Component, OnInit, Input, ViewContainerRef, ViewChild, ViewChildren, QueryList, ChangeDetectorRef, AfterViewInit, AfterContentChecked, ChangeDetectionStrategy, HostBinding, OnDestroy, OnChanges, Injector, Inject, forwardRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FormlyStruct, DynamicComponentService } from '../../dynamic-component.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  // styleUrls: ['./template.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class TemplateComponent implements AfterViewInit, AfterContentChecked, OnInit, OnChanges {
  @HostBinding('style') hostStyle;
  @ViewChildren('container', <any>{ read: ViewContainerRef, static: false }) containers: QueryList<ViewContainerRef>;
  @Input() form: FormControl;
  @Input() group: FormlyStruct[] = [];
  @Input() formGroup: FormGroup;
  @Input() style: string;
  @Input() css: string;
  @Input() attributes: any;

  constructor(
    @Inject(forwardRef(() => DynamicComponentService))
    protected dynamicService:DynamicComponentService,
    protected cdref: ChangeDetectorRef,
    protected doms: DomSanitizer
  ) { }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  // ngOnDestroy(){
  //   console.log('destroy');
  // }

  ngOnInit() {
    console.log('init');
    if (this.style) {
    this.hostStyle = this.doms.bypassSecurityTrustStyle(this.style);
      console.log('host');
      console.log(this.hostStyle)
    }
    this.setAttributes();
    // setTimeout(() => {
    this.dynamicService.buildForm(this.group,this.containers,this.formGroup);

    // }, 1);
  }

  ngAfterViewInit() {
    console.log('build form');
    this.dynamicService.buildForm(this.group, this.containers, this.formGroup);
    // setTimeout(() => {
    this.cdref.detectChanges();
    this.setAttributes();
    // }, 1);
  }

  ngOnChanges() {
    console.log('change');
    // this.dynamicService.buildForm(this.group, this.containers, this.formGroup);
    // setTimeout(() => {
    //   this.cdref.detectChanges();
    // }, 1);
  }
  abstract setAttributes();
}
