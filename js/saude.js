function fVacina(idx){
  const v=idx!==null?D.vacinas[idx]:null;
  editIdx=idx; editType='vacinas';
  return `
<div class="modal-hd"><div class="modal-title">${v?'Editar':'Registrar'} vacinação</div><button class="modal-close" onclick="closeModal()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
<div class="form-g"><label>Data *</label><input type="date" id="fv-data" value="${v?v.data:td()}"></div>
<div class="row2">
  <div class="form-g"><label>Animal (brinco / lote)</label><input id="fv-an" value="${v?v.animal||'':''}" placeholder="OV-001 ou lote"></div>
  <div class="form-g"><label>Vacina</label><input id="fv-nome" value="${v?v.nome||'':''}" placeholder="Clostridioses"></div>
</div>
<div class="row2">
  <div class="form-g"><label>Dose</label><input id="fv-dose" value="${v?v.dose||'':''}" placeholder="2ml"></div>
  <div class="form-g"><label>Via</label><select id="fv-via">${['Subcutânea','Intramuscular','Oral'].map(t=>`<option ${v&&v.via===t?'selected':''}>${t}</option>`).join('')}</select></div>
</div>
<div class="row2">
  <div class="form-g"><label>Próxima dose</label><input type="date" id="fv-prox" value="${v?v.prox||'':''}"></div>
  <div class="form-g"><label>Responsável</label><input id="fv-resp" value="${v?v.resp||'':''}" placeholder="nome"></div>
</div>
<div class="form-g"><label>Observações (lote, fabricante)</label><input id="fv-obs" value="${v?v.obs||'':''}" placeholder="opcional"></div>
<button class="btn btn-blue" onclick="saveVacina()">${v?'Atualizar':'Salvar'}</button>`; }

function saveVacina(){
  const data=document.getElementById('fv-data').value;
  if(!data){ alert('Informe a data.'); return; }
  const obj={ data, animal:document.getElementById('fv-an').value, nome:document.getElementById('fv-nome').value, dose:document.getElementById('fv-dose').value, via:document.getElementById('fv-via').value, prox:document.getElementById('fv-prox').value, resp:document.getElementById('fv-resp').value, obs:document.getElementById('fv-obs').value };
  if(editIdx!==null) D.vacinas[editIdx]=obj; else D.vacinas.push(obj);
  save(); closeModal(); renderSaude('vacina'); renderDashboard();
}

function fVerminose(idx){
  const v=idx!==null?D.verminose[idx]:null;
  editIdx=idx; editType='verminose';
  return `
<div class="modal-hd"><div class="modal-title">${v?'Editar':'Controle de'} verminose</div><button class="modal-close" onclick="closeModal()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
<div class="row2">
  <div class="form-g"><label>Data *</label><input type="date" id="fvr-data" value="${v?v.data:td()}"></div>
  <div class="form-g"><label>Animal (brinco)</label><input id="fvr-an" value="${v?v.animal||'':''}" placeholder="OV-001"></div>
</div>
<div class="row2">
  <div class="form-g"><label>FAMACHA</label><select id="fvr-fam">${[1,2,3,4,5].map(n=>`<option value="${n}" ${v&&parseInt(v.famacha)===n?'selected':''}>${n} - ${['Ótimo','Bom','Monitorar','Tratar','Emergência'][n-1]}</option>`).join('')}</select></div>
  <div class="form-g"><label>Vermífugo</label><input id="fvr-med" value="${v?v.med||'':''}" placeholder="Albendazol"></div>
</div>
<div class="row2">
  <div class="form-g"><label>Dose</label><input id="fvr-dose" value="${v?v.dose||'':''}" placeholder="1ml/10kg"></div>
  <div class="form-g"><label>Peso (kg)</label><input type="number" id="fvr-peso" value="${v?v.peso||'':''}" placeholder="45"></div>
</div>
<div class="form-g"><label>Próxima avaliação</label><input type="date" id="fvr-prox" value="${v?v.prox||'':''}"></div>
<button class="btn btn-blue" onclick="saveVerminose()">${v?'Atualizar':'Salvar'}</button>`; }

function saveVerminose(){
  const data=document.getElementById('fvr-data').value;
  if(!data){ alert('Informe a data.'); return; }
  const obj={ data, animal:document.getElementById('fvr-an').value, famacha:document.getElementById('fvr-fam').value, med:document.getElementById('fvr-med').value, dose:document.getElementById('fvr-dose').value, peso:document.getElementById('fvr-peso').value, prox:document.getElementById('fvr-prox').value };
  if(editIdx!==null) D.verminose[editIdx]=obj; else D.verminose.push(obj);
  save(); closeModal(); renderSaude('verminose');
}

function fMorte(idx){
  const m=idx!==null?D.mortes[idx]:null;
  editIdx=idx; editType='mortes';
  return `
<div class="modal-hd"><div class="modal-title">${m?'Editar':'Registrar'} morte</div><button class="modal-close" onclick="closeModal()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
<div class="row2">
  <div class="form-g"><label>Data *</label><input type="date" id="fm-data" value="${m?m.data:td()}"></div>
  <div class="form-g"><label>Animal (brinco)</label><input id="fm-id" value="${m?m.id||'':''}" placeholder="OV-001"></div>
</div>
<div class="row2">
  <div class="form-g"><label>ID Pai</label><input id="fm-pai" value="${m?m.pai||'':''}" placeholder="brinco"></div>
  <div class="form-g"><label>ID Mãe</label><input id="fm-mae" value="${m?m.mae||'':''}" placeholder="brinco"></div>
</div>
<div class="form-g"><label>Causa</label>
  <select id="fm-causa">${['Desconhecida','Doença','Verminose','Parto','Predador','Acidente','Velhice'].map(t=>`<option ${m&&m.causa===t?'selected':''}>${t}</option>`).join('')}</select>
</div>
<div class="form-g"><label>Observações</label><input id="fm-obs" value="${m?m.obs||'':''}" placeholder="detalhes..."></div>
<button class="btn btn-red" onclick="saveMorte()">${m?'Atualizar':'Confirmar'} registro</button>`; }

