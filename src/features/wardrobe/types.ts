export const categories = ['上装','下装','连衣裙','外套','鞋履','包袋','配饰'] as const;
export const colors = ['黑色','白色','灰色','米色','棕色','蓝色','绿色','红色','粉色','黄色','紫色','多色'];
export const seasons = ['春季','夏季','秋季','冬季'];
export const occasions = ['日常','工作','约会','旅行','正式','运动'];
export interface ClothingItem { id:string; name:string; image:string; category:typeof categories[number]; color:string; season:string[]; occasion:string[]; brand?:string; wearCount:number; lastWornAt?:string; status:"Available"|"Laundry"|"Storage"|"Borrowed"; material?:string; size?:string; notes?:string; favorite:boolean; createdAt:string }
export interface OutfitItem { clothingId:string; x:number; y:number; width:number; height:number; rotation:number; zIndex:number }
export interface Outfit { id:string; name:string; items:OutfitItem[]; occasion?:string; season?:string; createdAt:string }
export interface Inspiration { id:string; title?:string; image:string; sourceUrl?:string; notes?:string; createdAt:string }
export interface Data { items:ClothingItem[]; outfits:Outfit[]; inspirations:Inspiration[] }
export function compose(ids:string[]):OutfitItem[] { return ids.map((clothingId,i)=>({clothingId,x:60+(i%2)*260,y:40+Math.floor(i/2)*320,width:220,height:280,rotation:0,zIndex:i+1})); }
