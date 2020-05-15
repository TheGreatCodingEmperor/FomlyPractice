import { Injectable, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef, Component, Injector, ComponentFactory, QueryList } from '@angular/core';
import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';
import { CComponent } from './c/c.component';
import { AbstractControl, FormGroup, FormBuilder } from '@angular/forms';
import { DivComponent } from './div/div.component';
import { TemplateComponent } from './template/template.component';
import { TdComponent } from './td/td.component';
import { TrComponent } from './tr/tr.component';
import { TableComponent } from './table/table.component';
export interface FormlyStruct {
  id: string,
  type: string,
  key: string,
  formControl: AbstractControl,
  group?: FormlyStruct[],
  style?: string
}

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentService {
  private components = {
    a: AComponent,
    b: BComponent,
    c: CComponent,
    div: DivComponent,
    tr: TrComponent,
    td: TdComponent,
    table: TableComponent
  }

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private formBuilder: FormBuilder
  ) { }

  getComponent(name: string) {
    console.log(name);
    return this.components[name];
  }

  displayComponent(container: ViewContainerRef, formlyStruct: FormlyStruct, form: FormGroup) {
    //component(編譯)
    let component = this.getComponent(formlyStruct.type);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      component);

    // //html 加入 component
    const viewContainerRef = container;

    viewContainerRef.clear();
    console.log('clear');
    const componentRef = viewContainerRef.createComponent(componentFactory);
    //component attribute fomrcontrol
    componentRef.instance['form'] = form.get(formlyStruct.key);
    componentRef.instance['group'] = formlyStruct.group;
    componentRef.instance['formGroup'] = form;
    componentRef.instance['style'] = formlyStruct.style;
      componentRef.changeDetectorRef.detectChanges();
  }

  buildGroup(formlyStruct:FormlyStruct[]){
    let keysArray = JSON.stringify(formlyStruct).match(/key":"[a-z,0-9]*/g).map(i => i.split(":")[1].replace('"', ''));
    console.log(keysArray);
    let keys = {};
    for (let item of keysArray) {
      keys[item] = [];
    }
    return this.formBuilder.group(keys);
  }

  buildForm(formlyStruct:FormlyStruct[],containers:QueryList<ViewContainerRef>,form:FormGroup){
    if(!formlyStruct)return;
    let n = formlyStruct.length;
    for (let i = 0; i < n; i++) {
      this.displayComponent(containers.toArray()[i], formlyStruct[i], form);
    }
  }
}