function saveMorte(){
  const data=document.getElementById('fm-data').value;
  if(!data){ alert('Informe a data.'); return; }
  const id=document.getElementById('fm-id').value;
  if(editIdx===null){
    const a=D.animais.find(x=>x.id===id);
    if(a) a.status='morto';
  }
  const obj={ data, id, pai:document.getElementById('fm-pai').value, mae:document.getElementById('fm-mae').value, causa:document.getElementById('fm-causa').value, obs:document.getElementById('fm-obs').value };
  if(editIdx!==null) D.mortes[editIdx]=obj; else D.mortes.push(obj);
  save(); closeModal(); renderSaude('mortes'); renderDashboard(); renderSection('plantel');
}

function famBadge(n){ const m={1:'bg',2:'bg',3:'ba',4:'br',5:'br'}; return `<span class="badge ${m[n]||'bgr'}">${n}</span>`; }
function vacStatus(prox){
  if(!prox) return '<span class="badge bgr">Sem retorno</span>';
  const d=daysUntil(prox);
  if(d<0) return '<span class="badge br">Atrasada</span>';
  if(d<=14) return `<span class="badge ba">${d}d</span>`;
  return '<span class="badge bg">Ok</span>';
}

function renderSaude(tab){
  tab=tab||curSaudeTab;
  if(tab==='vacina'){
    const el=document.getElementById('saude-vacina');
    if(!D.vacinas.length){ el.innerHTML='<div class="empty">Nenhuma vacinação registrada.</div>'; return; }
    el.innerHTML=[...D.vacinas].sort((a,b)=>b.data.localeCompare(a.data)).map((v,i)=>`
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-weight:600;">${v.nome||'Vacina'}</span>${vacStatus(v.prox)}
        </div>
        <div style="font-size:13px;color:var(--text2);">${fmtD(v.data)} — ${v.animal||'-'} — ${v.dose||'-'} ${v.via}</div>
        ${v.prox?`<div style="font-size:12px;color:var(--text2);margin-top:3px;">Próxima: <b style="color:var(--text)">${fmtD(v.prox)}</b></div>`:''}
        ${v.resp?`<div style="font-size:12px;color:var(--text3);margin-top:2px;">Resp.: ${v.resp}</div>`:''}
        <div style="margin-top:10px;text-align:right;"><button class="btn btn-outline btn-sm" onclick="fVacina(${i});showModal(fVacina(${i}))">Editar</button> <button class="btn btn-outline btn-sm" onclick="del('vacinas',${i})">Remover</button></div>
      </div>`).join('');
  } else if(tab==='verminose'){
    const el=document.getElementById('saude-verminose');
    if(!D.verminose.length){ el.innerHTML='<div class="empty">Nenhum tratamento registrado.</div>'; return; }
    el.innerHTML=[...D.verminose].sort((a,b)=>b.data.localeCompare(a.data)).map((v,i)=>`
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-weight:600;">${v.animal||'-'}</span>${famBadge(parseInt(v.famacha))}
        </div>
        <div style="font-size:13px;color:var(--text2);">${fmtD(v.data)} — ${v.med||'-'} ${v.dose||''}${v.peso?' — '+v.peso+'kg':''}</div>
        ${v.prox?`<div style="font-size:12px;color:var(--text2);margin-top:3px;">Próx. aval.: <b style="color:var(--text)">${fmtD(v.prox)}</b></div>`:''}
        <div style="margin-top:10px;text-align:right;"><button class="btn btn-outline btn-sm" onclick="fVerminose(${i});showModal(fVerminose(${i}))">Editar</button> <button class="btn btn-outline btn-sm" onclick="del('verminose',${i})">Remover</button></div>
      </div>`).join('');
  } else {
    const el=document.getElementById('saude-mortes');
    if(!D.mortes.length){ el.innerHTML='<div class="empty">Nenhuma morte registrada.</div>'; return; }
    el.innerHTML=D.mortes.map((m,i)=>`
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-weight:600;">${m.id||'-'}</span><span class="badge br">${m.causa}</span>
        </div>
        <div style="font-size:13px;color:var(--text2);">${fmtD(m.data)}</div>
        ${m.pai||m.mae?`<div style="font-size:12px;color:var(--text2);margin-top:3px;">Pai: ${m.pai||'-'} / Mãe: ${m.mae||'-'}</div>`:''}
        ${m.obs?`<div style="font-size:12px;color:var(--text3);margin-top:2px;">${m.obs}</div>`:''}
        <div style="margin-top:10px;text-align:right;"><button class="btn btn-outline btn-sm" onclick="fMorte(${i});showModal(fMorte(${i}))">Editar</button> <button class="btn btn-outline btn-sm" onclick="del('mortes',${i})">Remover</button></div>
      </div>`).join('');
  }
}
