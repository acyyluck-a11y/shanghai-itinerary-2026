'use strict';
const pages = [
  {file:'1', label:'会议主海报', title:'会议主旨总览', speaker:'实践交流会 · 北京站', short:'会议主旨总览'},
  {file:'1-1', label:'专题 01', title:'重拾 AI+：概念定义与实践价值', speaker:'田刚｜华为', short:'AI+ 概念与实践价值'},
  {file:'1-2', label:'专题 02', title:'AI 赋能尿液检验', speaker:'王榕榕｜北京协和医院', short:'尿液检验的 AI 应用'},
  {file:'1-3', label:'专题 03', title:'AI+血液常规：血液分析与精准诊断', speaker:'沈军｜中日友好医院检验科', short:'血液分析与精准诊断'},
  {file:'1-4', label:'专题 04', title:'从血常规鉴别到复杂病例分流', speaker:'林杨泽｜优利特', short:'地中海贫血筛查研究'},
  {file:'1-5', label:'专题 05', title:'AI+科室运营', speaker:'马越云｜空军特色医学中心', short:'科室运营与管理升级'},
  {file:'1-6', label:'专题 06', title:'数智驱动智能到家检验实践', speaker:'王雅杰｜首都医科大学附属北京地坛医院检验科', short:'智能到家检验实践'},
  {file:'1-7', label:'专题 07', title:'AI 辅助心力衰竭早筛与风险预警', speaker:'袁慧｜首都医科大学附属北京安贞医院', short:'心力衰竭早筛与预警'},
  {file:'1-8', label:'专题 08 · 圆桌讨论', title:'从智慧检测到精益管理', speaker:'主持：姜婷', short:'圆桌：检验工作模式升级'}
];
const $ = (id) => document.getElementById(id);
const pad = (n) => String(n).padStart(2,'0');
const seriesFooter = 'URIT优利特【全球学术灯塔】系列第三站 北京';
let current = 0;
let lastFocus = null;
let zoom = 1;
let fitWidth = 1;
let toastTimer;
let scrollTick = false;

$('posters').innerHTML = pages.map((p,i) => `<section class="poster-section" id="poster-${i}" aria-labelledby="title-${i}"><div class="section-title"><span class="section-number">${i===0?'总览':pad(i)}</span><div><h2 id="title-${i}">${p.title}</h2><small>${p.speaker}</small></div></div><button type="button" class="poster-button" data-page="${i}" aria-label="放大查看：${p.title}"><span class="poster-art"><img src="${p.file}.webp" alt="${p.label}：${p.title}，${p.speaker}" width="870" height="1230" ${i===0?'fetchpriority="high"':'loading="lazy"'} decoding="async"></span></button><p class="poster-caption"><span>${pad(i+1)} / 09 · ${p.label}</span><span>点击海报放大阅读 ↗</span></p></section>`).join('');
const toc = pages.map((p,i)=>`<a class="toc-link" href="#poster-${i}" data-index="${i}"><span class="toc-num">${i===0?'总':pad(i)}</span><span>${p.short}<small>${i===0?'先览会议主旨':p.speaker}</small></span></a>`).join('');
$('desktop-links').innerHTML = toc;
$('mobile-links').innerHTML = toc;
const sections = [...document.querySelectorAll('.poster-section')];
const tocLinks = [...document.querySelectorAll('.toc-link')];

function setCurrent(i) {
  current = i;
  $('current-page').textContent = pad(i+1);
  $('previous').disabled = i===0;
  $('next').disabled = i===pages.length-1;
  $('next').innerHTML = i===pages.length-1?'已读至末页':'下一页 <span aria-hidden="true">→</span>';
  tocLinks.forEach(a=>a.setAttribute('aria-current',String(Number(a.dataset.index)===i)));
}
function updateProgress() {
  if(document.querySelector('dialog[open]')){scrollTick=false;return;}
  const probe = innerHeight*.34;
  let nearest = 0;
  sections.forEach((s,i)=>{if(s.getBoundingClientRect().top<=probe) nearest=i;});
  if(innerHeight+scrollY >= document.documentElement.scrollHeight-8) nearest=8;
  if(nearest!==current) setCurrent(nearest);
  const range = document.documentElement.scrollHeight-innerHeight;
  $('reading-progress').style.width = `${range>0?Math.min(100,scrollY/range*100):0}%`;
  scrollTick = false;
}
addEventListener('scroll',()=>{if(!scrollTick){requestAnimationFrame(updateProgress);scrollTick=true;}},{passive:true});
addEventListener('resize',updateProgress);
function go(i) {
  i = Math.max(0,Math.min(pages.length-1,i));
  setCurrent(i);
  sections[i].scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  history.replaceState(null,'',`#poster-${i}`);
}
$('previous').addEventListener('click',()=>go(current-1));
$('next').addEventListener('click',()=>go(current+1));
$('back-top').addEventListener('click',()=>go(0));
document.querySelector('.brand').addEventListener('click',e=>{e.preventDefault();go(0);});

