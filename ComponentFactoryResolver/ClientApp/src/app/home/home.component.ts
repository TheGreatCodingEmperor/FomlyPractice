import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { DynamicComponentDirective } from '../dynamic-component/dynamic-component.directive';
import { DynamicComponentService, FormlyStruct } from '../dynamic-component/services/dynamic-component.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements AfterViewInit,OnInit {
  selectedComponentName: string;
  // @ViewChild('container', <any>{ read: ViewContainerRef, static: true }) dynamicComponent: ViewContainerRef;
  @ViewChildren('formly', <any>{ read: ViewContainerRef, statnpmic: true }) containers: QueryList<ViewContainerRef>;
  form: FormGroup=new FormGroup({});
  value:'50px';
  struct: FormlyStruct[] =  [
    {
      id: 'div',
      component: 'div',
      key: null,
      formControl: null,
      group: [
        {
          id: 'table',
          component: 'table',
          key: 'table',
          style: '',
          formControl: null,
          group: [
            {
              id: 'tr1',
              component: 'tr',
              key: 'tr',
              style: '',
              formControl: null,
              group: [
                {
                  id: 'td1',
                  component: 'td',
                  key: '',
                  formControl: null,
                  style: 'background-color:pink;',
                  attributes:{
                    colspan:"2"
                  },
                  group: [
                    {
                      id: 'b',
                      component: 'checkbox',
                      key: 'name',
                      style:'background-color:pink;',
                      formControl: null
                    }
                  ]
                },
                {
                  id: 'td2',
                  component: 'td',
                  key: '',
                  style: 'border:solid;',
                  formControl: null,
                  group: [
                    {
                      id: 'a',
                      component: 'a',
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
              component: 'tr',
              key: '',
              style: 'border:solid;',
              formControl: null,
              group: [
                {
                  id: 'td21',
                  component: 'td',
                  key: '',
                  style:'background-color:pink;',
                  formControl: null,
                  group: [
                    {
                      id: 'b2',
                      component: 'b',
                      key: 'name2',
                      formControl: null
                    }
                  ]
                },
                {
                  id: 'td22',
                  component: 'td',
                  key: '',
                  formControl: null,
                  group: [
                    {
                      id: 'c',
                      component: 'c',
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
   
  }

  ngOnInit(){
    setTimeout(() => {
      this.form = this.dinamicService.build(this.form,this.struct,this.containers,this.cdref);
    }, 1);
  }

  ngAfterViewInit() {
    
    // this.cdref.detectChanges();
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
    this.struct = JSON.parse(event.value);
    
    this.form = this.dinamicService.build(this.form,this.struct,this.containers,this.cdref);
  }

  insert(){
    let vcr = this.containers.toArray()[0];
    vcr.clear();
    let component = this.dinamicService.getComponent('a');
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      component);
    vcr.createComponent(componentFactory);
  }
}
