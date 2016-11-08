/**
 * 图片类型表单
 * @description :: 图片类型表单
 */
import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {Mold} from './mold'
import {MoldService} from '../../services/mold.service'
import StringUtils from '../../utils/stringUtils'

@Component({
    selector: '<mold-form></mold-form>',
    templateUrl: 'mold-form.component.html',
    styleUrls: ['./mold-form.component.css'],
    providers: [MoldService]
})
export class MoldFormComponent implements OnInit {

    @Input() photoInfoId : string

    //切换场景回调
    @Output() onTabMoldCb = new EventEmitter()

    //删除场景回调
    @Output() onDeleteMoldCb = new EventEmitter()

    //完成提交
    @Output() finishCb = new EventEmitter()

    //场景状态
    moldStatus = 0
    //是否显示删除确认框
    isShowDeleteConfirm = false

    //常用场景
    moldOptions: Mold[]

    //项目列表
    moldList: Mold[] = []

    //当前选择项
    selectedMold = {
        id: 0
    }

    //输入值
    inputMold = new Mold(0, '', 0, 0)

    //是否显示添加框
    isShowForm = false

    //是否正在编辑状态
    isSetting = false

    //当前要删除的场景
    removeMold: Mold

    isShowTip: boolean = false

    /**
     * 构造函数
     * @param moldService
     */
    constructor(private moldService: MoldService) {
    }

    /**
     * 初始化事件
     */
    ngOnInit(): void {
        this.getRawInfo()
        this.getMolds()
        this.getOptions()
    }

    /**
     * 获取常用场景
     */
    getOptions() {
        this.moldService.getOptions()
            .then((molds: any) => {
                this.moldOptions = molds
            })
    }

    getRawInfo(){
        this.moldService.getRawInfo(this.photoInfoId)
          .then((result: any) => {
              //设置场景状态
              this.moldStatus = result&&result.busRawStatus ? result.busRawStatus : 0
          })
    }

    /**
     * 获取场景
     */
    getMolds(): void {
        this.moldService.getMolds(this.photoInfoId)
            .then((molds: any) => {
                let totalRaw = 0
                let totalChecked = 0

                molds.photoSceneCounts.map((item)=> {
                    totalRaw += item.rawNum ? item.rawNum : 0
                    totalChecked += item.checkedNum ? item.checkedNum : 0
                })

                let totalMold = new Mold(0, '全部', totalRaw, totalChecked)
                this.moldList = molds.photoSceneCounts
                this.moldList = [totalMold].concat(this.moldList)
            })
    }

    //提交
    onSubmit() {

        if (!this.inputMold.sceneName) {
            return
        }

        this.moldService.addMold(this.photoInfoId, this.inputMold.sceneName).then(
            (response: any)=> {
                this.inputMold = new Mold(0, '', 0, 0)
                this.isShowForm = false
                this.moldList.push(new Mold(response.id, response.sceneName, 0, 0))
                this.isShowTip = true
            }
        )
    }

    /**
     * 原片上传结束
     */
    onFinish() {
        this.finishCb.emit()
    }

    //切换选择项
    onSelectMold(mold) {
        //是否正在编辑状态
        if (this.isSetting) {
            return
        }

        this.selectedMold = mold
        this.onTabMoldCb.emit(mold)
    }

    //删除场景
    onDeleteMold(mold, event) {
        event.stopPropagation()
        //设置当前要删除的场景
        this.removeMold = mold
        this.isShowDeleteConfirm = true
    }

    //关闭删除确认框
    onCancelDelete() {
        this.isShowDeleteConfirm = false
    }

    onConfirmDelete() {
        //从列表中移除要删除的图片
        this.moldService.deleteMold(this.photoInfoId, this.removeMold.id.toString()).then((response: any)=> {
            if (response.errCode) {
                alert(response.msg)
            } else {
                for (let i = 0; i < this.moldList.length; i++) {
                    if (this.moldList[i].id === this.removeMold.id) {
                        this.moldList.splice(i, 1)
                        break
                    }
                }
                this.onDeleteMoldCb.emit()
            }
            //关闭删除确认框
            this.isShowDeleteConfirm = false
        })
    }

    //显示表单
    onShowForm(isShowForm) {
        this.isShowForm = isShowForm
    }

    //切换设置状态
    onToggleSetting() {

        if (this.isSetting) {
            this.isShowForm = false
        }

        this.isSetting = !this.isSetting
    }

    /**
     * 设置输入框的值
     * @param value
     */
    setInputValue(value) {
        this.inputMold = new Mold(0, value, 0, 0)
    }

    /**
     * 关闭提示框
     */
    onCloseTip(){
        this.isShowTip = false
    }
}