function openDialog(dialog) {
  lastFocus=document.activeElement;
  document.body.style.paddingRight=`${innerWidth-document.documentElement.clientWidth}px`;
  dialog.showModal();
  document.body.classList.add('modal-open');
}
document.querySelectorAll('dialog').forEach(d=>{
  d.addEventListener('close',()=>{document.body.classList.remove('modal-open');document.body.style.paddingRight='';lastFocus?.focus({preventScroll:true});requestAnimationFrame(updateProgress);});
  d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});
});
$('open-toc').addEventListener('click',()=>openDialog($('toc-dialog')));
$('close-toc').addEventListener('click',()=>$('toc-dialog').close());
tocLinks.forEach(a=>a.addEventListener('click',e=>{e.preventDefault();if($('toc-dialog').open)$('toc-dialog').close();go(Number(a.dataset.index));}));

function renderZoom() {
  $('viewer-art').style.width=`${Math.round(fitWidth*zoom)}px`;
  $('zoom-label').textContent=`${Math.round(zoom*100)}%`;
  $('zoom-out').disabled=zoom<=1;
  $('zoom-in').disabled=zoom>=5;
}
function openViewer(index) {
  const p=pages[index];
  $('viewer-title').textContent=`${pad(index+1)} / 09 · ${p.title}`;
  $('viewer-image').src=`${p.file}.webp`;
  $('viewer-image').alt=`${p.label}：${p.title}`;
  $('viewer-footer').hidden=true;
  openDialog($('image-dialog'));
  fitWidth=Math.min(870,$('viewer-stage').clientWidth);
  zoom=1;
  renderZoom();
  $('viewer-stage').scrollTo(0,0);
}
document.querySelectorAll('.poster-button').forEach(b=>b.addEventListener('click',()=>openViewer(Number(b.dataset.page))));
$('close-viewer').addEventListener('click',()=>$('image-dialog').close());
$('zoom-in').addEventListener('click',()=>{zoom=Math.min(5,zoom*1.5);renderZoom();});
$('zoom-out').addEventListener('click',()=>{zoom=Math.max(1,zoom/1.5);renderZoom();});
$('zoom-fit').addEventListener('click',()=>{fitWidth=Math.min(870,$('viewer-stage').clientWidth);zoom=1;renderZoom();$('viewer-stage').scrollTo(0,0);});
$('zoom-original').addEventListener('click',()=>{zoom=870/fitWidth;renderZoom();});
$('viewer-image').addEventListener('dblclick',()=>{zoom=zoom>1?1:Math.max(2,870/fitWidth);renderZoom();});
addEventListener('resize',()=>{if($('image-dialog').open){fitWidth=Math.min(870,$('viewer-stage').clientWidth);renderZoom();}});

function toast(message) {
  clearTimeout(toastTimer);
  $('toast').textContent=message;
  $('toast').classList.add('visible');
  toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),2600);
}
const shareData={title:document.title,text:'AI赋能常规临检：从检验到科研创新。北京站会议主海报及八个专题完整回顾。',url:location.href.split('#')[0]};
$('share').addEventListener('click',()=>{
  $('share-url').value=shareData.url;
  openDialog($('share-dialog'));
});
$('close-share').addEventListener('click',()=>$('share-dialog').close());
$('copy-link').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(shareData.url);$('copy-link').textContent='已复制，可以发送给同事';toast('链接已复制');}
  catch{const input=$('share-url');input.focus();input.select();input.setSelectionRange(0,input.value.length);if(document.execCommand('copy')){$('copy-link').textContent='链接已复制';}else{$('copy-link').textContent='请长按上方链接复制';}}
});
document.querySelectorAll('.poster-button img').forEach(img=>img.addEventListener('error',()=>{
  const button=img.closest('.poster-button');
  button.insertAdjacentHTML('afterend','<p class="image-error" role="alert">海报加载未完成，请检查网络后刷新页面。</p>');
},{once:true}));
setCurrent(0);
requestAnimationFrame(()=>{
  const match=location.hash.match(/^#poster-([0-8])$/);
  if(match){setCurrent(Number(match[1]));sections[Number(match[1])].scrollIntoView({behavior:'instant',block:'start'});}
  updateProgress();
});
