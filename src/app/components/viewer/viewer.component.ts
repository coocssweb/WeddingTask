/**
 *
 * @description :: 大图查看器
 */
import {Component, Input, Output, EventEmitter} from '@angular/core';


@Component({
    selector: '<viewer></viewer>',
    templateUrl: 'viewer.component.html',
    styleUrls: ['./viewer.component.css']
})
export class ViewerComponent {

    //图片列表
    @Input() photoList: any

    //当前图片
    @Input() currentIndex: number

    /**
     * 关闭事件
     * @type {EventEmitter}
     */
    @Output() close = new EventEmitter()


    /**
     * 上一张图片
     */
    onPrev() {
        if (this.currentIndex == 0) {
            return
        }
        this.currentIndex -= 1
    }

    /**
     * 下一张图片
     */
    onNext() {
        if (this.currentIndex == this.photoList.length - 1) {
            return
        }
        this.currentIndex += 1
    }

    onClose() {
        this.close.emit()
    }
}
