/**
 * 入口页面
 * @description :: 入口页面
 */
import { Component, ViewChild } from '@angular/core';

import {PhotosComponent} from '../photos/photos.component'

@Component({
    selector: '<index></index>',
    templateUrl: 'index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent{
    @ViewChild(PhotosComponent)
    private photosComponent: PhotosComponent


    currentTab: string = 'truing'


    onTab(tab, flag){
        if(!flag){
            return
        }

        this.currentTab = tab
    }

}
