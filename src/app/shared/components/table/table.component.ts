import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { TableColumnComponent } from './components/table-column/table-column.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterContentInit {
  @Input() data: any[];

  @Output() onEditClicked = new EventEmitter();

  @ContentChildren(TableColumnComponent)
  tableChildren: QueryList<TableColumnComponent>;

  public cellTemplates = [];

  public headTemplates = [];

  /** Add templates to each table header and cell */
  ngAfterContentInit(): void {
    this.tableChildren.forEach((element) => {
      this.cellTemplates.push(element.cellTemplate);
      this.headTemplates.push(element.headTemplate);
    });

  }

  ngOnInit(): void {
  }


  /** Emit item value which has been clicked
   * @param clickedItem table item 
   */
  public onEditClick(clickedItem: any) {
    this.onEditClicked.emit(clickedItem);
  }

}
