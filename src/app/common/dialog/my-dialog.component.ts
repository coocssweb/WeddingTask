/**
 * confirm
 * @description :: 通用确认框
 */

import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: '<my-dialog></my-dialog>',
  templateUrl: 'my-dialog.component.html',
  styleUrls: ['my-dialog.component.css']
})
export class MyDialogComponent {

  //confirm框标题
  @Input() title: string

  //confirm框确认事件回调
  @Output() confirm = new EventEmitter()

  //confirm框取消事件回调
  @Output() cancel = new EventEmitter()

  //确认事件
  onConfirm(){
    this.confirm.emit()
  }

  //取消事件
  onCancel(){
    this.cancel.emit()
  }
}
