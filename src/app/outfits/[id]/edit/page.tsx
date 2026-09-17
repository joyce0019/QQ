import { OutfitEditor } from "@/features/wardrobe/App";
export default async function Page({params}:{params:Promise<{id:string}>}) { const {id}=await params;return <OutfitEditor id={id}/>; }
