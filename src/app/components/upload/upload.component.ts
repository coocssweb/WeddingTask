import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {PhotoService} from '../../services/photos.service'
import {CustomerService} from '../../services/customer.service'
import {Customer} from '../../components/customer/customer'
import {Photo} from '../../components/photos/photo'
import StringUtils from '../../utils/stringUtils'

@Component({
    selector: 'upload',
    templateUrl: 'upload.component.html',
    styleUrls: ['./upload.component.css'],
    providers: [PhotoService, CustomerService]
})

export class UploadComponent implements OnInit {
    @Output() uploadPhotoCb = new EventEmitter()

    //当前客户信息
    customer: Customer
    //token
    token: any
    //上传列表
    fileList: any [] = []

    constructor(private photoService: PhotoService, private customerService: CustomerService) {

    }

    /**
     * 初始化事件
     */
    ngOnInit(): void {
        this.getCustomer()
    }

    //上传按钮点击事件
    onClick() {
        document.getElementById('file-upload').click()
    }

    /**
     * 获取七牛Token
     */
    getToken(count): void {
        this.photoService.getToken(this.customer.id, count)
            .then((token: any) => {
                this.token = token
            })
    }

    /**
     * 获取用户信息
     */
    getCustomer(): void {
        this.customerService.getCustomerByPhotoInfo(3).then((response: any)=> {
            this.customer = new Customer(response.id, response.name, response.groupId, response.headImage)
        })
    }

    /**
     * 上传图片
     * @param i
     */
    onUpload(i) {

        //设置等待状态
        this.fileList[i].isWaiting = false
        //设置当前图片为正在上传状态
        this.fileList[i].isUploading = true

        //请求七牛上传接口
        let xhr = new XMLHttpRequest()
        xhr.open('post', 'http://upload.qiniu.com', true)

        //临时存储this
        let _this: any = this

        //当前正在上传的图片
        let file = this.fileList[i]

        //生成图片上传的key

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                //上传成功
                var result = xhr.responseText
                //
                _this.fileList[i].isUploading = false
                _this.fileList[i].isSuccess = true

                //请求保存原片信息
                _this.photoService.save(
                    {
                        imgKey: _this.token.key,
                        imgName: file.imgName,
                        imgShootTime: file.imgShootTime,
                        imgSize: file.imgSize,
                        photoSceneId: _this.currentMold.id
                    }
                ).then((response: any)=> {
                    //移除当前项目
                    _this.fileList.pop()

                    //原片列表插入刚上传的图片信息
                    _this.photoList.unshift(
                        new Photo(response.id, response.imgIndex, response.imgName, response.imgKey,
                            response.imgSize, response.imgShootTime,
                            response.remark, true)
                    )

                    if (_this.fileList.length) {
                        _this.onUpload(_this.fileList.length - 1)
                    }
                })

            }
        }


        //构造Formdata上传信息
        var formData = new FormData()
        formData.append('name', file.imgName)
        formData.append('key', this.token.key)
        formData.append('token', this.token.token)
        formData.append('file', file.file)
        //执行发送
        xhr.send(formData)
    }

    //文件输入框变化事件
    onFileChange(event: any) {
        let files = (<HTMLInputElement>document.getElementById('file-upload')).files
        this.getToken(files.length)




        for (let i = 0; i < files.length; i++) {
            let file = files[i]
            //倒叙插入等待上传的原片
            this.fileList.unshift({
                id: 0,
                imgKey: '',
                imgName: file.name,
                imgSize: (file.size / (1024 * 1024)).toFixed(2),
                imgShootTime: StringUtils.stampToString(file.lastModified),
                file: file,
                remark: '',
                isUploading: false,
                isSuccess: false,
                isWaiting: true
            })
        }
    }

}
