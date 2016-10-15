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
      id: 2,
      name: '海边',
      count: 11
    }

    //输入值
    inputMold = new Mold(0, '', 0)

    //是否显示添加框
    isShowForm = false

    constructor(private moldService: MoldService) { }

    getMolds(): void {
      this.moldService.getMolds().then(molds => this.moldList = molds);
    }

    ngOnInit(): void {
      this.getMolds()
    }

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
