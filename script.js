const books = [
  { title:"The Orchard of Small Mercies", author:"E. Whitcombe", color:"#F5E6C8", accent:"#6B3A2A", tag:"First edition", blurb:"A Devon orchard, a family secret, and a winter that refuses to end.", top:"Novel · 2024" },
  { title:"Letters to a Lighthouse Keeper", author:"Jonah Park", color:"#2B2117", accent:"#C9A96A", tag:"Second-hand", blurb:"Unsent letters, sea glass, and the art of keeping a light on for someone else.", top:"Memoir" },
  { title:"How to Mend a Broken Year", author:"Mara Elowen", color:"#6B7B6E", accent:"#FFF8EC", tag:"Staff pick", blurb:"Essay collection on repair — of clothes, friendships, and old radios.", top:"Essays" },
  { title:"The Atlas of Lost Cafés", author:"S. N. Ribeiro & L. Hart", color:"#C9A96A", accent:"#2B2117", tag:"Illustrated", blurb:"32 cafés that no longer exist, drawn from memory and menus.", top:"Illustrated" },
  { title:"Midnight at the Paper Shop", author:"Aoi Tanaka", color:"#B86B4A", accent:"#FFF8EC", tag:"Fiction", blurb:"A Tokyo paper shop that only opens after midnight — and the girl who inherits it.", top:"Novel" },
  { title:"Wild Ferments", author:"Rosa Delgado", color:"#EDE0C8", accent:"#6B3A2A", tag:"Cookery", blurb:"Sourdough, kimchi, and the quiet science of waiting.", top:"Food" },
  { title:"The Quiet History of Willowbridge", author:"Thomas Fenwick", color:"#4A6741", accent:"#FDF6E3", tag:"Local", blurb:"From canal barges to the bookshop’s founding in 1987.", top:"History" },
  { title:"What the River Remembers", author:"Imani Okoro", color:"#8B4A3B", accent:"#FFF8EC", tag:"Poetry", blurb:"Poems that follow the river from source to sea.", top:"Poetry" },
  { title:"A Field Guide to Second Chances", author:"Clara June", color:"#FFF8EC", accent:"#2B2117", tag:"Second-hand", blurb:"A botanist returns home to a garden gone wild.", top:"Novel" },
  { title:"The Bookbinder’s Daughter", author:"N. Singh", color:"#D4A574", accent:"#2B2117", tag:"Staff pick", blurb:"A family trade, a wartime diary, and paper that holds everything.", top:"Novel" },
  { title:"Small Birds, Loud Songs", author:"Various — ed. Milo Crane", color:"#6B3A2A", accent:"#C9A96A", tag:"Anthology", blurb:"An anthology of nature writing from the Willow valley.", top:"Nature" },
  { title:"Tea & Syntax", author:"Bea Albright", color:"#FDF6E3", accent:"#6B3A2A", tag:"Essays", blurb:"On commas, comfort, and how punctuation can be a kindness.", top:"Humour" },
];

const events = [
  {
    date:"18 Oct", day:"18", month:"Oct", chip:"This Saturday",
    title:"An Evening with Mara Elowen",
    when:"Sat 18 Oct · 7:00pm · Upstairs at Wisdom",
    desc:"The essayist behind <em>How to Mend a Broken Year</em> reads, mends a shirt on stage, and takes questions about repair. BYO torn pocket if you like.",
    color1:"#F5E6C8", color2:"#E8D5B5"
  },
  {
    date:"25 Oct", day:"25", month:"Oct", chip:"Family",
    title:"Kids’ Story Saturday: The Lighthouse Cat",
    when:"Sat 25 Oct · 10:30am · Window seat",
    desc:"Aoi Tanaka returns with costumes, biscuits, and the true story of a cat who lived in a lighthouse. Ages 4–10, but grown-ups always stay.",
    color1:"#DDE6DD", color2:"#C8D8C8"
  },
  {
    date:"2 Nov", day:"2", month:"Nov", chip:"Open mic",
    title:"Poetry & Tea — November Edition",
    when:"Sun 2 Nov · 5:00pm · Back room",
    desc:"Bring one poem (yours or borrowed). We bring tea, cake, and a slightly wobbly microphone. Hosted by Imani & the Willow Poets.",
    color1:"#F3D8C8", color2:"#E8C4A8"
  },
];

function el(tag, cls, html){
  const e=document.createElement(tag);
  if(cls) e.className=cls;
  if(html!==undefined) e.innerHTML=html;
  return e;
}

function renderBooks(){
  const grid=document.getElementById('booksGrid');
  grid.innerHTML='';
  books.forEach((b, i)=>{
    const card=el('article','book-card');
    card.setAttribute('role','listitem');
    card.tabIndex=0;
    card.setAttribute('aria-label', `${b.title} by ${b.author}`);

    const cover=el('div','book-cover');
    cover.style.background = b.color;
    cover.style.color = (b.color==='#2B2117' || b.color==='#6B3A2A' || b.color==='#4A6741' || b.color==='#8B4A3B') ? (b.accent || '#FDF6E3') : b.accent;
    cover.style.borderColor = 'rgba(43,33,23,.14)';
    cover.innerHTML = `
      <div class="book-spine-line" aria-hidden="true"></div>
      <div class="book-top">${b.top}</div>
      <div>
        <div class="book-title">${b.title}</div>
        <div class="book-author">${b.author}</div>
      </div>
      <div class="book-ornament" aria-hidden="true">— ❦ —</div>
    `;

    const meta=el('div','book-meta');
    meta.innerHTML = `
      <p class="book-title-meta">${b.title}</p>
      <p class="book-author-meta">${b.author}</p>
      ${b.tag ? `<span class="book-tag">${b.tag==='Second-hand'?'★ '+b.tag:b.tag}</span>` : ''}
    `;

    card.append(cover, meta);
    card.addEventListener('click', ()=> openDialog(i));
    card.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); openDialog(i);} });
    grid.appendChild(card);
  });
}

