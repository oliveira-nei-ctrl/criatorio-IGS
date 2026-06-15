function fLote(idx){
  const l=idx!==null?D.lotes[idx]:null;
  editIdx=idx; editType='lotes';
  return `
<div class="modal-hd"><div class="modal-title">${l?'Editar':'Novo'} lote</div><button class="modal-close" onclick="closeModal()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
<div class="form-g"><label>Nome do lote *</label><input id="fl-nome" value="${l?l.nome:''}" placeholder="Confinamento 1"></div>
<div class="form-g"><label>Descrição</label><input id="fl-desc" value="${l?l.descricao||'':''}" placeholder="Borregos para abate"></div>
<div class="row2">
  <div class="form-g"><label>Data de criação</label><input type="date" id="fl-data" value="${l?l.dataCriacao:td()}"></div>
  <div class="form-g"><label>Previsão de saída</label><input type="date" id="fl-prev" value="${l?l.dataPrevisao||'':''}"></div>
</div>
<div class="form-g"><label>Status</label><select id="fl-status"><option value="ativo" ${l&&l.status==='ativo'?'selected':''}>Ativo</option><option value="finalizado" ${l&&l.status==='finalizado'?'selected':''}>Finalizado</option></select></div>
<div class="form-g"><label>Observações</label><input id="fl-obs" value="${l?l.obs||'':''}" placeholder="opcional"></div>
<button class="btn btn-blue" onclick="saveLote()">${l?'Atualizar':'Criar'} lote</button>`; }

function saveLote(){
  const nome=document.getElementById('fl-nome').value.trim();
  if(!nome){ alert('Informe o nome do lote.'); return; }
  const obj={ nome, descricao:document.getElementById('fl-desc').value, dataCriacao:document.getElementById('fl-data').value, dataPrevisao:document.getElementById('fl-prev').value, status:document.getElementById('fl-status').value, obs:document.getElementById('fl-obs').value, animais:[] };
  if(editIdx!==null){
    const old=D.lotes[editIdx];
    obj.animais=old.animais||[];
    D.lotes[editIdx]={...old,...obj};
  } else {
    D.lotes.push(obj);
  }
  save(); closeModal(); renderSection('lotes');
}

function getLotOfAnimal(animalId){
  return D.lotes.find(l=>l.animais&&l.animais.includes(animalId));
}

function renderLotes(){
  const el=document.getElementById('lote-list');
  const em=document.getElementById('lote-empty');
  if(!D.lotes.length){ el.innerHTML=''; em.style.display='block'; return; }
  em.style.display='none';
  el.innerHTML=D.lotes.map((l,i)=>{
    const ativos=l.animais?l.animais.filter(id=>D.animais.find(a=>a.id===id&&a.status!=='morto')).length:0;
    const totalPeso=l.animais?l.animais.reduce((s,id)=>{ const a=D.animais.find(x=>x.id===id); return s+(a&&a.peso?parseFloat(a.peso):0); },0):0;
    const dias=l.dataCriacao?daysUntil(addDays(l.dataCriacao,0))*-1:0;
    const diasRest=l.dataPrevisao?daysUntil(l.dataPrevisao):null;
    return `
    <div class="lote-card" onclick="showLoteDetalhe(${i})">
      <div class="lote-hd">
        <div>
          <div class="lote-nome">${l.nome}</div>
          ${l.descricao?`<div class="lote-desc">${l.descricao}</div>`:''}
        </div>
        <span class="badge ${l.status==='ativo'?'bg':'bgr'}">${l.status}</span>
      </div>
      <div class="lote-metrics">
        <div class="lm"><span class="lm-lbl">Animais</span><span class="lm-val">${ativos}</span></div>
        <div class="lm"><span class="lm-lbl">Peso total</span><span class="lm-val">${totalPeso>0?totalPeso.toFixed(1)+' kg':'-'}</span></div>
        <div class="lm"><span class="lm-lbl">Média</span><span class="lm-val">${ativos>0?(totalPeso/ativos).toFixed(1)+' kg':'-'}</span></div>
        <div class="lm"><span class="lm-lbl">Dias ativo</span><span class="lm-val">${dias}d</span></div>
      </div>
      ${l.dataPrevisao?`<div style="font-size:11px;color:var(--text2);margin-top:6px;">Previsão: ${fmtD(l.dataPrevisao)}${diasRest!==null?(diasRest<0?' <span class="br" style="font-size:11px;">(venceu há ${Math.abs(diasRest)}d)</span>':' <span style="color:var(--text2)">('+diasRest+'d restantes)</span>'):''}</div>`:''}
    </div>`}).join('');
}

