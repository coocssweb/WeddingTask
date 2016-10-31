import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'upload',
    templateUrl: 'upload.component.html',
    styleUrls: ['./upload.component.css'],
})

export class UploadComponent {

    @Output() uploadPhotoCb = new EventEmitter()

    //上传按钮点击事件
    onClick() {
        document.getElementById('file-upload').click()
    }

    //文件输入框变化事件
    onFileChange(event: any) {

        let files = (<HTMLInputElement>document.getElementById('file-upload')).files

        let fileList = []

        for (let i = 0; i < files.length; i++) {
            fileList.push(files[i])
        }


        //回调预览图片事件
        this.uploadPhotoCb.emit(fileList)
    }

}
