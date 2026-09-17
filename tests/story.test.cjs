/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test harness loads TypeScript through the bundled compiler. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => {
 const source=fs.readFileSync(filename,'utf8');
 module._compile(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,filename);
};
const { scenes }=require('../src/features/story/data/story.ts');
const { newGame, selectChoice, advance, resolveEnding, isGame }=require('../src/features/story/lib/engine.ts');
function play(select) {
 let g=newGame(); let steps=0;
 while(!scenes[g.scene].finale) {
  assert.ok(isGame(g),`valid save at ${g.scene}/${g.phase}`);
  const s=scenes[g.scene];
  g=g.phase==='intro'&&s.choices ? selectChoice(g,select(s).id) : advance(g);
  assert.ok(++steps<100,'story terminates');
 }
 assert.ok(isGame(g)); assert.equal(g.flags.length,scenes.filter(s=>s.choices).length);
 assert.ok(g.endings.includes(resolveEnding(g).id));
 return g;
}
test('all scenes and choices have unique ids and meaningful responses',()=>{
 assert.equal(new Set(scenes.map(s=>s.id)).size,scenes.length);
 for(const s of scenes.filter(s=>s.choices)){
  assert.ok(s.choices.length>=2&&s.choices.length<=4);
  assert.equal(new Set(s.choices.map(c=>c.id)).size,s.choices.length);
  for(const c of s.choices){assert.ok(c.reply&&c.response&&c.flag);}
 }
 assert.ok(scenes.at(-1).finale);
});
test('a choice is required; effects apply once and both response screens precede progression',()=>{
 const g=newGame(); assert.deepEqual(advance(g),g);
 const chosen=selectChoice(g,'fight');assert.equal(chosen.stats.autonomy,30);
 assert.equal(chosen.scene,0);assert.equal(chosen.phase,'reply');
 assert.deepEqual(selectChoice(chosen,'wait'),chosen);
 const response=advance(chosen);assert.equal(response.phase,'response');assert.equal(response.scene,0);
 const next=advance(response);assert.equal(next.scene,1);assert.equal(next.phase,'intro');
 assert.deepEqual(selectChoice(g,'missing'),g);
});
test('a continuous confident route reaches the true ending',()=>{
 const g=play(s=>s.choices[0]);assert.equal(resolveEnding(g).id,'self');
 assert.deepEqual(advance(g),g);
 assert.ok(isGame(JSON.parse(JSON.stringify(g))));
 assert.ok(newGame(g.endings).endings.includes('self'));
});
test('a slower independent route reaches still-on-the-road ending',()=>{
 const plan={school:'wait',fire:'freeze',research:'foundation',partners:'solo',investment:'refuse'};
 const g=play(s=>s.choices.find(c=>c.id===plan[s.id])||s.choices[0]);
 assert.equal(resolveEnding(g).id,'road');
});
test('repeated compliance has a recoverable ordinary ending',()=>{
 const g=play(s=>s.choices.at(-1));assert.equal(resolveEnding(g).id,'return');
 assert.ok(Object.values(g.stats).every(v=>v>=0&&v<=100));
});
test('corrupt and inconsistent saves are rejected',()=>{
 assert.equal(isGame(null),false); assert.equal(isGame({}),false);
 assert.equal(isGame({...newGame(),scene:999}),false);
 assert.equal(isGame({...newGame(),phase:'response'}),false);
 assert.equal(isGame({...newGame(),scene:2}),false);
 assert.equal(isGame({...newGame(),stats:{...newGame().stats,autonomy:-1}}),false);
 assert.equal(isGame({...newGame(),choices:{school:'missing'}}),false);
});
test('original character names and prototype copy are absent from shipped content',()=>{
 const text=JSON.stringify(scenes)+fs.readFileSync('src/features/story/components/StoryGame.tsx','utf8')+fs.readFileSync('src/app/layout.tsx','utf8');
 for(const name of ['傅胜楠','胜楠','傅嘉豪','舒媛','顾修霖','裴霁','林昊','改编自','风格体验版','本次风格体验']) assert.ok(!text.includes(name),name);
});
