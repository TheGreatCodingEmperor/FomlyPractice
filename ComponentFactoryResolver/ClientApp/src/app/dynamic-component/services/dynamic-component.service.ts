import { Injectable, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef, Component, Injector, ComponentFactory, QueryList } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { StoreService } from './store.service';
import { FormStyle } from '@angular/common';
export interface FormlyStruct {
  id: string,//html id
  component: string,//component name
  key: string,//form control name
  formControl: AbstractControl,//form controll
  group?: FormlyStruct[],//child components
  style?: string//component styles
  className?:string//component css classes
  attributes?:object//component attributes
}
export interface IDynamicComponent {
  formlyStructs:FormlyStruct[],
  containers:QueryList<ViewContainerRef>,
  formGroup?:FormGroup,
  cdref?:ChangeDetectorRef
}

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentService {
  attributesTrigger:BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private storeService:StoreService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private formBuilder: FormBuilder
  ) { }

  getComponent(name: string) {
    // console.log(name);
    return this.storeService.getComponent(name);
  }

  displayComponent(container: ViewContainerRef, formlyStruct: FormlyStruct, form: FormGroup) {
    //component(編譯)
    let component = this.getComponent(formlyStruct.component);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      component);

    // //html 加入 component
    const viewContainerRef = container;

    viewContainerRef.clear();

    setTimeout(() => {
      const componentRef = viewContainerRef.createComponent(componentFactory);
      console.log(componentRef);
    //component attribute fomrcontrol
    componentRef.instance['component'] = formlyStruct.component;
    componentRef.instance['form'] = form.get(formlyStruct.key);
    componentRef.instance['group'] = formlyStruct.group;
    componentRef.instance['formGroup'] = form;
    componentRef.instance['style'] = formlyStruct.style;
    componentRef.instance['className'] = formlyStruct.className;
    componentRef.instance['attributes'] = formlyStruct.attributes;
    componentRef.changeDetectorRef.detectChanges();
    }, 10);
  }

  buildGroup(formlyStruct:FormlyStruct[]){
    let keysArray = JSON.stringify(formlyStruct).match(/key":"[a-z,0-9]*/g).map(i => i.split(":")[1].replace('"', '')).filter(i => i!='');
    console.log(keysArray);
    let keys = {};
    for (let item of keysArray) {
      keys[item] = [];
    }
    return this.formBuilder.group(keys);
  }

  buildForm(formlyStruct:FormlyStruct[],containers:QueryList<ViewContainerRef>,form:FormGroup,cdref?:ChangeDetectorRef){
    if(!formlyStruct)return;
    let n = formlyStruct.length;
    for (let i = 0; i < n; i++) {
      this.displayComponent(containers.toArray()[i], formlyStruct[i], form);
    }
    if(cdref&&!cdref['destroyed']){
      setTimeout(() => {
        cdref.detectChanges();
      }, 1);
    }
  }

  build(formGroup:FormGroup,formlyStructs:FormlyStruct[],containers:QueryList<ViewContainerRef>,cdref?:ChangeDetectorRef){
    formGroup = this.buildGroup(formlyStructs);
    setTimeout(() => {
      this.buildForm(formlyStructs,containers,formGroup,cdref);
    }, 1);
    return formGroup;
  }
}
