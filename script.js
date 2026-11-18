/* ===== DATA (copied exactly) ===== */
const BRIDE="Anuradha(Durga)",GROOM="Mohit",VENUE="Weeding celebration";
const FN=[["Ghritpan","28 November, 2026","Saturday","12:15 PM","20261128T121500"],["Vinayak","28 November, 2026","Saturday","8:00 PM","20261128T200000"],["Sangeet night","30 November, 2026","Monday","8:00 PM","20261130T200000"],["Badi Bandoli","1 December, 2026","Tuesday","8:00 PM","20261201T200000"],["Barat Prasthan","2 December, 2026","Wednesday","7:00 AM","20261202T070000"],["Hast Milap","2 December, 2026","Wednesday","7:30 PM","20261202T193000"]];
const RSVP=[["+91 9251423467","Om Prakash panwar","919251423467"],["+91 7737201022","Manish panwar","917737201022"],["+91 9251523467","Mohit panwar","919251523467"],["+91 9461020109","Pankaj panwar","919461020109"]];
const $=id=>document.getElementById(id),RM=matchMedia("(prefers-reduced-motion:reduce)").matches;
const mob=innerWidth<700,dpr=Math.min(devicePixelRatio||1,2);

/* ===== EVENTS ===== */
$("tl").innerHTML=FN.map((f,i)=>`<div class="ev rv"><em>${i+1}</em><h3>${f[0]}</h3><p>${f[1]} &middot; ${f[2]}</p><p>${f[3]} &middot; ${VENUE}</p></div>`).join("");
/* ===== RSVP ===== */
$("rsvp").innerHTML=RSVP.map(r=>`<a class="btn fill" target="_blank" rel="noopener" href="https://wa.me/${r[2]}?text=${encodeURIComponent("Hi, I will attend the wedding of "+BRIDE+" and "+GROOM+".")}">${r[1]}<br>${r[0]}</a>`).join("");
/* ===== CALENDAR (.ics, IST) ===== */
const REC=["Blessing Ceremony & Reception Feast","20261205T171500","Mali Samaj Bhawan\\, Lakhotiya Mahadev Marg\\, Gandhi Murti\\, Pali"];
$("ics").onclick=()=>{const p=n=>String(n).padStart(2,"0");
let o="BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Invite//EN\r\n";
FN.map(f=>[f[0],f[4],VENUE]).concat([REC]).forEach((f,i)=>{const e=f[1].slice(0,9)+p(+f[1].slice(9,11)+1)+f[1].slice(11);
o+=`BEGIN:VEVENT\r\nUID:fn${i}@invite\r\nDTSTAMP:20260101T000000Z\r\nDTSTART;TZID=Asia/Kolkata:${f[1]}\r\nDTEND;TZID=Asia/Kolkata:${e}\r\nSUMMARY:${f[0]}\r\nLOCATION:${f[2]}\r\nEND:VEVENT\r\n`});
o+="END:VCALENDAR";const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([o],{type:"text/calendar"}));a.download="wedding.ics";a.click()};
/* ===== COUNTDOWN (fixed +05:30) ===== */
const T=Date.parse("2026-12-02T07:00:00+05:30");
function tick(){let s=Math.floor((T-Date.now())/1e3);if(s<=0){$("cd").innerHTML='<p id="jm">Just Married</p>';return clearInterval(iv)}
$("d").textContent=Math.floor(s/86400);$("h").textContent=Math.floor(s%86400/3600);$("m").textContent=Math.floor(s%3600/60);$("s").textContent=s%60}
const iv=setInterval(tick,1000);tick();
/* ===== IMAGES (all paths come from config.js) ===== */
document.querySelector(".gimg").src=IMAGES.ganesh;
document.querySelector(".frame img").src=IMAGES.couple;
$("fav").href=IMAGES.favicon;
/* ===== GALLERY + LIGHTBOX (hidden when the gallery list is empty) ===== */
(function(){const G=IMAGES.gallery||[],n=G.length;if(!n)return;
$("gallery").hidden=false;
$("alb").innerHTML=G.map((src,i)=>`<button data-i="${i}" aria-label="Open photo ${i+1}"><img src="${src}" alt="Photo ${i+1}" style="object-position:${IMAGES.galleryPosition||"50% 25%"}" loading="lazy"></button>`).join("");
const lb=$("lb");let cur=0;
const show=i=>{cur=(i+n)%n;$("lbi").src=G[cur];$("lbi").alt="Photo "+(cur+1);$("ct").textContent=(cur+1)+" / "+n};
$("alb").onclick=e=>{const b=e.target.closest("button");if(b){show(+b.dataset.i);lb.classList.add("on");$("cl").focus()}};
$("pv").onclick=()=>show(cur-1);$("nx").onclick=()=>show(cur+1);$("cl").onclick=()=>lb.classList.remove("on");
addEventListener("keydown",e=>{if(!lb.classList.contains("on"))return;if(e.key==="Escape")lb.classList.remove("on");if(e.key==="ArrowLeft")show(cur-1);if(e.key==="ArrowRight")show(cur+1)});
let tx=0;lb.addEventListener("touchstart",e=>tx=e.touches[0].clientX,{passive:true});
lb.addEventListener("touchend",e=>{const d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)show(cur+(d<0?1:-1))},{passive:true});
})();
/* ===== SCROLL REVEAL ===== */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll(".rv").forEach((el,i)=>{el.style.transitionDelay=(i%3)*.12+"s";RM?el.classList.add("in"):io.observe(el)});
/* ===== OPENING ===== */
function openIt(){const o=$("open");if(o.classList.contains("opening"))return;o.classList.add("opening");
if(!RM)for(let i=0;i<24;i++){const s=document.createElement("i");s.className="sp";const a=i/24*6.28,r=90+Math.random()*80;s.style.setProperty("--x",Math.cos(a)*r+"px");s.style.setProperty("--y",Math.sin(a)*r+"px");o.querySelector(".env").appendChild(s)}
setTimeout(()=>$("flash").classList.add("on"),1300);
setTimeout(()=>{o.classList.add("go");$("flash").classList.remove("on");document.body.classList.remove("lock");start()},RM?50:1700)}
$("seal").addEventListener("click",openIt);
addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&!document.body.classList.contains("lock")===false&&document.activeElement.id!=="seal"){e.preventDefault();openIt()}});
$("seal").focus();
/* ===== FLIGHT PATH ===== */
const svg=$("path"),NS="http://www.w3.org/2000/svg";let P,L,trail,clip,plane,H=0;
function build(){H=document.documentElement.scrollHeight;const W=innerWidth,n=8;svg.setAttribute("viewBox",`0 0 ${W} ${H}`);svg.style.height=H+"px";
let d=`M${W*.5} 0`,seg=H/n;for(let i=0;i<n;i++){const x=i%2?W*.9:W*.1,y0=i*seg,y1=y0+seg;d+=` C${x} ${y0+seg*.2} ${x} ${y0+seg*.8} ${W*.5} ${y1}`}
svg.innerHTML=`<defs><clipPath id="cp"><rect id="cr" x="0" y="0" width="${W}" height="0"/></clipPath></defs>
<path id="base" d="${d}" fill="none" stroke="#C9A15F" stroke-width="3.4" stroke-linecap="round" stroke-dasharray="0.1 15" opacity=".4"/>
<path id="tr" d="${d}" fill="none" stroke="#C9A15F" stroke-width="2" stroke-dasharray="12 8" opacity=".6" clip-path="url(#cp)"/>
<g id="pl" opacity=".6"><path d="M-8 14C-30 18 -44 10 -50 -2C-32 -4 -16 2 -8 14zM8 14C30 18 44 10 50 -2C32 -4 16 2 8 14z" fill="#C9A15F"/><path d="M-4 12C-22 8 -32 -4 -34 -16C-18 -14 -8 -4 -4 12zM4 12C22 8 32 -4 34 -16C18 -14 8 -4 4 12z" fill="#E8CFA0"/><path d="M0 -26C-12 -12 -12 6 0 14C12 6 12 -12 0 -26z" fill="#F3E6CF" stroke="#C9A15F"/></g>`;
P=$("base");L=P.getTotalLength();clip=$("cr");plane=$("pl");move()}
function move(){const y=scrollY+innerHeight*.42,p=Math.min(1,Math.max(0,y/H)),l=p*L,a=P.getPointAtLength(l),b=P.getPointAtLength(Math.min(L,l+2));
plane.setAttribute("transform",`translate(${a.x} ${a.y}) rotate(${Math.atan2(b.y-a.y,b.x-a.x)*14}) scale(.68)`);clip.setAttribute("height",a.y)}
let tk=0;addEventListener("scroll",()=>{if(!tk){tk=1;requestAnimationFrame(()=>{tk=0;if(H)move();if(!RM)document.querySelector(".hbg").style.transform=`translate3d(0,${scrollY*.35}px,0)`})}},{passive:true});
addEventListener("resize",()=>H&&build());
new ResizeObserver(()=>H&&Math.abs(document.documentElement.scrollHeight-H)>4&&build()).observe(document.body);
/* ===== PETALS + GLITTER ===== */
function start(){build();if(RM)return;
for(let i=0;i<(mob?10:18);i++){const p=document.createElement("i");p.className="pet"+(i%3?"":" rs");p.style.left=Math.random()*100+"vw";p.style.animationDuration=14+Math.random()*10+"s";p.style.animationDelay=-Math.random()*20+"s";p.style.setProperty("--sw",(Math.random()*120-60)+"px");document.body.appendChild(p)}
for(let i=0;i<30;i++){const g=document.createElement("i");g.className="gl";g.style.left=Math.random()*100+"vw";g.style.top=Math.random()*100+"vh";g.style.animationDuration=3+Math.random()*4+"s";g.style.animationDelay=-Math.random()*6+"s";document.body.appendChild(g)}}
addEventListener("load",()=>{if(!H)build()});
/* ===== CANDLE-GLOW CURSOR ===== */
const cv=$("glow"),cx=cv.getContext("2d");let tr=[],run=0,idle=0;
function size(){cv.width=innerWidth*dpr;cv.height=innerHeight*dpr;cx.setTransform(dpr,0,0,dpr,0,0)}size();addEventListener("resize",size);
function add(x,y){tr.push({x,y,t:performance.now()});if(!run){run=1;requestAnimationFrame(draw)}}
if(!RM){addEventListener("pointermove",e=>{if(e.pointerType==="mouse")add(e.clientX,e.clientY)},{passive:true});
addEventListener("pointerdown",e=>{if(e.pointerType!=="mouse")add(e.clientX,e.clientY)},{passive:true})}
function draw(now){cx.clearRect(0,0,innerWidth,innerHeight);tr=tr.filter(p=>now-p.t<700);
tr.forEach(p=>{const a=1-(now-p.t)/700,r=(mob?30+(1-a)*60:26+Math.sin(now/90)*3)*(mob?1:a+.4),g=cx.createRadialGradient(p.x,p.y,0,p.x,p.y,r);
g.addColorStop(0,`rgba(255,200,120,${.35*a})`);g.addColorStop(1,"rgba(255,200,120,0)");cx.fillStyle=g;cx.beginPath();cx.arc(p.x,p.y,r,0,6.3);cx.fill()});
if(tr.length)requestAnimationFrame(draw);else run=0}
/* ===== LANTERNS ===== */
$("lan").onclick=()=>{if(RM)return;for(let i=0;i<3;i++){const l=document.createElement("i");l.className="lan";l.style.left=20+i*30+Math.random()*10+"vw";l.style.animationDelay=i*.6+"s";l.style.setProperty("--sw",(Math.random()*80-40)+"px");document.body.appendChild(l);setTimeout(()=>l.remove(),9000)}};
