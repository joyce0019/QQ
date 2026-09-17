const {test}=require('node:test');
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../deliverables/我的电子衣橱.html'),'utf8');const js=html.match(/<script>([\s\S]*)<\/script>/)[1];
test('standalone wardrobe retains features, persists data and aggregates calendar periods',()=>{
const storage=new Map();const context=vm.createContext({console,Date,Map,Set,URL,crypto:require('crypto').webcrypto,structuredClone,localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},document:{querySelector:()=>null},setTimeout,clearTimeout});
vm.runInContext(js.slice(0,js.indexOf("document.addEventListener('click'")),context);
function run(code){return vm.runInContext(code,context);}
for(const [p,anchor,start,end] of [['week','2026-09-20','2026-09-14','2026-09-20'],['week','2026-01-01','2025-12-29','2026-01-04'],['month','2024-02-17','2024-02-01','2024-02-29'],['month','2026-02-17','2026-02-01','2026-02-28'],['year','2026-09-17','2026-01-01','2026-12-31']]){const r=run(`period='${p}';anchor='${anchor}';periodRange()`);assert.equal(r.start,start);assert.equal(r.end,end);}
assert.equal(run('data.items.length'),12);assert.equal(run('data.outfits.length'),4);assert.equal(run('data.inspirations.length'),8);
run(`save({profile:{height:170,waist:68}})`);assert.equal(JSON.parse(storage.get('wardrobe_body_profile')).height,170);
run(`save({logs:[{id:'test-log',date:'2026-09-17',name:'test',occasion:'日常',pieces:[structuredClone(data.items[0]),structuredClone(data.items[0]),structuredClone(data.items[1])],layout:compose(['item-0','item-1']),notes:'',createdAt:new Date().toISOString()}]});period='week';anchor='2026-09-17'`);
const page=run('me()');assert.ok(page.includes('周爱用单品'));assert.equal((page.match(/穿着 1 次/g)||[]).length,2);assert.ok(!page.includes('穿着 2 次'));
run(`save({items:data.items.filter(i=>i.id!=='item-0'),outfits:data.outfits.map(o=>({...o,items:o.items.filter(i=>i.clothingId!=='item-0')}))})`);assert.equal(run('data.logs[0].pieces[0].name'),'白色亚麻衬衫');assert.ok(run('me()').includes('历史单品'));assert.equal(JSON.parse(storage.get('wardrobe_wear_logs')).length,1);
assert.ok(!html.includes('<script src='));assert.ok(!html.includes('<link rel="stylesheet"'));assert.ok(!html.includes('src="/images/'));assert.ok(html.includes('data:image/svg+xml;base64,'));
});
