/**
 * 图片信息
 * @description :: 定义图片信息数据原型
 */

export class Truing{
  constructor(
    public id: number,
    public imgIndex: number,
    public imgKey: string,
    public imgName: string,
    public imgSize: number,
    public imgVersion: string,
    public saveTime: string,
    public isSuccess: boolean
  ){

  }
}
