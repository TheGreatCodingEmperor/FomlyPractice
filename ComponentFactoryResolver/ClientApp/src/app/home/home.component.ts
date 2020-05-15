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
  value:'50';
  formControl: AbstractControl;
  group = {};
  struct: FormlyStruct[] = [
    {
      id: 'div',
      type: 'div',
      key: 'div',
      formControl: null,
      group: [
        {
          id: 'table',
          type: 'table',
          key: 'table',
          style: '',
          formControl: null,
          group: [
            {
              id: 'tr1',
              type: 'tr',
              key: 'tr',
              style: '',
              formControl: null,
              group: [
                {
                  id: 'td1',
                  type: 'td',
                  key: '',
                  formControl: null,
                  style: 'background-color:pink;',
                  group: [
                    {
                      id: 'b',
                      type: 'b',
                      key: 'name',
                      style:'background-color:pink;',
                      formControl: null
                    }
                  ]
                },
                {
                  id: 'td2',
                  type: 'td',
                  key: '',
                  style: 'border:solid;',
                  formControl: null,
                  group: [
                    {
                      id: 'a',
                      type: 'a',
                      key: 'email',
                      style:'background-color:pink;',
                      formControl: null
                    }
                  ]
                }
              ]
            },
            {
              id: 'tr2',
              type: 'tr',
              key: '',
              style: 'border:solid;',
              formControl: null,
              group: [
                {
                  id: 'td21',
                  type: 'td',
                  key: '',
                  style:'background-color:pink;',
                  formControl: null,
                  group: [
                    {
                      id: 'b2',
                      type: 'b',
                      key: 'name2',
                      formControl: null
                    }
                  ]
                },
                {
                  id: 'td22',
                  type: 'td',
                  key: '',
                  formControl: null,
                  group: [
                    {
                      id: 'c',
                      type: 'c',
                      key: 'bool',
                      style:'background-color:pink;',
                      formControl: null,
                    }
                  ]
                }
              ]
            }]
        }
      ]
    },
  ];
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private dinamicService: DynamicComponentService,
    private formBuilder: FormBuilder,
    private cdref: ChangeDetectorRef
  ) {
    this.form = this.dinamicService.buildGroup(this.struct);
  }

  ngAfterViewInit() {
    this.dinamicService.buildForm(this.struct, this.containers, this.form);
    this.cdref.detectChanges();
  }


  get locate(){
    if(this.form)
    {let value = this.form.get('name');
    console.log('debug vallue');
    console.log(value);
    return `${eval(`500 * ${value}`)}px`;}
    return "";
  }

  getFormControl(key: string) {
    return this.form.get(key);
  }

  keys() {
    return Object.keys(this.form.value);
  }

  values() {
    return Object.values(this.form.value);
  }

  structChange(event) {
    console.log(event.value);
    this.struct = JSON.parse(event.value);
    let n = this.containers.length;
    for(let item of this.containers.toArray()){
      item.clear();
    }
    this.dinamicService.buildGroup(this.struct);
    this.dinamicService.buildForm(this.struct,this.containers,this.form);
    console.log(this.struct);
  }
}
