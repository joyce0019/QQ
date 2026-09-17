import type { Metadata } from "next";
import "./globals.css";
import { WardrobeShell } from "@/features/wardrobe/App";
export const metadata:Metadata={title:"我的电子衣橱",description:"你的衣橱，在这里一目了然。"};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="zh-CN"><body><WardrobeShell>{children}</WardrobeShell></body></html>;}