function showLoteDetalhe(idx){
  const l=D.lotes[idx];
  if(!l) return;
  const animaisNoLote=l.animais?l.animais.map(id=>D.animais.find(a=>a.id===id)).filter(Boolean):[];
  const ativos=animaisNoLote.filter(a=>a.status!=='morto').length;
  const totalPeso=animaisNoLote.reduce((s,a)=>s+(a.peso?parseFloat(a.peso):0),0);
  const dias=l.dataCriacao?daysUntil(addDays(l.dataCriacao,0))*-1:0;

  showModal(`
<div class="modal-hd"><div class="modal-title">${l.nome}</div><button class="modal-close" onclick="closeModal()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
<div style="margin-bottom:14px;font-size:13px;color:var(--text2);">${l.descricao||''}${l.obs?' — '+l.obs:''}</div>
<div class="lote-metrics" style="margin-bottom:14px;">
  <div class="lm"><span class="lm-lbl">Animais</span><span class="lm-val">${ativos}</span></div>
  <div class="lm"><span class="lm-lbl">Peso total</span><span class="lm-val">${totalPeso>0?totalPeso.toFixed(1)+' kg':'-'}</span></div>
  <div class="lm"><span class="lm-lbl">Média</span><span class="lm-val">${ativos>0?(totalPeso/ativos).toFixed(1)+' kg':'-'}</span></div>
  <div class="lm"><span class="lm-lbl">Dias</span><span class="lm-val">${dias}d</span></div>
</div>
<div style="display:flex;gap:8px;margin-bottom:14px;">
  <button class="btn btn-green btn-sm" onclick="adicionarAnimaisLote(${idx})" style="flex:1;">+ Adicionar animais</button>
  <button class="btn btn-outline btn-sm" onclick="closeModal();fLote(${idx});showModal(fLote(${idx}))" style="flex:1;">Editar lote</button>
</div>
<div class="card-title">Animais no lote</div>
${animaisNoLote.length?animaisNoLote.map(a=>`
  <div class="lote-animal-item">
    <div>
      <span style="font-weight:600;">${a.id}</span>${a.nome?' — '+a.nome:''}
      <span style="font-size:11px;color:var(--text2);margin-left:6px;">${a.sexo}${a.peso?' | '+a.peso+'kg':''}</span>
    </div>
    <button class="btn btn-red btn-sm" onclick="removerAnimalLote(${idx},'${a.id}')">Remover</button>
  </div>`).join(''):'<div class="empty" style="padding:20px;">Nenhum animal neste lote.</div>'}
<div style="margin-top:14px;padding-top:14px;border-top:0.5px solid var(--border);display:flex;gap:8px;">
  <button class="btn btn-outline btn-sm" onclick="closeModal();registrarPesoLote(${idx})" style="flex:1;">Pesar lote</button>
  <button class="btn btn-red btn-sm" onclick="if(confirm('Finalizar lote ${l.nome}?')){D.lotes[${idx}].status='finalizado';save();closeModal();renderSection('lotes');}" style="flex:1;">Finalizar lote</button>
</div>`);
}

