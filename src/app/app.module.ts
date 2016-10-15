import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { MoldFormComponent } from './mold/mold-form.component'
import { UploadComponent } from './upload/upload.component'
import { PhotosComponent } from './photos/photos.component'

@NgModule({
  declarations: [
    AppComponent,
    MoldFormComponent,
    UploadComponent,
    PhotosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
