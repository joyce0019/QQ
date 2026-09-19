const {test}=require('node:test');
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../deliverables/我的电子衣橱.html'),'utf8');const js=html.match(/<script>([\s\S]*)<\/script>/)[1];
test('standalone wardrobe retains features, persists data and aggregates calendar periods',()=>{
const storage=new Map();const context=vm.createContext({console,Date,Map,Set,URL,crypto:require('crypto').webcrypto,structuredClone,localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},document:{querySelector:()=>null},setTimeout,clearTimeout});
vm.runInContext(js.slice(0,js.indexOf("document.addEventListener('click'")),context);
function run(code){return vm.runInContext(code,context);}
for(const [p,anchor,start,end] of [['week','2026-09-20','2026-09-14','2026-09-20'],['week','2026-01-01','2025-12-29','2026-01-04'],['month','2024-02-17','2024-02-01','2024-02-29'],['month','2026-02-17','2026-02-01','2026-02-28'],['year','2026-09-17','2026-01-01','2026-12-31']]){const r=run(`period='${p}';anchor='${anchor}';periodRange()`);assert.equal(r.start,start);assert.equal(r.end,end);}
assert.equal(run("sampleImage(LEGACY_ASSETS['clothing-0'])"),run("ASSETS['clothing-0']"));assert.equal(run("sampleImage('data:image/png;base64,user-photo')"),'data:image/png;base64,user-photo');
assert.equal(run("data.items.filter(i=>i.image.startsWith('data:image/webp;base64,')).length"),12);
assert.equal(run('data.items.length'),12);assert.equal(run('data.outfits.length'),4);assert.equal(run('data.inspirations.length'),8);
assert.ok(run("data.items.every(i=>Number.isFinite(i.wearCount)&&['Available','Laundry','Storage','Borrowed'].includes(i.status))"));
assert.ok(run("data.items.some(i=>i.favorite)&&data.items.some(i=>i.status!=='Available')&&data.items.some(i=>i.lastWornAt)"));
assert.ok(run("data.items.filter(i=>searchMatches(i,'work')).every(i=>i.occasion.includes('工作'))"));
assert.ok(run("data.items.filter(i=>searchMatches(i,'black')).every(i=>i.color==='黑色')"));
run("filters={category:['上装','外套'],color:['白色','黑色'],season:[],occasion:[],status:[],usage:[]};category='全部';activeSmart=''");
const filtered=run('wardrobe()');assert.ok(filtered.includes('4 项筛选条件'));assert.ok(filtered.includes('白色亚麻衬衫'));assert.ok(filtered.includes('黑色西装外套'));assert.ok(!filtered.includes('蓝色直筒牛仔裤'));
run("filters={category:[],color:[],season:[],occasion:[],status:[],usage:[]};activeSmart='通勤衣橱'");assert.ok(run('wardrobe()').includes('通勤衣橱 ·'));
const detail=run("clothingDetail('item-0')");assert.ok(detail.includes('衣橱活动'));assert.ok(detail.includes('用于搭配'));assert.ok(detail.includes('用这件单品创建搭配'));assert.ok(detail.includes('衣物状态'));
assert.match(js,/添加多件衣物/);assert.match(js,/multiple/);assert.match(js,/添加更多信息/);assert.match(js,/模拟识别完成/);
run(`save({profile:{height:170,waist:68}})`);assert.equal(JSON.parse(storage.get('wardrobe_body_profile')).height,170);
run(`save({logs:[{id:'test-log',date:'2026-09-17',name:'test',occasion:'日常',pieces:[structuredClone(data.items[0]),structuredClone(data.items[0]),structuredClone(data.items[1])],layout:compose(['item-0','item-1']),notes:'',createdAt:new Date().toISOString()}]});period='week';anchor='2026-09-17'`);
const page=run('me()');assert.ok(page.includes('周爱用单品'));assert.equal((page.match(/穿着 1 次/g)||[]).length,2);assert.ok(!page.includes('穿着 2 次'));
run(`save({items:data.items.filter(i=>i.id!=='item-0'),outfits:data.outfits.map(o=>({...o,items:o.items.filter(i=>i.clothingId!=='item-0')}))})`);assert.equal(run('data.logs[0].pieces[0].name'),'白色亚麻衬衫');assert.ok(run('me()').includes('历史单品'));assert.equal(JSON.parse(storage.get('wardrobe_wear_logs')).length,1);
assert.ok(!html.includes('<script src='));assert.ok(!html.includes('<link rel="stylesheet"'));assert.ok(!html.includes('src="/images/'));assert.ok(html.includes('data:image/svg+xml;base64,'));
});
test('camera routes the same photo to either form and stops late streams on close',async()=>{
 const nodes=new Map();const node=()=>({onclick:null,onchange:null,disabled:true,hidden:false,textContent:'',srcObject:null,play:async()=>{}});
 const context=vm.createContext({console,Date,Map,Set,URL,crypto:require('crypto').webcrypto,structuredClone,localStorage:{getItem:()=>null,setItem:()=>{}},document:{querySelector:selector=>{if(!nodes.has(selector))nodes.set(selector,node());return nodes.get(selector)}},setTimeout,clearTimeout});
 vm.runInContext(js.slice(0,js.indexOf("document.addEventListener('click'")),context);
 context.nodes=nodes;context.makeNode=node;
 vm.runInContext(`openModal=()=>{modalCleanup();modalCleanup=()=>{}};clothingModal=(id,photo)=>{globalResult=['wardrobe',photo]};logModal=(id,outfit,photo)=>{globalResult=['log',photo]};photoChoice('data:image/webp;base64,test');$('#photo-wardrobe').onclick();`,context);
 assert.deepEqual(Array.from(context.globalResult),['wardrobe','data:image/webp;base64,test']);
 vm.runInContext(`$('#photo-log').onclick()`,context);assert.deepEqual(Array.from(context.globalResult),['log','data:image/webp;base64,test']);
 let resolve,stopped=0;context.navigator={mediaDevices:{getUserMedia:()=>new Promise(r=>resolve=r)}};
 vm.runInContext('cameraModal();modalCleanup()',context);resolve({getTracks:()=>[{stop:()=>stopped++}]});await new Promise(r=>setImmediate(r));assert.equal(stopped,1);
 context.navigator={};vm.runInContext('cameraModal()',context);assert.match(nodes.get('#camera-status').textContent,/无法打开相机/);
});
