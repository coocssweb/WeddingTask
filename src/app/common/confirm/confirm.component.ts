/**
 * confirm
 * @description :: 通用确认框
 */

import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core'

@Component({
  selector: '<confirm></confirm>',
  templateUrl: 'confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit, OnDestroy{

  //confirm框标题
  @Input() title: string

  //confirm框内容
  @Input() content: string

  //confirm框确认事件回调
  @Output() confirm = new EventEmitter()


  //confirm框取消事件回调
  @Output() cancel = new EventEmitter()


  /**
   * 初始化事件
   */
  ngOnInit(): void {
    let dom = (<HTMLElement>document.getElementById('html'))
    dom.style.overflow = 'hidden'
    dom.style.height='100%'
  }

  ngOnDestroy(){
    let dom = (<HTMLElement>document.getElementById('html'))
    dom.style.overflow = 'auto'
    dom.style.height=''
  }

  //确认事件
  onConfirm(){
    this.confirm.emit()
  }

  //取消事件
  onCancel(){
    this.cancel.emit()
  }
}
