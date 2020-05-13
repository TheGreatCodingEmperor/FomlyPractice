import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Input, OnChanges } from '@angular/core';
import { AComponent } from '../a/a.component';
import { BComponent } from '../b/b.component';
import { CComponent } from '../c/c.component';
import { ThrowStmt } from '@angular/compiler';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dynamic-component',
  template:`
    <ng-container #container></ng-container>
  `,
  styleUrls: ['./dynamic-component.component.css']
})
export class DynamicComponentComponent implements OnInit,OnChanges {
  @ViewChild('container',<any>{read:ViewContainerRef,static:true})container:ViewContainerRef;
  @Input()form:FormControl;
  @Input()component:string;
  private components = {
    a:AComponent,
    b:BComponent,
    c:CComponent
  }
  constructor(
    private componentFactoryRef:ComponentFactoryResolver
  ) { }

  ngOnInit() {
  }
  ngOnChanges(){
    this.displayComponent(this.component);
  }

  getComponent(name:string){
    return this.components[name];
  }

  displayComponent(name:string){
    let component = this.componentFactoryRef.resolveComponentFactory(
      this.getComponent(name)
    );
    this.container.clear();
    let viewContainerRef = this.container.createComponent(component);
    viewContainerRef.instance['form']=this.form;
  }

}
