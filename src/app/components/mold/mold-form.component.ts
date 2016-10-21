/**
 * 图片类型表单
 * @description :: 图片类型表单
 */
import { Component, OnInit } from '@angular/core';
import { Mold } from './mold'
import { MoldService } from '../../services/mold.service'

@Component({
    selector: '<mold-form></mold-form>',
    templateUrl: 'mold-form.component.html',
    styleUrls: ['./mold-form.component.css'],
    providers: [MoldService]
})
export class MoldFormComponent implements OnInit {

    //项目列表
    moldList: Mold[]


    //当前选择项
    selectedMold = {
      ID: 6
    }

    //输入值
    inputMold = new Mold(0, '')

    //是否显示添加框
    isShowForm = false

    constructor(private moldService: MoldService) { }

    getMolds(): void {


      this.moldService.getMolds()
        .then((molds:any) => {
          this.moldList = molds.results
        })
    }

    ngOnInit(): void {
      this.getMolds()
    }

    //提交
    onSubmit(){
      this.moldService.addMold(this.inputMold.sceneName).then(
        result=>{



          this.inputMold = new Mold(0, '')
          this.isShowForm = false
        }
      )

    }

    //切换选择项
    onSelectMold(mold){
      this.selectedMold = mold
    }

    //显示表单
    onShowForm(isShowForm){
      this.isShowForm = isShowForm
    }
}
