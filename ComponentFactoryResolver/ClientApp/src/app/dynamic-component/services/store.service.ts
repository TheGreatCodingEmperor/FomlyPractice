import { Injectable, Component } from '@angular/core';
import { AComponent } from './components/a/a.component';
import { BComponent } from './components/b/b.component';
import { CComponent } from './components/c/c.component';
import { DivComponent } from './components/div/div.component';
import { TrComponent, trAttributes } from './components/tr/tr.component';
import { TdComponent, tdAttributes } from './components/td/td.component';
import { TableComponent } from './components/table/table.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private components = {
    a: { component: AComponent, default: null },
    b: { component: BComponent, default: null },
    c: { component: CComponent, default: null },
    div: { component: DivComponent, default: null },
    tr: { component: TrComponent, default: trAttributes },
    td: { component: TdComponent, default: tdAttributes },
    table: { component: TableComponent, default: null },
    checkbox: { component: CheckboxComponent, default: null }
  }

  constructor() { }

  getComponent(name: string) {
    console.log(name);
    return this.components[name].component;
  }
  defaultAttributes(name: string) {
    let res = this.components[name].default;
    if(res == null || res == undefined)return {};
    return this.components[name].default;
  }
}
