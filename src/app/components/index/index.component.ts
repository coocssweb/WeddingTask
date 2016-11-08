/**
 * 入口页面
 * @description :: 入口页面
 */
import { Component, OnInit } from '@angular/core';
import { IndexRoutingModule } from './index-routing.module'

@Component({
    selector: '<index></index>',
    templateUrl: 'index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

    currentTab: string = 'raw'
    photoInfoId: string

    ngOnInit(): void {
      this.photoInfoId = '3'
    }

    onTab(tab, flag){
        if(!flag){
            return
        }
        this.currentTab = tab
    }

}