function adicionarAnimaisLote(loteIdx){
  const l=D.lotes[loteIdx];
  if(!l) return;
  const idsNoLote=l.animais||[];
  const disponiveis=D.animais.filter(a=>a.status!=='morto'&&!idsNoLote.includes(a.id));
  if(!disponiveis.length){ alert('Todos os animais ativos já estão neste lote.'); return; }

  let html=`
<div class="modal-hd"><div class="modal-title">Adicionar ao lote ${l.nome}</div><button class="modal-close" onclick="closeModal()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
<div class="search-box"><input id="add-lote-search" placeholder="Buscar animal..." oninput="filtrarAddLote(${loteIdx})"></div>
<div id="add-lote-lista">`;
  html+=disponiveis.map(a=>
    `<div class="gene-node" onclick="addAnimalAoLote(${loteIdx},'${a.id}')" style="justify-content:space-between;">
      <span>${a.id}${a.nome?' — '+a.nome:''} <span style="font-size:11px;color:var(--text2)">${a.sexo}${a.peso?' | '+a.peso+'kg':''}</span></span>
      <span style="color:var(--primary);font-size:18px;">+</span>
    </div>`
  ).join('');
  html+=`</div>`;
  showModal(html);
}

function filtrarAddLote(loteIdx){
  const q=document.getElementById('add-lote-search').value.toLowerCase();
  const l=D.lotes[loteIdx];
  const idsNoLote=l.animais||[];
  const disponiveis=D.animais.filter(a=>a.status!=='morto'&&!idsNoLote.includes(a.id)&&(a.id.toLowerCase().includes(q)||a.nome?.toLowerCase().includes(q)));
  document.getElementById('add-lote-lista').innerHTML=disponiveis.length?disponiveis.map(a=>
    `<div class="gene-node" onclick="addAnimalAoLote(${loteIdx},'${a.id}')" style="justify-content:space-between;">
      <span>${a.id}${a.nome?' — '+a.nome:''} <span style="font-size:11px;color:var(--text2)">${a.sexo}${a.peso?' | '+a.peso+'kg':''}</span></span>
      <span style="color:var(--primary);font-size:18px;">+</span>
    </div>`
  ).join(''):'<div class="empty">Nenhum animal disponível.</div>';
}

function addAnimalAoLote(loteIdx, animalId){
  const l=D.lotes[loteIdx];
  if(!l) return;
  if(!l.animais) l.animais=[];
  if(l.animais.includes(animalId)) return;
  l.animais.push(animalId);
  save();
  adicionarAnimaisLote(loteIdx);
}

function removerAnimalLote(loteIdx, animalId){
  if(!confirm(`Remover ${animalId} do lote?`)) return;
  const l=D.lotes[loteIdx];
  if(!l||!l.animais) return;
  l.animais=l.animais.filter(id=>id!==animalId);
  save();
  showLoteDetalhe(loteIdx);
}

function registrarPesoLote(loteIdx){
  const l=D.lotes[loteIdx];
  if(!l||!l.animais||!l.animais.length){ alert('Lote vazio.'); return; }
  closeModal();
  let idx=0;
  const ids=l.animais.filter(id=>D.animais.find(a=>a.id===id&&a.status!=='morto'));
  function proximo(){
    if(idx>=ids.length){ save(); renderSection('lotes'); return; }
    const id=ids[idx];
    const a=D.animais.find(x=>x.id===id);
    if(!a){ idx++; proximo(); return; }
    const novo=prompt(`Peso (kg) — ${id}${a.nome?' ('+a.nome+')':''} (${idx+1}/${ids.length}):`, a.peso||'');
    if(novo!==null){
      if(!isNaN(parseFloat(novo))&&novo!==''){
        if(!a.pesoHist) a.pesoHist=[];
        if(a.peso) a.pesoHist.push({data:td(),peso:a.peso});
        a.peso=novo;
      }
    }
    idx++;
    proximo();
  }
  proximo();
}
