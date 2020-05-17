import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicComponentRoutingModule } from './dynamic-component-routing.module';
import { DynamicComponentDirective } from './dynamic-component.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';
import { AComponent } from './services/components/a/a.component';
import { BComponent } from './services/components/b/b.component';
import { CComponent } from './services/components/c/c.component';
import { DivComponent } from './services/components/div/div.component';
import { TrComponent } from './services/components/tr/tr.component';
import { TdComponent } from './services/components/td/td.component';
import { TableComponent } from './services/components/table/table.component';
import { CheckboxComponent } from './services/components/checkbox/checkbox.component';
import { SharedModule } from '../shared/shared.module';
import { StoreService } from './services/store.service';


@NgModule({
  declarations: [
    DynamicComponentDirective, 
    AComponent, 
    BComponent, 
    CComponent, 
    DynamicComponentComponent,
    DivComponent, 
    TrComponent, 
    TdComponent, 
    TableComponent, 
    CheckboxComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DynamicComponentRoutingModule,
    SharedModule,
  ],
  entryComponents:
  [
    AComponent,
    BComponent,
    CComponent,
    DivComponent,
    TrComponent,
    TdComponent,
    TableComponent,
    CheckboxComponent
  ]
  ,
  exports:[
    DynamicComponentComponent
  ]
})
export class DynamicComponentModule { }
