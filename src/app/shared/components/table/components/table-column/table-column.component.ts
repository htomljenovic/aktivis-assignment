import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-table-column',
  template: ''
  // templateUrl: './table-column.component.html',
  // styleUrls: ['./table-column.component.scss'],
})
export class TableColumnComponent {
  @ContentChild('head') headTemplate: TemplateRef<any>;
  @ContentChild('cell') cellTemplate: TemplateRef<any>;
}
