import { NgModule } from "@angular/core";
import { MdButtonModule, MdCardModule, MdProgressSpinnerModule, MdListModule, MdInputModule } from '@angular/material';

@NgModule({
  imports: [MdButtonModule, MdCardModule, MdProgressSpinnerModule, MdListModule, MdInputModule],
  exports: [MdButtonModule, MdCardModule, MdProgressSpinnerModule, MdListModule, MdInputModule],
})
export class MyOwnCustomMaterialModule { }