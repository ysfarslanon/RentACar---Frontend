import { CarImage } from "./carImage";

export interface Car{
    carId:number
    brandId:number
    colorId:number
    carName:string
    brandName:string
    colorName:string
    dailyPrice:number
    modelYear:number
    imagePath:CarImage[]
   // status:boolean
}