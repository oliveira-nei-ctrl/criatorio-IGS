function fAnimal(idx){
  const a=idx!==null?D.animais[idx]:null;
  editIdx=idx; editType='animais';
  return `
<div class="modal-hd"><div class="modal-title">${a?'Editar':'Novo'} animal</div><button class="modal-close" onclick="closeModal()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
<div class="row2">
  <div class="form-g"><label>Brinco *</label><input id="fa-id" value="${a?a.id:''}" placeholder="OV-001" autocomplete="off"></div>
  <div class="form-g"><label>Nome</label><input id="fa-nome" value="${a?a.nome||'':''}" placeholder="opcional"></div>
</div>
<div class="row2">
  <div class="form-g"><label>Sexo</label><select id="fa-sexo"><option ${a&&a.sexo==='Fêmea'?'selected':''}>Fêmea</option><option ${a&&a.sexo==='Macho'?'selected':''}>Macho</option></select></div>
  <div class="form-g"><label>Raça</label><input id="fa-raca" value="${a?a.raca||'':''}" placeholder="Santa Inês"></div>
</div>
<div class="row2">
  <div class="form-g"><label>Nascimento</label><input type="date" id="fa-nasc" value="${a?a.nasc||td():td()}"></div>
  <div class="form-g"><label>Peso (kg)</label><input type="number" step="0.1" id="fa-peso" value="${a?a.peso||'':''}" placeholder="0"></div>
</div>
<div class="row2">
  <div class="form-g"><label>ID Pai</label><input id="fa-pai" value="${a?a.pai||'':''}" placeholder="brinco"></div>
  <div class="form-g"><label>ID Mãe</label><input id="fa-mae" value="${a?a.mae||'':''}" placeholder="brinco"></div>
</div>
<div class="form-g"><label>Origem</label><select id="fa-ori"><option ${a&&a.origem==='Nascido aqui'?'selected':''}>Nascido aqui</option><option ${a&&a.origem==='Comprado'?'selected':''}>Comprado</option></select></div>
<button class="btn btn-blue" onclick="saveAnimal()">${a?'Atualizar':'Salvar'} animal</button>`; }

function saveAnimal(){
  const id=document.getElementById('fa-id').value.trim();
  if(!id){ alert('Informe o brinco.'); return; }
  if(editIdx===null){
    const dup=D.animais.findIndex(a=>a.id===id);
    if(dup>=0){ alert('Já existe um animal com este brinco: '+id); return; }
  }
  const obj={ id, nome:document.getElementById('fa-nome').value, sexo:document.getElementById('fa-sexo').value, raca:document.getElementById('fa-raca').value, nasc:document.getElementById('fa-nasc').value, peso:document.getElementById('fa-peso').value, pai:document.getElementById('fa-pai').value, mae:document.getElementById('fa-mae').value, origem:document.getElementById('fa-ori').value, status:'ativo', dt:td() };
  if(editIdx!==null){
    const old=D.animais[editIdx];
    obj.status=old.status;
    if(old.peso!==obj.peso&&obj.peso){
      if(!old.pesoHist) old.pesoHist=[];
      old.pesoHist.push({data:td(),peso:old.peso});
    }
    D.animais[editIdx]={...old,...obj};
  } else {
    D.animais.push(obj);
  }
  save(); closeModal(); renderSection(curSec); renderDashboard();
}

