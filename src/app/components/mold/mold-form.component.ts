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

    @Output() onDeleteMoldCb = new EventEmitter()


    //删除框标题
    confirmTitle:string = '确认删除?';
    //删除框提示内容
    confirmContent:string = '确认删除这个场景吗？'

    isShowDeleteConfirm = false

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

    //是否正在编辑状态
    isSetting = false

    //当前要删除的场景
    removeMold: Mold

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

      //是否正在编辑状态
      if(this.isSetting){
        return
      }

      this.selectedMold = mold
      this.onTabMoldCb.emit(mold)
    }

    //删除场景
    onDeleteMold(mold, event){
      event.stopPropagation()
      //设置当前要删除的场景
      this.removeMold = mold
      this.isShowDeleteConfirm =  true
    }

    //关闭删除确认框
    onCancelDelete(){
      this.isShowDeleteConfirm = false
    }

    onConfirmDelete(){
      //从列表中移除要删除的图片
      this.moldService.delete(this.removeMold.id.toString()).then((response:any)=> {

        if(response.errCode){
          alert(response.msg)
        }else{
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
    onShowForm(isShowForm){
      this.isShowForm = isShowForm
    }

    //切换设置状态
    onToggleSetting(){

      if(this.isSetting){
        this.isShowForm = false
      }

      this.isSetting = !this.isSetting
    }
}
