function goSection(id, btn){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('on'));
  document.querySelectorAll('.bnav').forEach(b=>b.classList.remove('on'));
  document.getElementById('s-'+id).classList.add('on');
  if(btn) btn.classList.add('on');
  curSec=id;
  document.getElementById('scroll-area').scrollTop=0;
  renderSection(id);
}

function setTab(sec, tab, btn){
  if(sec==='repro'){
    ['cobertura','prenhez','parto'].forEach(t=>{
      document.getElementById('repro-'+t).style.display=t===tab?'block':'none';
    });
    curReproTab=tab;
    renderRepro(tab);
  } else {
    ['vacina','verminose','mortes'].forEach(t=>{
      document.getElementById('saude-'+t).style.display=t===tab?'block':'none';
    });
    curSaudeTab=tab;
    renderSaude(tab);
  }
  btn.closest('.tabs').querySelectorAll('.tab').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
}

function showModal(html){
  document.getElementById('modal').innerHTML=html;
  document.getElementById('overlay').classList.add('on');
}
function closeModal(){ document.getElementById('overlay').classList.remove('on'); editIdx=null; editType=null; }
function closeOuter(e){ if(e.target===document.getElementById('overlay')) closeModal(); }

function showConfigModal(){
  showModal(`
<div class="modal-hd"><div class="modal-title">Configurações</div><button class="modal-close" onclick="closeModal()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
<div class="form-g"><label>Período de gestação padrão (dias)</label><input type="number" id="cfg-gest" value="${D.config.gestacao||147}" min="140" max="160"></div>
<div class="form-g"><label>Período médio entre vacinas (dias)</label><input type="number" id="cfg-vac" value="${D.config.intervaloVacina||180}" min="30" max="730"></div>
<button class="btn btn-blue" onclick="saveConfig()">Salvar configurações</button>
<div style="margin-top:16px;padding-top:16px;border-top:0.5px solid var(--border);">
  <div class="card-title">Backup dos dados</div>
  <div class="btn-row">
    <button class="btn btn-green" onclick="backupDados()">Baixar backup JSON</button>
    <button class="btn btn-outline" onclick="document.getElementById('restore-input').click()">Restaurar backup</button>
  </div>
  <input type="file" id="restore-input" accept=".json" style="display:none" onchange="restoreDados(event)">
</div>`);
}
function saveConfig(){
  D.config.gestacao=parseInt(document.getElementById('cfg-gest').value)||147;
  D.config.intervaloVacina=parseInt(document.getElementById('cfg-vac').value)||180;
  save(); closeModal(); renderAll();
}

function backupDados(){
  const blob=new Blob([JSON.stringify(D,null,2)],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='backup_criadouro_'+td()+'.json';
  a.click();
}
function restoreDados(e){
  const file=e.target.files[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=function(ev){
    try{
      const p=JSON.parse(ev.target.result);
      Object.keys(p).forEach(k=>{ if(D[k]!==undefined) D[k]=p[k]; });
      save(); closeModal(); renderAll();
      alert('Backup restaurado com sucesso!');
    }catch(err){ alert('Erro ao restaurar backup: '+err.message); }
  };
  reader.readAsText(file);
  e.target.value='';
}

function openAdd(){
  const map = {
    painel: ()=>fAnimal(null),
    plantel: ()=>fAnimal(null),
    repro: ()=>({cobertura:()=>fCobertura(null),prenhez:()=>fPrenhez(null),parto:()=>fParto(null)}[curReproTab])(),
    saude: ()=>({vacina:()=>fVacina(null),verminose:()=>fVerminose(null),mortes:()=>fMorte(null)}[curSaudeTab])(),
    fin: ()=>fFinanceiro(null)
  };
  const fn=map[curSec];
  if(fn) showModal(typeof fn==='function'?fn():fn);
}

function del(arr,i,confirmMsg){
  if(confirmMsg&&!confirm(confirmMsg)) return;
  if(arr==='animais'&&D.animais[i]){
    D.animais[i].status='morto';
    D.mortes.push({ data:td(), id:D.animais[i].id, pai:'', mae:'', causa:'Removido', obs:'Removido do sistema' });
  }
  D[arr].splice(i,1);
  save(); renderAll();
}

function renderSection(id){
  if(id==='painel') renderDashboard();
  else if(id==='plantel') renderPlantel();
  else if(id==='repro'){ renderRepro('cobertura'); renderRepro('prenhez'); renderRepro('parto'); }
  else if(id==='saude'){ renderSaude('vacina'); renderSaude('verminose'); renderSaude('mortes'); }
  else if(id==='fin') renderFin();
}
function renderAll(){ renderDashboard(); renderPlantel(); ['cobertura','prenhez','parto'].forEach(t=>renderRepro(t)); ['vacina','verminose','mortes'].forEach(t=>renderSaude(t)); renderFin(); }

function toggleDark(){
  const h=document.documentElement;
  h.classList.toggle('dark');
  D.config.dark=h.classList.contains('dark');
  updateDarkIcon();
  save();
}
function applyDark(enable){
  const h=document.documentElement;
  if(enable) h.classList.add('dark'); else h.classList.remove('dark');
  updateDarkIcon();
}
function updateDarkIcon(){
  const el=document.getElementById('dark-icon');
  if(!el) return;
  const dark=document.documentElement.classList.contains('dark');
  el.innerHTML=dark
    ?'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'
    :'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
}

let deferredPrompt=null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault(); deferredPrompt=e;
  const b=document.getElementById('install-banner');
  if(b) b.style.display='flex';
});
function dismissInstall(){
  document.getElementById('install-banner').style.display='none';
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('topbar-date').textContent = new Date().toLocaleDateString('pt-BR',{weekday:'short',day:'2-digit',month:'short',year:'numeric'});
  load();
  if(D.config.dark) applyDark(true);
  renderAll();

  const ib=document.getElementById('install-banner');
  if(ib) ib.addEventListener('click', async ()=>{
    if(!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt=null;
    dismissInstall();
  });

  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js').catch(()=>{});
  }
});
