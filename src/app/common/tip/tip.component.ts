/**
 * confirm
 * @description :: 通用确认框
 */

import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core'

@Component({
    selector: '<tip></tip>',
    templateUrl: 'tip.component.html',
    styleUrls: ['./tip.component.css']
})
export class TipComponent implements OnInit, OnDestroy{

    //confirm框标题
    @Input() title: string


    //confirm框确认事件回调
    @Output() confirm = new EventEmitter()

  /**
   * 初始化事件
   */
  ngOnInit(): void {
    let dom = (<HTMLElement>document.getElementById('html'))
    dom.style.overflow = 'hidden'
    dom.style.height='100%'
  }

  /**
   * 组件摧毁
   */
  ngOnDestroy(){
    let dom = (<HTMLElement>document.getElementById('html'))
    dom.style.overflow = 'auto'
    dom.style.height=''
  }


  //确认事件
    onConfirm(){
        this.confirm.emit()
    }
}