function renderEvents(){
  const grid=document.getElementById('eventsGrid');
  grid.innerHTML='';
  events.forEach(ev=>{
    const card=el('article','event-card');
    const ill=el('div','event-ill');
    ill.style.background = `linear-gradient(135deg, ${ev.color1}, ${ev.color2})`;
    ill.style.borderBottomColor='var(--line)';
    // decorative sketch
    ill.innerHTML = `
      <div class="event-date" aria-label="${ev.date}"><b>${ev.day}</b><span>${ev.month}</span></div>
      <span class="event-chip">${ev.chip}</span>
    `;
    const body=el('div','event-body');
    body.innerHTML = `
      <h3>${ev.title}</h3>
      <p class="event-when">${ev.when}</p>
      <p>${ev.desc}</p>
      <a href="#contact" class="event-link">Reserve a seat →</a>
    `;
    card.append(ill, body);
    grid.appendChild(card);
  });
}

// dialog
let activeBook=0;
function openDialog(idx){
  activeBook=idx;
  const b=books[idx];
  const dlg=document.getElementById('bookDialog');
  const cover=document.getElementById('dialogCover');
  cover.style.background=b.color;
  cover.style.color = (b.color==='#2B2117' || b.color==='#6B3A2A' || b.color==='#4A6741' || b.color==='#8B4A3B') ? (b.accent || '#FDF6E3') : b.accent;
  cover.innerHTML = `
    <div class="book-top">${b.top}</div>
    <div>
      <div class="book-title" style="font-size:1.25rem">${b.title}</div>
      <div class="book-author">${b.author}</div>
    </div>
    <div class="book-ornament">— ❦ —</div>
  `;
  document.getElementById('dialogEyebrow').textContent=b.top;
  document.getElementById('dialogTitle').textContent=b.title;
  document.getElementById('dialogAuthor').textContent='by ' + b.author;
  document.getElementById('dialogBlurb').textContent=b.blurb;
  const tag=document.getElementById('dialogTag');
  if(b.tag){ tag.hidden=false; tag.textContent=b.tag; } else tag.hidden=true;
  if(typeof dlg.showModal==='function') dlg.showModal(); else dlg.setAttribute('open','');
}

// form
function setupForm(){
  const form=document.getElementById('contactForm');
  const nameI=document.getElementById('cName');
  const emailI=document.getElementById('cEmail');
  const msgI=document.getElementById('cMsg');
  const errName=document.getElementById('errName');
  const errEmail=document.getElementById('errEmail');
  const errMsg=document.getElementById('errMsg');
  const count=document.getElementById('charCount');
  const toast=document.getElementById('toast');
  const toastName=document.getElementById('toastName');

  msgI.addEventListener('input', ()=>{ count.textContent = `${msgI.value.length} / 300`; });

  function setErr(input, errEl, msg){
    if(msg){ errEl.textContent=msg; input.setAttribute('aria-invalid','true'); }
    else { errEl.textContent=''; input.removeAttribute('aria-invalid'); }
  }
  function validate(){
    let ok=true;
    const n=nameI.value.trim();
    const e=emailI.value.trim();
    const m=msgI.value.trim();
    if(n.length<2){ setErr(nameI, errName, 'Please tell us your name (at least 2 characters).'); ok=false; } else setErr(nameI, errName, '');
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)){ setErr(emailI, errEmail, 'That email doesn’t look quite right.'); ok=false; } else setErr(emailI, errEmail, '');
    if(m.length<8){ setErr(msgI, errMsg, 'A few more words helps — at least 8 characters.'); ok=false; } else if(m.length>300){ setErr(msgI, errMsg, 'Keep it under 300 characters — we love short notes!'); ok=false; } else setErr(msgI, errMsg, '');
    return ok;
  }

  nameI.addEventListener('blur', validate);
  emailI.addEventListener('blur', validate);
  msgI.addEventListener('blur', validate);

  form.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    if(!validate()) return;
    const payload={ name:nameI.value.trim(), email:emailI.value.trim(), question:msgI.value.trim(), at: new Date().toISOString() };
    console.log('[Wisdom Booksellers] dummy message', payload);
    toastName.textContent = payload.name ? ` ${payload.name}` : '';
    toast.hidden=false;
    // auto-hide after 4.5s
    setTimeout(()=>{ toast.hidden=true; }, 4500);
    form.reset();
    count.textContent='0 / 300';
    setErr(nameI, errName, ''); setErr(emailI, errEmail, ''); setErr(msgI, errMsg, '');
  });

  // toast close
  toast.querySelector('.toast-close').addEventListener('click', ()=> toast.hidden=true);
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') toast.hidden=true; });

  // dialog close
  const dlg=document.getElementById('bookDialog');
  dlg.querySelector('.dialog-close').addEventListener('click', ()=> dlg.close());
  dlg.addEventListener('click', (e)=>{
    const r=dlg.getBoundingClientRect();
    if(e.clientX<r.left || e.clientX>r.right || e.clientY<r.top || e.clientY>r.bottom) dlg.close();
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderBooks();
  renderEvents();
  setupForm();
});
