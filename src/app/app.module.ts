import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {AppComponent} from './app.component'
import {IndexComponent} from './components/index/index.component'
import {MoldFormComponent} from './components/mold/mold-form.component'
import {UploadComponent} from './components/upload/upload.component'
import {PhotosComponent} from './components/photos/photos.component'
import {MyDialogComponent} from './common/dialog/my-dialog.component'
import {ConfirmComponent} from './common/confirm/confirm.component'
import {TabsComponent} from './common/tabs/tabs.component'
import {TabItemComponent} from './common/tabs/tabItem.component'
import {CheckedComponent} from './components/checked/checked.component'
import {MessageComponent} from './common/message/message.component'
import {ViewerComponent} from './components/viewer/viewer.component'
import {TipComponent} from './common/tip/tip.component'
import {TruingComponent} from './components/truings/truings.component'

import {HttpModule, JsonpModule} from '@angular/http'
@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        MoldFormComponent,
        UploadComponent,
        PhotosComponent,
        MyDialogComponent,
        ConfirmComponent,
        TabsComponent,
        TabItemComponent,
        CheckedComponent,
        MessageComponent,
        ViewerComponent,
        TipComponent,
        TruingComponent
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
export class AppModule {
}
