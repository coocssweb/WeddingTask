import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MoldFormComponent } from './mold/mold-form.component';

@NgModule({
  declarations: [
    MoldFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [MoldFormComponent]
})
export class AppModule { }