function renderPlantel(){
  const el=document.getElementById('plantel-list');
  const em=document.getElementById('plantel-empty');
  const q=document.getElementById('plantel-search').value.toLowerCase();
  let lista=D.animais;
  if(q) lista=lista.filter(a=> a.id.toLowerCase().includes(q)||a.nome?.toLowerCase().includes(q)||a.raca?.toLowerCase().includes(q));
  if(!lista.length){ el.innerHTML=''; em.style.display='block'; em.innerHTML=q?'Nenhum animal encontrado para "'+q+'".<br>Toque em + para adicionar.':'Nenhum animal cadastrado.<br>Toque em + para adicionar.'; return; }
  em.style.display='none';
  el.innerHTML=lista.map((a,i)=>{
    const realIdx=D.animais.indexOf(a);
    const filhos=D.animais.filter(f=>f.pai===a.id||f.mae===a.id);
    const loteAnimal=getLotOfAnimal(a.id);
    return `
    <div class="animal-card">
      <div class="ac-hd">
        <div><span class="ac-id">${a.id}</span>${a.nome?` — <span style="font-weight:400">${a.nome}</span>`:''}</div>
        <div style="display:flex;gap:4px;align-items:center;">
          ${loteAnimal?`<span class="badge bb" style="font-size:9px;padding:2px 8px;">${loteAnimal.nome}</span>`:''}
          <span class="badge ${a.status==='morto'?'br':'bg'}">${a.status==='morto'?'Morto':'Ativo'}</span>
        </div>
      </div>
      <div class="ac-grid">
        <span class="ac-lbl">Sexo</span><span class="ac-val">${a.sexo}</span>
        <span class="ac-lbl">Raça</span><span class="ac-val">${a.raca||'-'}</span>
        <span class="ac-lbl">Nasc.</span><span class="ac-val">${fmtD(a.nasc)}</span>
        <span class="ac-val">${a.peso?a.peso+' kg':'-'}</span>
        <span class="ac-lbl">Pai</span><span class="ac-val">${a.pai||'-'}</span>
        <span class="ac-lbl">Mãe</span><span class="ac-val">${a.mae||'-'}</span>
        ${filhos.length?`<span class="ac-lbl">Filhos</span><span class="ac-val">${filhos.length}</span>`:''}
      </div>
      ${a.pesoHist&&a.pesoHist.length?`<div style="margin-top:8px;"><div class="weight-chart">${a.pesoHist.map((w,wi)=>`<div class="wc"><div class="wv">${w.peso}</div><div class="wb" style="height:${Math.round((parseFloat(w.peso)/Math.max(...a.pesoHist.map(x=>parseFloat(x.peso)),1))*85)+3}px"></div><div class="wl">${fmtD(w.data)}</div></div>`).join('')}${a.peso?`<div class="wc"><div class="wv">${a.peso}</div><div class="wb" style="height:${Math.round((parseFloat(a.peso)/Math.max(...a.pesoHist.map(x=>parseFloat(x.peso)),parseFloat(a.peso),1))*85)+3}px;background:var(--primary);"></div><div class="wl">atual</div></div>`:''}</div></div>`:''}
      <div style="margin-top:10px;display:flex;gap:8px;justify-content:flex-end;">
        <button class="btn btn-outline btn-sm" onclick="fAnimal(${realIdx});showModal(fAnimal(${realIdx}))">Editar</button>
        <button class="btn btn-outline btn-sm" onclick="registrarPeso(${realIdx})">Peso</button>
        <button class="btn btn-red btn-sm" onclick="del('animais',${realIdx},'Remover ${a.id} do plantel?')">Remover</button>
      </div>
    </div>`}).join('');
}

function registrarPeso(idx){
  const a=D.animais[idx];
  if(!a) return;
  const novo=prompt('Novo peso (kg) para '+a.id+':', a.peso||'');
  if(novo&&!isNaN(parseFloat(novo))){
    if(!a.pesoHist) a.pesoHist=[];
    if(a.peso) a.pesoHist.push({data:td(),peso:a.peso});
    a.peso=novo;
    save(); renderPlantel(); renderDashboard();
  }
}

function showGenealogia(animalId){
  const id=animalId||prompt('Digite o brinco do animal para ver a genealogia:');
  if(!id) return;
  const a=D.animais.find(x=>x.id===id);
  if(!a){ alert('Animal não encontrado: '+id); return; }

  function arvore(animal, depth=0){
    if(!animal||depth>5) return '';
    const pai=D.animais.find(x=>x.id===animal.pai);
    const mae=D.animais.find(x=>x.id===animal.mae);
    const filhos=D.animais.filter(f=>f.pai===animal.id||f.mae===animal.id);
    let html=`<div class="gene-node" onclick="showGenealogia('${animal.id}')">${'  '.repeat(depth)}${animal.id}${animal.nome?' ('+animal.nome+')':''} <span class="badge ${animal.status==='morto'?'br':'bg'}" style="font-size:9px;">${animal.status==='morto'?'Morto':'Ativo'}</span></div>`;
    if(pai||mae){
      html+='<div class="gene-tree">';
      if(pai) html+=arvore(pai,depth+1);
      if(mae) html+=arvore(mae,depth+1);
      html+='</div>';
    }
    if(filhos.length){
      html+=`<div style="margin-left:${24*(depth+1)}px;margin-top:4px;"><div style="font-size:11px;color:var(--text2);margin-bottom:4px;">Filhos:</div>`;
      filhos.forEach(f=>{ html+=`<div class="gene-node" style="font-size:12px;" onclick="showGenealogia('${f.id}')">${f.id}${f.nome?' ('+f.nome+')':''}</div>`; });
      html+='</div>';
    }
    return html;
  }

  showModal(`
<div class="modal-hd"><div class="modal-title">Genealogia — ${id}</div><button class="modal-close" onclick="closeModal()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
<div style="margin-bottom:12px;font-size:13px;color:var(--text2);">Toque em qualquer animal para navegar na árvore.</div>
<div style="overflow-x:auto;">${arvore(a)}</div>
<button class="btn btn-outline" style="margin-top:12px;" onclick="showGenealogia()">Buscar outro animal</button>`);
}
