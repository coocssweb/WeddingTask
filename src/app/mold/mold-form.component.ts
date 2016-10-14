import { Component } from '@angular/core';
import { Mold } from './mold'
@Component({
    selector: 'app-root',
    templateUrl: 'mold-form.component.html',
    styleUrls: ['./mold-form.component.css']
})
export class MoldFormComponent {

    //项目列表
    moldList = [
        {
            id: 1,
            name: '教堂',
            count: 10
        },
        {
            id: 2,
            name: '海边',
            count: 11
        },
        {
            id: 3,
            name: '山上',
            count: 13
        }
    ]

    //当前选择项
    selectedMold = {
      id: 2,
      name: '海边',
      count: 11
    }

    //输入值
    inputMold = new Mold(0, '', 0)

    //是否显示添加框
    isShowForm = false

    //提交
    onSubmit(){

    }

    //切换选择项
    onSelectMold(mold){
      this.selectedMold = mold
    }

    onShowForm(isShowForm){
      this.isShowForm = isShowForm
    }

}
