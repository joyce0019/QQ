const {test}=require('node:test');
const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../deliverables/我的电子衣橱.html'),'utf8').match(/<script>([\s\S]*)<\/script>/)[1];
const core=source.slice(0,source.indexOf("document.addEventListener('click'"));
class FixedDate extends Date {constructor(...a){super(...(a.length?a:['2026-09-19T12:00:00+08:00']));}static now(){return new Date('2026-09-19T12:00:00+08:00').getTime();}}
function runtime(storage=new Map()){
 const nodes=new Map();const node=selector=>{if(!nodes.has(selector))nodes.set(selector,{value:'',hidden:false,disabled:false,innerHTML:'',textContent:'',focus(){}});return nodes.get(selector);};
 const context=vm.createContext({console,Date:FixedDate,Map,Set,URL,URLSearchParams,crypto:require('node:crypto').webcrypto,structuredClone,localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},document:{querySelector:node},location:{hash:'#/wardrobe'},setTimeout,clearTimeout});
 vm.runInContext(core,context);return {storage,nodes,context,run:code=>vm.runInContext(code,context)};
}
const clone=v=>JSON.parse(JSON.stringify(v));
const ids=page=>[...page.matchAll(/<article class="clothing-card"><div class="clothing-image"><a href="#\/wardrobe\/([^"]+)"/g)].map(m=>m[1]);
const form=values=>({get:k=>values[k]??'',getAll:k=>Array.isArray(values[k])?values[k]:[]});
test('all collections, combined filters and multilingual field search return the intended garments',()=>{
 const r=runtime();
 for(const [collection,expected] of [['最近添加',['item-0','item-1','item-2','item-3']],['闲置单品',['item-3','item-7','item-11']],['收藏',['item-0','item-2','item-4','item-8','item-10']],['通勤衣橱',['item-0','item-1','item-4','item-5','item-8','item-9']]]){
  r.run(`activeSmart=${JSON.stringify(collection)}`);assert.deepEqual(ids(r.run('wardrobe()')),expected);
 }
 r.run("activeSmart='常穿单品'");assert.deepEqual(ids(r.run('wardrobe()')),['item-2','item-0','item-4','item-8','item-10','item-1','item-5','item-9','item-6','item-3','item-7','item-11']);
 r.run("activeSmart='';filters={category:['上装','外套'],color:['白色','黑色'],season:['春季'],occasion:['工作'],status:['Laundry','Available'],usage:['经常穿']}");assert.deepEqual(ids(r.run('wardrobe()')),['item-1','item-4']);
 r.run("filters={category:[],color:[],season:[],occasion:[],status:[],usage:['从未穿过']}");assert.deepEqual(ids(r.run('wardrobe()')),['item-11']);
 r.run("filters={category:[],color:[],season:[],occasion:[],status:[],usage:[]};search='black work'");assert.deepEqual(ids(r.run('wardrobe()')),['item-1','item-5','item-9']);
 r.run("search='';data.items[0].brand='Atelier';");for(const q of ['atelier','上装','white','work','冬季']){
  assert.equal(r.run(`searchMatches(data.items[0],${JSON.stringify(q)})`),true);
 }
 r.run("search='nothing-matches'");assert.deepEqual(ids(r.run('wardrobe()')),[]);
});
test('migration preserves uploads, favorites, IDs and outfits, and reload preserves edited status and metadata',()=>{
 const r=runtime(),data=clone(r.run('data'));
 const photo='data:image/png;base64,my-own-photo';data.items[0]={...data.items[0],name:'我的衬衫',image:photo,favorite:false,status:'Borrowed',wearCount:27,brand:'私人品牌',material:'棉',size:'M',notes:'轻柔清洗'};
 delete data.items[0]._usageBaseCount;delete data.items[0]._usageBaseLastWornAt;
 r.storage.set('wardrobe_items',JSON.stringify(data.items));const next=runtime(r.storage),item=clone(next.run('data.items[0]'));
 for(const k of ['name','image','favorite','status','wearCount','brand','material','size','notes'])assert.equal(item[k],data.items[0][k]);
 next.run("save({items:data.items.map(i=>i.id==='item-0'?{...i,status:'Laundry',notes:'已更新'}:i)})");const reloaded=runtime(r.storage);assert.equal(reloaded.run('data.items[0].status'),'Laundry');assert.equal(reloaded.run('data.items[0].notes'),'已更新');assert.deepEqual(clone(reloaded.run('data.outfits')),data.outfits);
 const old={id:'user-item',name:'旧衣物',image:photo,category:'上装',color:'白色',season:[],occasion:[],favorite:true,createdAt:'2020-01-01'};r.storage.set('wardrobe_items',JSON.stringify([old]));const oldRuntime=runtime(r.storage);assert.equal(oldRuntime.run('data.items[0].wearCount'),0);assert.equal(oldRuntime.run('data.items[0].status'),'Available');assert.equal(oldRuntime.run('data.items[0].favorite'),true);
});
test('record additions, date edits, piece changes and deletions reconcile usage without counting a garment twice',()=>{
 const r=runtime();r.run("data.items=[{id:'a',wearCount:0,_usageBaseCount:0,_usageBaseLastWornAt:null},{id:'b',wearCount:4,_usageBaseCount:4,_usageBaseLastWornAt:'2026-01-01'}];data.logs=[]");
 r.run("save({logs:[{id:'one',date:'2026-09-18',pieces:[{id:'a'},{id:'a'},{id:'b'}]}]})");assert.equal(r.run('data.items[0].wearCount'),1);assert.equal(r.run('data.items[1].wearCount'),5);
 r.run("save({logs:[...data.logs,{id:'two',date:'2026-09-19',pieces:[{id:'a'}]}]})");assert.equal(r.run('data.items[0].wearCount'),2);assert.equal(r.run('data.items[0].lastWornAt'),'2026-09-19');
 r.run("save({logs:data.logs.map(l=>l.id==='two'?{...l,date:'2026-09-01'}:l)})");assert.equal(r.run('data.items[0].lastWornAt'),'2026-09-18');
 r.run("save({logs:data.logs.map(l=>l.id==='one'?{...l,pieces:[{id:'b'}]}:l)})");assert.equal(r.run('data.items[0].wearCount'),1);assert.equal(r.run('data.items[0].lastWornAt'),'2026-09-01');
 r.run('save({logs:[]})');assert.equal(r.run('data.items[0].wearCount'),0);assert.equal(r.run('data.items[0].lastWornAt'),undefined);assert.equal(r.run('data.items[1].wearCount'),4);assert.equal(r.run('data.items[1].lastWornAt'),'2026-01-01');
});
function mockForms(r){r.run("openModal=(title,body,submit)=>{modalCleanup();modalCleanup=()=>{};globalThis.submitted=submit;globalThis.formBody=body};closeModal=()=>{modalCleanup()};toast=()=>{};render=()=>{}");}
test('quick add generates a name from edited category/color and editing preserves wear history',()=>{
 const r=runtime();mockForms(r);r.run("bindUpload=initial=>()=>({value:initial||'data:image/webp;base64,new',busy:false});clothingModal()");
 assert.ok(!r.context.formBody.includes('required'));assert.ok(r.context.formBody.includes('<details class="more-details" >'));
 r.context.submitted(form({name:'',color:'蓝色',category:'下装',season:[],occasion:[],status:'Available'}));assert.equal(r.run('data.items[0].name'),'蓝色下装');assert.equal(r.run('data.items[0].wearCount'),0);
 r.run("clothingModal('item-0')");r.context.submitted(form({name:'新的名称',color:'白色',category:'上装',season:['春季'],occasion:['工作'],status:'Storage',material:'亚麻',size:'L',notes:'记录'}));
 const item=clone(r.run("data.items.find(i=>i.id==='item-0')"));assert.equal(item.wearCount,18);assert.equal(item._usageBaseCount,18);assert.equal(item.status,'Storage');assert.equal(item.material,'亚麻');
 r.run("editor=null;location.hash='#/outfits/new?item=item-0';editorPage()");assert.equal(r.run('editor.items[0].clothingId'),'item-0');assert.equal(r.run('editor.items.length'),1);
});
test('batch review applies per-photo edits, saves all items together, and ignores processing after close',async()=>{
 const r=runtime();mockForms(r);r.run("imageData=async file=>'data:image/webp;base64,'+file.name;batchModal()");
 await r.nodes.get('#batch-files').onchange({target:{files:[{name:'white-shirt.jpg'},{name:'blue-jeans.jpg'},{name:'black-shoes.jpg'}]}});
 assert.equal(r.nodes.get('#batch-submit').disabled,false);assert.equal(r.nodes.get('#batch-submit').textContent,'添加 3 件衣物');
 const before=r.run('data.items.length');r.context.submitted(form({'category-0':'外套','color-0':'米色','category-1':'下装','color-1':'蓝色','category-2':'鞋履','color-2':'黑色'}));assert.equal(r.run('data.items.length'),before+3);assert.deepEqual(clone(r.run('data.items.slice(0,3).map(i=>i.name)')),['米色外套','蓝色下装','黑色鞋履']);assert.equal(JSON.parse(r.storage.get('wardrobe_items')).length,before+3);
 r.run("batchModal();imageData=()=>new Promise(resolve=>globalThis.resolveImage=resolve)");const pending=r.nodes.get('#batch-files').onchange({target:{files:[{name:'late.jpg'}]}});r.run('modalCleanup()');r.context.resolveImage('data:image/webp;base64,late');await pending;assert.equal(r.nodes.get('#batch-review').innerHTML,'');assert.equal(r.nodes.get('#batch-submit').disabled,true);
});
