/**
 * 图片信息
 * @description :: 定义图片信息数据原型
 */

export class Truing{
  constructor(
    public id: number,
    public imgIndex: number,
    public imgName: string,
    public imgKey: string,
    public imgSize: number,
    public scrawlImgKey: string,
    public isSuccess: boolean
  ){

  }
}
