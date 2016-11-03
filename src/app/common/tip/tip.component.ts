/**
 * confirm
 * @description :: 通用确认框
 */

import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
    selector: '<tip></tip>',
    templateUrl: 'tip.component.html',
    styleUrls: ['./tip.component.css']
})
export class TipComponent {

    //confirm框标题
    @Input() title: string


    //confirm框确认事件回调
    @Output() confirm = new EventEmitter()

    //确认事件
    onConfirm(){
        this.confirm.emit()
    }
}
