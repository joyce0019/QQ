import type { Metadata } from 'next';
import Image from 'next/image';
import {
  ArrowDown, ArrowRight, Check, Circle, Code2, Database, Eye, Layers3,
  Lightbulb, Link2, Search, Shirt, Sparkles, Target, Upload, X,
} from 'lucide-react';
import PortfolioNav from '@/features/portfolio/PortfolioNav';

export const metadata: Metadata = {
  title: '电子衣橱｜产品与 UX 案例研究',
  description: '从问题观察、用户研究、MVP 取舍到 AI 辅助实现：电子衣橱完整产品案例研究。',
};

const findings = [
  ['6 / 8', '重新发现过自己已经忘记的衣物', '衣橱首先存在可见性问题。'],
  ['7 / 8', '经常或偶尔觉得“衣服很多，却没衣服穿”', '问题不只来自衣物数量。'],
  ['6 / 8', '提到记忆、寻找或组合已有衣物很困难', '拥有不等于形成可用选项。'],
  ['7 / 8', '会浏览或收藏穿搭灵感', '灵感很多，但缺少落地路径。'],
  ['5 / 7', '很少把收藏的大部分灵感真正穿出来', '收藏与使用是两种行为。'],
  ['6 / 8', '不确定衣橱里是否已有相似单品', '“我喜欢”与“我拥有”之间存在断层。'],
  ['6 / 8', '不愿在初次使用时手动录入超过 20–50 件', '启动成本可能比功能缺失更致命。'],
  ['7 / 8', '认为自动分类或图像处理能降低建档负担', 'AI 应先减少工作，而非制造噱头。'],
  ['3 / 8', '把完整 AI 穿搭推荐选为最重要的早期能力', '这直接改变了产品路线。'],
];

const insights = [
  ['01', '智能之前，先让衣物可见', '如果系统不了解用户拥有什么，再好的推荐也没有可靠基础。', '优先建设衣橱'],
  ['02', '录入成本就是产品体验', '每一个手动字段，都要求用户在得到价值之前先付出。', '快速添加 · 批量添加 · 渐进补全'],
  ['03', '灵感与现实衣橱彼此断开', '用户不缺灵感，缺的是把收藏内容映射回已有衣物的桥梁。', '灵感 → 衣橱匹配'],
  ['04', '衣橱应呈现使用，而不只记录拥有', '使用次数、最近穿着与闲置状态，能把静态清单变成行为反馈。', '衣橱活动 · 智能集合'],
];

const phases = [
  ['01', '电子衣橱', '看见我拥有的'],
  ['02', '搭配创造', '理解我能怎么穿'],
  ['03', '灵感匹配', '连接喜欢与拥有'],
  ['04', '身体可视化', '理解比例与轮廓'],
  ['05', '衣橱感知型消费', '理解我真正缺什么'],
  ['06', '个人 AI 造型师', '统一衣橱、风格与身体信息'],
];

function SectionTitle({ number, eyebrow, title, children }: { number: string; eyebrow: string; title: string; children?: React.ReactNode }) {
  return <header className="case-section-head"><span>{number}</span><div><p>{eyebrow}</p><h2>{title}</h2>{children}</div></header>;
}

function Prototype({ route = '/wardrobe', label }: { route?: string; label: string }) {
  return (
    <figure className="prototype-frame">
      <div className="browser-bar"><i/><i/><i/><span>digital-wardrobe.local{route}</span></div>
      <iframe src={`/wardrobe.html#${route}`} title={label} loading="lazy" tabIndex={-1}/>
      <figcaption>{label} · 可运行原型画面</figcaption>
    </figure>
  );
}

