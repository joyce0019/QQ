'use client';

import { useEffect, useState } from 'react';

const links = [
  ['overview', '项目概览'],
  ['context', '背景'],
  ['research', '用户研究'],
  ['insights', '关键洞察'],
  ['define', '问题定义'],
  ['mvp', 'MVP'],
  ['design', '产品设计'],
  ['build', '开发实现'],
  ['test', '测试与迭代'],
  ['future', '未来规划'],
  ['reflection', '项目反思'],
] as const;

export default function PortfolioNav() {
  const [active, setActive] = useState('overview');

  useEffect(() => {
    const sections = links.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const update = () => {
      const marker = window.scrollY + window.innerHeight * .28;
      let current = sections[0]?.id ?? 'overview';
      for (const section of sections) {
        if (section.offsetTop <= marker) current = section.id;
        else break;
      }
      setActive(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <nav className="case-nav" aria-label="案例研究章节">
      <a className="case-nav-brand" href="#top" aria-label="返回顶部">DW</a>
      <div className="case-nav-links">
        {links.map(([id, label]) => (
          <a key={id} className={active === id ? 'active' : ''} href={`#${id}`}>{label}</a>
        ))}
      </div>
      <a className="case-nav-demo" href="/wardrobe.html" target="_blank">体验产品 ↗</a>
    </nav>
  );
}
