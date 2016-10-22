import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { MoldFormComponent } from './components/mold/mold-form.component'
import { UploadComponent } from './components/upload/upload.component'
import { PhotosComponent } from './components/photos/photos.component'
import { ConfirmComponent } from './common/confirm/confirm.component'

import { HttpModule, JsonpModule } from '@angular/http'
@NgModule({
  declarations: [
    AppComponent,
    MoldFormComponent,
    UploadComponent,
    PhotosComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
