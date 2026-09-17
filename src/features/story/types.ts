export type Stat = "autonomy" | "darkening" | "jiahao" | "friend" | "research" | "resource" | "career";
export type Stats = Record<Stat, number>;
export type Choice = { id: string; text: string; reply: string; response?: string; effects: Partial<Stats>; flag: string };
export type Scene = { id: string; location: string; heading: string; aside: string; intro: string[]; speaker: string; text: string; bullet?: string; choices?: Choice[]; finale?: boolean };
export type Game = { version: 1; scene: number; phase: "intro" | "reply" | "response"; choices: Record<string, string>; stats: Stats; flags: string[]; endings: string[]; updatedAt: string };
