import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { DynamicComponentDirective } from '../dynamic-component/dynamic-component.directive';
import { DynamicComponentService, FormlyStruct } from '../dynamic-component/dynamic-component.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements AfterViewInit {
  selectedComponentName: string;
  // @ViewChild('container', <any>{ read: ViewContainerRef, static: true }) dynamicComponent: ViewContainerRef;
  @ViewChildren('formly', <any>{ read: ViewContainerRef, static: true }) containers: QueryList<ViewContainerRef>;
  form: FormGroup;
  formControl: AbstractControl;
  group = {};
  struct: FormlyStruct[] = [{
    id: 'b',
    type: 'b',
    key: 'name',
    formControl: null
  }, {
    id: 'a',
    type: 'a',
    key: 'email',
    formControl: null
  }, {
    id: 'c',
    type: 'c',
    key: 'bool',
    formControl: null,
  },
  {
    id:'div',
    type:'div',
    key:'',
    formControl:null,
    group: [
      {
        id: 'b',
        type: 'b',
        key: 'name2',
        formControl: null
      },
      {
        id: 'c',
        type: 'c',
        key: 'bool2',
        formControl: null,
      }
    ]
  }
  ];
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private dinamicService: DynamicComponentService,
    private formBuilder: FormBuilder,
    private cdref:ChangeDetectorRef
  ) {
    let keysArray = JSON.stringify(this.struct).match(/key":"[a-z,0-9]*/g).map(i=>  i.split(":")[1].replace('"',''));
    console.log(keysArray);
    let keys = {};
    for (let item of keysArray) {
      keys[item] = [];
    }
    this.form = this.buildGroup(keys);
  }

  ngAfterViewInit() {
    console.log("container");
    console.log(this.containers);

    let n = this.struct.length;
    for (let i = 0; i < n; i++) {
      // this.displayComponent(this.containers.toArray()[i], this.struct[i], i);
      this.dinamicService.displayComponent(this.containers.toArray()[i],this.struct[i],this.form);
    }
    this.cdref.detectChanges();
  }

  buildGroup(keys: object) {
    return this.formBuilder.group(keys);
  }

  getFormControl(key: string) {
    return this.form.get(key);
  }

  displayComponent(container: ViewContainerRef, formlyStruct: FormlyStruct, index: number) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.dinamicService.getComponent(formlyStruct.type));

    console.log("debug display");
    console.log(componentFactory);

    const viewContainerRef = container;
    console.log(viewContainerRef);

    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance['form'] = this.getFormControl(formlyStruct.key);
    if(formlyStruct.group)  componentRef.instance['group'] =formlyStruct.group;
    if (formlyStruct.group && formlyStruct.group.length > 0) {
      let n = formlyStruct.group.length;
      for (let i = 0; i < n; i++) {
        console.log(componentRef.instance);
        // if(componentRef.instance['containers']){
          this.displayComponent(componentRef.instance['containers'].toArray()[i], this.struct[i], i);
        // }
      }
    }
    // this.formControl = this.form.get('name');
  }
  keys(){
    return Object.keys(this.form.value);
  }
  values(){
    return Object.values(this.form.value);
  }
}
