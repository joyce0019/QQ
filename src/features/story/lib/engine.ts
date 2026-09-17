import { scenes } from "../data/story";
import type { Game, Stat } from "../types";
export const STORAGE_KEY = "fudimo-game-v1";
export function newGame(endings: string[] = []): Game { return {version:1,scene:0,phase:"intro",choices:{},stats:{autonomy:20,darkening:10,jiahao:25,friend:0,research:0,resource:0,career:0},flags:[],endings,updatedAt:new Date().toISOString()}; }
export function selectChoice(game: Game, id: string): Game {
 const scene = scenes[game.scene]; const choice = scene.choices?.find(c=>c.id===id);
 if (!choice || game.phase!=="intro" || game.choices[scene.id]) return game;
 const stats={...game.stats};
 for(const [stat,delta] of Object.entries(choice.effects)) {const s=stat as Stat;stats[s]=Math.max(0,Math.min(100,stats[s]+delta!));}
 return {...game,phase:"reply",choices:{...game.choices,[scene.id]:id},stats,flags:[...game.flags,choice.flag],updatedAt:new Date().toISOString()};
}
export function advance(game: Game): Game {
 const scene=scenes[game.scene]; if(scene.finale || (game.phase==="intro" && scene.choices)) return game;
 const choice=scene.choices?.find(c=>c.id===game.choices[scene.id]);
 if(game.phase==="reply" && choice?.response) return {...game,phase:"response",updatedAt:new Date().toISOString()};
 const next={...game,scene:Math.min(game.scene+1,scenes.length-1),phase:"intro" as const,updatedAt:new Date().toISOString()};
 if(scenes[next.scene].finale) next.endings=Array.from(new Set([...next.endings,resolveEnding(next).id]));
 return next;
}
export function resolveEnding(g: Game) {
 if(g.stats.autonomy>=70 && g.stats.jiahao>=60 && g.stats.friend>=35 && g.stats.career>=70 && g.stats.darkening<45) return {id:"self",name:"自我剧本",tag:"真结局 · 人生由我命名",text:"澄新生物成功上市。敲钟时，夏知晴、沈砚舟和嘉豪都在身边。父母没有到场，我也不再等待他们的许可。我不再是被安排的女配，而是自己人生的书写者。",after:"演讲结束，新项目的资料送到手里。我笑着打开：这一次，依然由我来选。"};
 if(g.stats.autonomy<40 || g.stats.darkening>=45) return {id:"return",name:"剧本回潮",tag:"普通结局 · 你还可以改写",text:"一次次退让，让家庭和系统的声音重新占据了生活。公司与关系都留下了遗憾。但我终于看见，这些路并不是唯一的答案。嘉豪还在身边，下一次开口，我仍然可以说“不”。",after:"命运没有封死最后一扇门。你可以重新开始，试着把选择留给自己。"};
 return {id:"road",name:"仍在路上",tag:"成长结局 · 成功不止一种时间表",text:"公司还没有上市，研究与创业也比预想中慢。但我离开了旧家的束缚，拥有自己的方向。嘉豪经营着修车店，朋友各自忙碌，也依然同行。人生没有一步登顶，却已经握在自己手里。",after:"今天还有实验要做、方案要改。我推开工作室的门，走进属于自己的日常。"};
}
export function isGame(value: unknown): value is Game {
 if(!value || typeof value!=="object") return false;const g=value as Game;
 if(g.version!==1 || !Number.isInteger(g.scene) || g.scene<0 || g.scene>=scenes.length || !["intro","reply","response"].includes(g.phase) || !g.choices || typeof g.choices!=="object" || Array.isArray(g.choices) || !g.stats || !Array.isArray(g.flags) || !g.flags.every(f=>typeof f==="string") || !Array.isArray(g.endings) || !g.endings.every(e=>["self","road","return"].includes(e)) || typeof g.updatedAt!=="string") return false;
 if(!Object.keys(newGame().stats).every(s=>Number.isFinite(g.stats[s as Stat]) && g.stats[s as Stat]>=0 && g.stats[s as Stat]<=100)) return false;
 if(!Object.entries(g.choices).every(([sceneId,choiceId])=>scenes.some(s=>s.id===sceneId && s.choices?.some(c=>c.id===choiceId)))) return false;
 for(let i=0;i<g.scene;i++) if(scenes[i].choices && !g.choices[scenes[i].id]) return false;
 return g.phase==="intro" ? !g.choices[scenes[g.scene].id] : !!scenes[g.scene].choices?.some(c=>c.id===g.choices[scenes[g.scene].id]);
}
