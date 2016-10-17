/**
 * 图片信息
 * @description :: 定义图片信息数据原型
 */

export class Photo{
  constructor(
    public id: number,
    public name: string,
    public size: number,
    public time: string,
    public path: string,
    public opinion: string
  ){

  }
}
