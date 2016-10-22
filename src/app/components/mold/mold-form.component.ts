/**
 * 图片类型表单
 * @description :: 图片类型表单
 */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Mold } from './mold'
import { MoldService } from '../../services/mold.service'

@Component({
    selector: '<mold-form></mold-form>',
    templateUrl: 'mold-form.component.html',
    styleUrls: ['./mold-form.component.css'],
    providers: [MoldService]
})
export class MoldFormComponent implements OnInit {

    @Output() onTabMoldCb = new EventEmitter()

    //项目列表
    moldList: Mold[]


    //当前选择项
    selectedMold = {
      id: 0
    }

    //输入值
    inputMold = new Mold(0, '', 0, 0)

    //是否显示添加框
    isShowForm = false

    /**
     * 构造函数
     * @param moldService
     */
    constructor(private moldService: MoldService) { }


    /**
     * 初始化事件
     */
    ngOnInit(): void {
      this.getMolds()
    }

    /**
     * 获取场景
     */
    getMolds(): void {

      this.moldService.getMolds()
        .then((molds:any) => {

          let totalRaw = 0
          let totalChecked = 0

          molds.photoSceneCounts.map((item)=>{
            totalRaw += item.rawNum ? item.rawNum : 0
            totalChecked += item.checkedNum ? item.checkedNum : 0
          })

          let totalMold = new Mold(0, '全部', totalRaw, totalChecked)
          this.moldList = molds.photoSceneCounts

          this.moldList = [totalMold].concat(this.moldList)

        })
    }

    //提交
    onSubmit(){
      this.moldService.addMold(this.inputMold.sceneName).then(
        (response:any)=>{
          this.inputMold = new Mold(0, '', 0, 0)
          this.isShowForm = false
          this.moldList.push(new Mold(response.id, response.sceneName, 0, 0))
        }
      )

    }

    //切换选择项
    onSelectMold(mold){
      this.selectedMold = mold
      this.onTabMoldCb.emit(mold)
    }

    //显示表单
    onShowForm(isShowForm){
      this.isShowForm = isShowForm
    }
}