export default function Page() {
  return (
    <main className="case-study" id="top">
      <PortfolioNav />

      <section className="case-hero">
        <div className="hero-copy">
          <div className="hero-kicker"><span>产品 / UX 案例研究</span><span>2026</span></div>
          <h1>电子衣橱</h1>
          <p className="hero-en">Digital Wardrobe</p>
          <p className="hero-lead">让现实衣柜变得<br/>可见、可搭配、可连接。</p>
          <p className="hero-summary">一款帮助用户看见已有衣物、用现有单品创建搭配，并把外部灵感连接回真实衣橱的个人时尚产品。</p>
          <div className="hero-actions">
            <a className="case-button primary" href="/wardrobe.html" target="_blank">体验产品 <ArrowRight size={16}/></a>
            <a className="case-button text" href="#overview">查看过程 <ArrowDown size={16}/></a>
          </div>
        </div>
        <div className="hero-visual">
          <span className="visual-note note-one">01 — 真实可运行原型</span>
          <Prototype route="/wardrobe" label="电子衣橱 · 衣橱总览" />
          <span className="visual-note note-two">从静态界面到产品系统</span>
        </div>
      </section>

      <section className="case-overview" id="overview">
        <div className="overview-intro">
          <p>项目概览</p>
          <h2>从一个日常困惑，走到一套可以运行的产品假设。</h2>
        </div>
        <dl className="overview-grid">
          <div><dt>项目</dt><dd>电子衣橱</dd><small>独立产品项目</small></div>
          <div><dt>周期</dt><dd>2026</dd><small>原型 / MVP 探索</small></div>
          <div><dt>角色</dt><dd>产品经理 / 产品设计</dd><small>AI 辅助产品实现</small></div>
          <div><dt>产出</dt><dd>可运行 Web 原型</dd><small>研究、策略、UX/UI、PRD</small></div>
        </dl>
        <div className="scope-line"><span>负责范围</span><p>产品探索 · 研究规划 · 问卷框架 · 用户分层 · 问题定义 · MVP 取舍 · 信息架构 · 用户流程 · UX/UI · AI 辅助开发 · 验证计划</p></div>
      </section>

      <section className="case-section context-section" id="context">
        <SectionTitle number="01" eyebrow="背景" title="衣服已经够多，为什么还是觉得没衣服穿？">
          <p>项目始于一个简单观察：衣橱越满，衣物反而越不可见。它们被推到柜子深处、换季收纳箱或层叠的衣架后面，拥有与记忆逐渐分离。</p>
        </SectionTitle>
        <div className="problem-reframe">
          <div><span>问题可能不是</span><p>“我没有足够多的衣服。”</p></div>
          <ArrowRight aria-hidden="true" />
          <div className="highlight"><span>而是</span><p>“我看不见、想不起，也不会组合已经拥有的衣服。”</p></div>
        </div>
        <div className="loop-visual" aria-label="衣橱低可见度问题循环">
          {['购买衣物', '衣橱更满', '可见度下降', '遗忘已有衣物', '搭配决策更难', '寻找灵感', '再次购买'].map((item, index) => (
            <div key={item}><b>{String(index + 1).padStart(2, '0')}</b><span>{item}</span>{index < 6 && <ArrowRight/>}</div>
          ))}
          <strong>低可见度 → 低利用率</strong>
        </div>
        <div className="initial-idea">
          <div className="copy"><p className="mini-label">我的第一个假设</p><h3>先把“拥有、穿着、喜欢”放进同一个系统。</h3><p>此时我已经有了解法，却还不知道自己是否在解决正确的问题。</p></div>
          <div className="idea-modules">
            <article><Shirt/><span>衣橱</span><h4>我拥有什么</h4><p>数字化真实衣物</p></article>
            <article><Layers3/><span>搭配</span><h4>我如何穿着</h4><p>组合已有单品</p></article>
            <article><Lightbulb/><span>灵感</span><h4>我喜欢什么</h4><p>保存外部灵感</p></article>
          </div>
        </div>
      </section>

      <section className="case-section research-section" id="research">
        <SectionTitle number="02" eyebrow="用户研究（User Research）" title="在继续设计功能之前，先验证想法背后的假设。">
          <p>我需要理解“没衣服穿”究竟意味着什么、用户会为数字化衣橱付出多少成本，以及 AI 最应该出现在哪一步。</p>
        </SectionTitle>
        <div className="research-note"><Sparkles/><p><strong>研究说明</strong>当前定量数据为基于产品假设和原型方向重构的探索性研究结果，用于呈现完整的研究与决策过程；后续将通过真实用户调研验证并替换。</p></div>
        <div className="research-plan">
          <div><span>方法</span><strong>探索性问卷</strong><strong>半结构访谈框架</strong><strong>概念测试</strong></div>
          <div><span>样本</span><em>8</em><p>目标参与者<br/>最多 9 人</p></div>
          <div><span>行为分层</span><strong>衣橱负担型</strong><strong>灵感收藏型</strong><strong>理性消费型</strong></div>
        </div>
        <div className="questionnaire">
          <div className="questionnaire-intro"><p className="mini-label">我问了什么</p><h3>七组问题，从现有行为追到行动成本。</h3><p>问题设计不只验证用户是否“喜欢这个概念”，而是寻找需求强度、现有替代方案与最容易流失的环节。</p></div>
          <ol>
            {[
              ['衣橱', '数量、遗忘与当前整理方式'], ['搭配决策', '耗时、频率与“没衣服穿”的原因'],
              ['灵感', '从哪里发现、如何保存、是否回看'], ['灵感 → 行动', '是否复刻、怎样判断已有相似单品'],
              ['衣橱数字化', '是否愿意拍照、可接受多少手动录入'], ['AI', '去背景、识别与推荐，哪种更能减少工作'],
              ['购物', '内容种草、重复购买与决策前提醒'],
            ].map(([title, text], i) => <li key={title}><span>{String(i + 1).padStart(2, '0')}</span><div><b>{title}</b><p>{text}</p></div></li>)}
          </ol>
        </div>
        <div className="findings-head"><div><p className="mini-label">探索性研究重构数据 · N=8</p><h3>早期信号指向了什么</h3></div><p>这些数字不是经统计验证的市场结论，而是用于记录原型决策依据的研究模型。</p></div>
        <div className="finding-grid">
          {findings.map(([number, title, caption], i) => <article key={title} className={i === 8 ? 'turning' : ''}><span>{String(i + 1).padStart(2, '0')}</span><strong>{number}</strong><h4>{title}</h4><p>{caption}</p></article>)}
        </div>
        <div className="turning-point">
          <div><span>最初的判断</span><p>“AI 穿搭推荐应该是主打功能。”</p></div>
          <div className="turn-arrow"><ArrowRight/></div>
          <div><span>研究带来的修正</span><p>“先让衣橱容易建立，并值得反复回来使用。”</p></div>
          <small>这成为第一个关键产品决策。</small>
        </div>
      </section>

      <section className="case-section insight-section" id="insights">
        <SectionTitle number="03" eyebrow="关键洞察" title="把发现翻译成产品优先级。" />
        <div className="insight-list">
          {insights.map(([n, title, body, impact]) => <article key={n}><span>{n}</span><div><h3>{title}</h3><p>{body}</p></div><div className="impact"><small>对产品的影响</small><strong>{impact}</strong></div></article>)}
        </div>
        <div className="personas">
          <div className="personas-heading"><p className="mini-label">行为原型（Persona）</p><h3>不以年龄定义用户，而以未完成的任务区分。</h3></div>
          {[
            ['A', '被衣橱压住的人', '“我知道自己衣服很多，只是记不住有哪些。”', '需要：可见、检索、使用反馈', '衣橱'],
            ['B', '总在想搭配的人', '“衣服够穿，但总是重复那几套。”', '需要：组合、决策支持、复用', '搭配'],
            ['C', '灵感收藏者', '“我的收藏夹比衣柜更懂我的风格。”', '需要：把灵感连接回现实', '灵感'],
          ].map(([tag, name, quote, need, core]) => <article key={tag}><span>Persona {tag}</span><h4>{name}</h4><blockquote>{quote}</blockquote><p>{need}</p><small>核心入口 · {core}</small></article>)}
        </div>
      </section>

      <section className="define-section" id="define">
        <div className="define-inner">
          <p className="mini-label">04 — 问题定义</p>
          <h2>真正的问题不是<br/>“衣服太多”。</h2>
          <p className="define-statement">衣物拥有、搭配记忆与数字灵感，分别存在于三个互不相通的系统。</p>
          <div className="system-break"><span>现实衣橱</span><X/><span>搭配记忆</span><X/><span>社交灵感</span></div>
          <div className="define-goal"><span>产品目标</span><p>帮助用户更好地使用已经拥有的衣物。</p></div>
          <div className="pillars">
            <div><Eye/><b>看见</b><p>看见我拥有的一切</p></div>
            <div><Layers3/><b>创造</b><p>用已有衣物创建组合</p></div>
            <div><Link2/><b>连接</b><p>把灵感连接到真实衣橱</p></div>
          </div>
        </div>
      </section>

      <section className="case-section mvp-section" id="mvp">
        <SectionTitle number="05" eyebrow="最小可行产品（MVP）" title="第一版真正需要证明什么？">
          <p className="large-answer">用户是否能从“自己真实衣橱的数字映射”中获得足够价值，从而愿意完成建档并再次回来。</p>
        </SectionTitle>
        <div className="scope-compare">
          <div className="scope-build"><h3><Check/>第一版构建</h3><div>{['衣橱：添加、浏览、搜索、筛选', '收藏、衣物详情与状态', '智能集合与使用数据', '选择单品并创建搭配', '拖拽、缩放并保存搭配', '保存和查看灵感', '模拟相似单品匹配'].map(x => <span key={x}>{x}</span>)}</div></div>
          <div className="scope-later"><h3><Circle/>暂不构建</h3><div>{['3D 虚拟形象', '精确虚拟试穿', '完整 AI 造型师', '购物商城', '社交动态', '支付与转售', '天气智能'].map(x => <span key={x}>{x}</span>)}</div></div>
        </div>
        <p className="focus-quote">先聚焦，再扩张。</p>
        <div className="ia-map">
          <div className="ia-root">电子衣橱</div>
          {[['首页', ['概览', '最近添加']], ['衣橱', ['添加衣物', '详情', '搜索 / 筛选', '智能集合']], ['搭配', ['搭配库', '创建搭配']], ['灵感', ['灵感库', '详情', '复刻']], ['我的', ['穿搭日志', '身体档案']]].map(([name, children]) => <div className="ia-branch" key={name as string}><strong>{name as string}</strong>{(children as string[]).map(child => <span key={child}>{child}</span>)}</div>)}
        </div>
      </section>

      <section className="case-section design-section" id="design">
        <SectionTitle number="06" eyebrow="产品设计" title="设计原则来自研究，而不是审美偏好。" />
        <div className="principle">
          <div className="principle-copy"><span>原则 01</span><h3>让衣物成为界面。</h3><p>衣橱产品不该像库存表。图片负责识别与情绪，元数据只在需要时提供判断依据。</p><ul><li>图像优先，降低检索成本</li><li>状态与使用数据作为辅助</li><li>把列表变成个人风格空间</li></ul></div>
          <Prototype route="/wardrobe" label="衣橱 · 智能集合与单品浏览" />
        </div>
        <div className="principle reverse">
          <div className="principle-copy"><span>原则 02</span><h3>先减少成本，再增加智能。</h3><p>AI 在第一阶段的价值不是替用户“做造型”，而是让衣橱更容易被建立。</p><div className="flow-compare"><div><small>原设想</small><p>上传 → 名称 → 类别 → 颜色 → 品牌 → 材质 → 季节 → 场合 → 尺码 → 标签</p><b>高摩擦</b></div><div><small>新流程</small><p>上传 → 自动识别类别与颜色 → 保存 → 之后再补充</p><b>渐进披露</b></div></div></div>
          <div className="upload-visual"><div className="upload-box"><Upload/><b>拖入一张衣物照片</b><span>JPG、PNG 或 WEBP</span></div><div className="auto-fields"><span><Sparkles/>模拟识别完成</span><div><label>类别<strong>外套</strong></label><label>颜色<strong>黑色</strong></label></div><button>加入衣橱</button></div></div>
        </div>
        <div className="principle">
          <div className="principle-copy"><span>原则 03</span><h3>让衣橱随着使用变得更有价值。</h3><p>产品从“这里有我的衣服”，逐渐进化为“这是我的衣橱如何运转”。</p><div className="collection-tags">{['最近添加', '常穿单品', '闲置单品', '收藏', '通勤衣橱'].map(x => <span key={x}>{x}</span>)}</div></div>
          <div className="behavior-visual"><div><strong>24</strong><span>穿着次数</span></div><div><strong>3 天前</strong><span>最近穿着</span></div><div><strong>82 天</strong><span>闲置提醒</span></div></div>
        </div>
        <div className="final-design-head"><p className="mini-label">最终设计</p><h3>从“记录拥有什么”，走向“用已有衣物创造可能”。</h3></div>
        <div className="screen-story">
          <Prototype route="/outfits" label="搭配 · 把单品转化为可复用的组合" />
          <div><span>搭配</span><h3>拥有只是起点。</h3><p>自由画布让用户从真实衣橱选择单品，通过拖拽、缩放与层级调整创建搭配。它回答的不只是“我有什么”，更是“我能用它做什么”。</p><ul><li>直接使用已有单品，避免脱离现实</li><li>保存组合，降低下一次决策成本</li><li>让穿搭记忆可以被检索和复用</li></ul></div>
        </div>
        <div className="screen-story alternate">
          <div><span>灵感</span><h3>灵感应该有下一步。</h3><p>多数平台擅长帮助用户发现喜欢什么。电子衣橱更长期的机会，是回答：这套穿搭能否用我已经拥有的衣物完成？</p><ul><li>保存来源与视觉线索</li><li>识别造型中的关键单品</li><li>优先匹配衣橱中的相似衣物</li></ul></div>
          <Prototype route="/inspiration" label="灵感 · 从收藏走向行动" />
        </div>
        <div className="differentiator">
          <div className="diff-copy"><p className="mini-label">差异化流程</p><h3>灵感 → 我的衣橱</h3><p>让“看见喜欢的造型”不再自动通向购买，而是先检查已有衣物。</p></div>
          <div className="matching-flow">
            <div className="saved-look"><Image src="/images/inspiration-3.svg" alt="一套已保存的通勤穿搭灵感" width={520} height={400}/><span>已保存灵感</span></div>
            <ArrowRight/>
            <div className="detected-items"><span>识别到的单品</span>{['黑色西装外套', '白色 T 恤', '直筒牛仔裤', '乐福鞋'].map(x => <b key={x}>{x}</b>)}</div>
            <ArrowRight/>
            <div className="matched-items"><span>我的衣橱</span>{['黑色西装外套', '白色 T 恤', '蓝色牛仔裤', '相似乐福鞋'].map(x => <b key={x}><Check/>{x}</b>)}</div>
            <ArrowRight/>
            <button>用我的衣物复刻</button>
          </div>
        </div>
      </section>

      <section className="build-section" id="build">
        <div className="build-inner">
          <SectionTitle number="07" eyebrow="开发实现" title="从 PRD 到可运行产品。">
            <p>我把产品决策翻译成页面行为、数据结构与验收标准，并通过 AI 辅助开发完成 Web 原型。这里强调的是产品实现能力，而非声称独立手写了全部代码。</p>
          </SectionTitle>
          <div className="build-chain">{[[Target, 'PRD'], [Code2, '组件'], [Layers3, '状态'], [Database, '数据'], [Search, '边界情况'], [Sparkles, '可运行体验']].map(([Icon, name], i) => { const I = Icon as typeof Target; return <div key={name as string}><I/><span>{name as string}</span>{i < 5 && <ArrowRight/>}</div>; })}</div>
          <div className="build-learnings">
            <article><span>01</span><p>空状态不是补充文案，而是产品决策。</p></article>
            <article><span>02</span><p>删除一条数据，会产生系统级后果。</p></article>
            <article><span>03</span><p>数据模型决定了界面能够做什么。</p></article>
            <article><span>04</span><p>“应该能用”不是可执行的验收标准。</p></article>
          </div>
          <div className="tech-line"><span>前端 <b>React / TypeScript</b></span><span>界面 <b>CSS</b></span><span>原型数据 <b>localStorage</b></span><span>部署 <b>Netlify</b></span><span>工作方式 <b>AI 辅助开发</b></span></div>
        </div>
      </section>

      <section className="case-section test-section" id="test">
        <SectionTitle number="08" eyebrow="测试与迭代" title="下一轮，我会验证什么？">
          <p>目前尚未完成正式可用性测试，因此这里不虚构成功率或 SUS 分数，而是明确下一步的验证计划。</p>
        </SectionTitle>
        <div className="test-plan">
          <div className="participant"><strong>5</strong><span>名目标用户</span><p>以任务完成、用时、卡点与价值理解为主要观察指标。</p></div>
          <ol>
            <li><span>任务 01</span><b>添加三件衣物</b><p>观察完成率、用时与建档摩擦。</p></li>
            <li><span>任务 02</span><b>找到一件指定单品</b><p>验证搜索、筛选与分类是否符合预期。</p></li>
            <li><span>任务 03</span><b>创建一套搭配</b><p>验证画布编辑器的可发现性与可控性。</p></li>
            <li><span>任务 04</span><b>保存并复刻一份灵感</b><p>判断用户是否真正理解差异化价值。</p></li>
          </ol>
        </div>
        <div className="metrics"><p className="mini-label">拟用于后续验证的指标</p><div>{[['衣橱激活', '新用户添加 ≥5 件衣物的比例'], ['上传完成', '开始添加 → 成功保存'], ['搭配创建', '激活用户创建搭配的比例'], ['灵感转搭配', '收藏灵感被转为搭配的比例'], ['D7 留存', '建好衣橱后是否再次回来']].map(([x, y]) => <article key={x}><strong>{x}</strong><p>{y}</p><small>尚无真实数值</small></article>)}</div></div>
      </section>

      <section className="case-section future-section" id="future">
        <SectionTitle number="09" eyebrow="未来规划" title="不是堆功能，而是逐步补全个人时尚系统。" />
        <div className="future-grid">
          <article><span>未来 01</span><h3>把录入成本降到更低</h3><p>AI 去背景、类别与颜色识别、批量上传、购物截图导入、订单历史导入。</p><small>核心问题：怎样让建档几乎不需要手动工作？</small></article>
          <article><span>未来 02</span><h3>理解衣橱如何被使用</h3><p>穿着频率、闲置检测、品类与色彩分布、重复单品、单次穿着成本。</p><small>核心问题：我真正使用的是什么？</small></article>
          <article className="body-model"><span>未来 03</span><h3>身体感知型穿搭可视化</h3><p>从身高与可选身体档案开始，辅助用户理解轮廓、比例、叠穿与相对衣长，而非承诺精确虚拟试穿。</p><small>身体数据应渐进、可选、透明。</small></article>
        </div>
        <div className="progressive-profile">
          <div><span>基础衣橱</span><ArrowRight/><span>用户主动选择 3D 可视化</span><ArrowRight/><span>身高 + 可选身体信息</span><ArrowRight/><span>需要更高准确度时再补充</span></div>
          <p><b>渐进式建档（Progressive Profiling）</b>产品不能在试图降低一种摩擦时，又制造新的入门负担。</p>
        </div>
        <div className="commerce">
          <div className="commerce-copy"><p className="mini-label">未来 04 · 衣橱感知型消费</p><h3>如果购物推荐知道我已经拥有什么？</h3><p>商业化不必建立在更多消费上。产品可以先识别灵感中的单品、检查衣橱，再只推荐真正缺少的部分。</p><blockquote>少推荐一点，只推荐用户真正需要的。</blockquote></div>
          <div className="commerce-flow">
            {['灵感链接', 'AI 识别单品', '衣橱比对', '已有相似单品？', '只推荐缺少的单品', '购买后自动加入衣橱', '创建搭配'].map((x, i) => <div key={x}><span>{String(i + 1).padStart(2, '0')}</span><b>{x}</b>{i < 6 && <ArrowDown/>}</div>)}
          </div>
        </div>
        <div className="commerce-signals"><p>探索性研究重构数据</p>{[['5 / 8', '曾因看到穿搭或创作者内容而购买衣物'], ['4 / 8', '购买后发现自己已有相似单品'], ['6 / 8', '希望购买前知道衣橱中已有相似款']].map(([n, x]) => <div key={x}><strong>{n}</strong><span>{x}</span></div>)}</div>
        <div className="fashion-intelligence">
          <p className="mini-label">未来 05 · 个人时尚智能</p>
          <h3>五类个人数据，形成一套可持续学习的系统。</h3>
          <div>{[['我拥有什么', '衣橱'], ['我如何穿', '搭配历史'], ['我喜欢什么', '灵感'], ['我的身体', '身体档案'], ['我真正缺什么', '衣橱缺口']].map(([a, b]) => <span key={a}><small>{a}</small><b>{b}</b></span>)}<ArrowRight/><strong>个人时尚智能</strong></div>
        </div>
        <div className="roadmap"><p className="mini-label">产品演进路线</p><div>{phases.map(([n, title, body]) => <article key={n}><span>{n}</span><h4>{title}</h4><p>{body}</p></article>)}</div></div>
      </section>

      <section className="reflection-section" id="reflection">
        <div className="reflection-inner">
          <p className="mini-label">10 — 项目反思</p>
          <h2>这个项目改变了我理解产品工作的方式。</h2>
          <div className="reflection-list">
            <article><span>01</span><h3>从问题出发，而不是从令人兴奋的技术出发。</h3><p>AI 推荐最初看起来最像“主打功能”，研究框架迫使我判断：它是否真的是第一个需要解决的问题。</p></article>
            <article><span>02</span><h3>用户可能在获得价值之前，就被输入成本劝退。</h3><p>数字衣橱要求用户先创造数据。降低这项前置成本，本身就是核心产品问题。</p></article>
            <article><span>03</span><h3>灵感与衣橱的关系，比任何一边单独存在都更有价值。</h3><p>市场不缺灵感工具，也不缺记录工具。更有差异的机会，是建立两者之间的连接。</p></article>
            <article><span>04</span><h3>实现让我从“屏幕设计”转向“系统设计”。</h3><p>静态界面问“画面应该怎样”；实现会追问数据缺失、删除后果、状态存储与完成标准。</p></article>
          </div>
        </div>
      </section>

      <footer className="case-footer">
        <p>产品的目标不是帮助人们<br/>拥有更多衣服。</p>
        <h2>而是帮助他们更好地看见、<br/>使用和理解已经拥有的衣物。</h2>
        <span>当确实需要新东西时，也能理解为什么需要。</span>
        <div><a className="case-button primary" href="/wardrobe.html" target="_blank">体验产品 <ArrowRight/></a><a className="case-button text" href="#top">返回顶部 <ArrowDown className="rotate"/></a></div>
        <small>电子衣橱 · Digital Wardrobe · 产品 / UX 案例研究 · 2026</small>
      </footer>
    </main>
  );
}
