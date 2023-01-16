import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { SameStringPipe } from './pipes/same-string.pipe';
import { TableColumnComponent } from './components/table/components/table-column/table-column.component';
import { TableComponent } from './components/table/table.component';



@NgModule({
  declarations: [InputComponent, ButtonComponent, SameStringPipe, TableColumnComponent,
    TableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [InputComponent, FormsModule,
    ReactiveFormsModule, ButtonComponent, TableColumnComponent, TableComponent, SameStringPipe]
})
export class SharedModule { }
