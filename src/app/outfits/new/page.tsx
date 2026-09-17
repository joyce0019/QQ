import { OutfitEditor } from "@/features/wardrobe/App";
export default async function Page({searchParams}:{searchParams:Promise<{inspiration?:string}>}) { const {inspiration}=await searchParams;return <OutfitEditor inspirationId={inspiration}/>; }
