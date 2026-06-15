function fCobertura(idx){
  const c=idx!==null?D.coberturas[idx]:null;
  editIdx=idx; editType='coberturas';
  return `
<div class="modal-hd"><div class="modal-title">${c?'Editar':'Registrar'} cobertura</div><button class="modal-close" onclick="closeModal()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
<div class="form-g"><label>Data *</label><input type="date" id="fc-data" value="${c?c.data:td()}"></div>
<div class="row2">
  <div class="form-g"><label>Fêmea (brinco)</label><input id="fc-f" value="${c?c.femea||'':''}" placeholder="OV-001"></div>
  <div class="form-g"><label>Reprodutor</label><input id="fc-m" value="${c?c.macho||'':''}" placeholder="OV-002"></div>
</div>
<div class="form-g"><label>Tipo</label><select id="fc-tipo">${['Monta natural','Inseminação artificial','IATF'].map(t=>`<option ${c&&c.tipo===t?'selected':''}>${t}</option>`).join('')}</select></div>
<div class="form-g"><label>Parto previsto (calculado: ${D.config.gestacao||147}dias)</label><input type="date" id="fc-prev" value="${c?c.prevParto||'':''}"></div>
<div class="form-g"><label>Observações</label><input id="fc-obs" value="${c?c.obs||'':''}" placeholder="condição corporal, ciclo..."></div>
<button class="btn btn-blue" onclick="saveCobertura()">${c?'Atualizar':'Salvar'}</button>`; }

function saveCobertura(){
  const data=document.getElementById('fc-data').value;
  if(!data){ alert('Informe a data.'); return; }
  let prev=document.getElementById('fc-prev').value;
  if(!prev) prev=addDays(data,D.config.gestacao||147);
  if(editIdx!==null){
    D.coberturas[editIdx]={ data, femea:document.getElementById('fc-f').value, macho:document.getElementById('fc-m').value, tipo:document.getElementById('fc-tipo').value, prevParto:prev, obs:document.getElementById('fc-obs').value };
  } else {
    D.coberturas.push({ data, femea:document.getElementById('fc-f').value, macho:document.getElementById('fc-m').value, tipo:document.getElementById('fc-tipo').value, prevParto:prev, obs:document.getElementById('fc-obs').value });
  }
  save(); closeModal(); renderRepro('cobertura'); renderDashboard();
}

function fPrenhez(idx){
  const p=idx!==null?D.prenheces[idx]:null;
  editIdx=idx; editType='prenheces';
  return `
<div class="modal-hd"><div class="modal-title">${p?'Editar':'Diagnóstico de'} prenhez</div><button class="modal-close" onclick="closeModal()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
<div class="form-g"><label>Data *</label><input type="date" id="fp-data" value="${p?p.data:td()}"></div>
<div class="row2">
  <div class="form-g"><label>Fêmea (brinco)</label><input id="fp-f" value="${p?p.femea||'':''}" placeholder="OV-001"></div>
  <div class="form-g"><label>Resultado</label><select id="fp-res">${['positivo','negativo','aguardando'].map(t=>`<option value="${t}" ${p&&p.resultado===t?'selected':''}>${t==='positivo'?'Positivo ✓':t==='negativo'?'Negativo ✗':'Aguardando'}</option>`).join('')}</select></div>
</div>
<div class="row2">
  <div class="form-g"><label>Método</label><select id="fp-met">${['Ultrassom','Palpação','Visual'].map(t=>`<option ${p&&p.metodo===t?'selected':''}>${t}</option>`).join('')}</select></div>
  <div class="form-g"><label>Crias previstas</label><input type="number" id="fp-crias" min="1" value="${p?p.crias||'':''}" placeholder="1"></div>
</div>
<div class="form-g"><label>Previsão de parto</label><input type="date" id="fp-parto" value="${p?p.prevParto||'':''}"></div>
<div class="form-g"><label>Observações</label><input id="fp-obs" value="${p?p.obs||'':''}" placeholder="semanas de gestação..."></div>
<button class="btn btn-blue" onclick="savePrenhez()">${p?'Atualizar':'Salvar'}</button>`; }

function savePrenhez(){
  const data=document.getElementById('fp-data').value;
  if(!data){ alert('Informe a data.'); return; }
  const obj={ data, femea:document.getElementById('fp-f').value, resultado:document.getElementById('fp-res').value, metodo:document.getElementById('fp-met').value, crias:document.getElementById('fp-crias').value, prevParto:document.getElementById('fp-parto').value, obs:document.getElementById('fp-obs').value };
  if(editIdx!==null) D.prenheces[editIdx]=obj; else D.prenheces.push(obj);
  save(); closeModal(); renderRepro('prenhez'); renderDashboard();
}

function fParto(idx){
  const p=idx!==null?D.partos[idx]:null;
  editIdx=idx; editType='partos';
  return `
<div class="modal-hd"><div class="modal-title">${p?'Editar':'Registrar'} parto</div><button class="modal-close" onclick="closeModal()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
<div class="form-g"><label>Data *</label><input type="date" id="fpt-data" value="${p?p.data:td()}"></div>
<div class="row2">
  <div class="form-g"><label>Mãe (brinco)</label><input id="fpt-mae" value="${p?p.mae||'':''}" placeholder="OV-001"></div>
  <div class="form-g"><label>Pai (brinco)</label><input id="fpt-pai" value="${p?p.pai||'':''}" placeholder="OV-002"></div>
</div>
<div class="row2">
  <div class="form-g"><label>Qtd de crias</label><input type="number" id="fpt-qtd" value="${p?p.qtd||'1':'1'}" min="1"></div>
  <div class="form-g"><label>Sexo</label><select id="fpt-sexo">${['Misto','Macho(s)','Fêmea(s)'].map(t=>`<option ${p&&p.sexo===t?'selected':''}>${t}</option>`).join('')}</select></div>
</div>
<div class="row2">
  <div class="form-g"><label>Tipo</label><select id="fpt-tipo">${['Normal','Distócico','Cesárea'].map(t=>`<option ${p&&p.tipo===t?'selected':''}>${t}</option>`).join('')}</select></div>
  <div class="form-g"><label>Peso cria (kg)</label><input type="number" step="0.1" id="fpt-peso" value="${p?p.peso||'':''}" placeholder="3.5"></div>
</div>
<div class="form-g"><label>Observações</label><input id="fpt-obs" value="${p?p.obs||'':''}" placeholder="intercorrências..."></div>
<button class="btn btn-blue" onclick="saveParto()">${p?'Atualizar':'Salvar'}</button>`; }

function saveParto(){
  const data=document.getElementById('fpt-data').value;
  if(!data){ alert('Informe a data.'); return; }
  const qtd=parseInt(document.getElementById('fpt-qtd').value)||1;
  const mae=document.getElementById('fpt-mae').value, pai=document.getElementById('fpt-pai').value, sexo=document.getElementById('fpt-sexo').value, tipo=document.getElementById('fpt-tipo').value, peso=document.getElementById('fpt-peso').value, obs=document.getElementById('fpt-obs').value;
  if(editIdx!==null){
    D.partos[editIdx]={ data, mae, pai, qtd, sexo, tipo, peso, obs };
  } else {
    D.partos.push({ data, mae, pai, qtd, sexo, tipo, peso, obs });
    D.nascimentos.push({ data, qtd, mae, pai });
  }
  save(); closeModal(); renderRepro('parto'); renderDashboard();
}

function renderRepro(tab){
  tab=tab||curReproTab;
  const gest=D.config.gestacao||147;
  if(tab==='cobertura'){
    const el=document.getElementById('repro-cobertura');
    if(!D.coberturas.length){ el.innerHTML='<div class="empty">Nenhuma cobertura registrada.<br>Toque em + para adicionar.</div>'; return; }
    el.innerHTML=D.coberturas.map((c,i)=>`
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <span style="font-weight:600;">${fmtD(c.data)}</span><span class="badge bb">${c.tipo}</span>
        </div>
        <div style="font-size:13px;color:var(--text2);">Fêmea: <b style="color:var(--text)">${c.femea||'-'}</b> × Repr.: <b style="color:var(--text)">${c.macho||'-'}</b></div>
        <div style="font-size:12px;color:var(--text2);margin-top:4px;">Parto previsto: <b style="color:var(--text)">${fmtD(c.prevParto)}</b> (${gest}dias)</div>
        ${c.obs?`<div style="font-size:12px;color:var(--text3);margin-top:3px;">${c.obs}</div>`:''}
        <div style="margin-top:10px;text-align:right;"><button class="btn btn-outline btn-sm" onclick="fCobertura(${i});showModal(fCobertura(${i}))">Editar</button> <button class="btn btn-outline btn-sm" onclick="del('coberturas',${i})">Remover</button></div>
      </div>`).join('');
  } else if(tab==='prenhez'){
    const el=document.getElementById('repro-prenhez');
    if(!D.prenheces.length){ el.innerHTML='<div class="empty">Nenhum diagnóstico registrado.<br>Toque em + para adicionar.</div>'; return; }
    el.innerHTML=D.prenheces.map((p,i)=>`
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <span style="font-weight:600;">${p.femea||'-'}</span>
          <span class="badge ${p.resultado==='positivo'?'bg':p.resultado==='negativo'?'br':'ba'}">${p.resultado}</span>
        </div>
        <div style="font-size:13px;color:var(--text2);">Diagnóstico: <b style="color:var(--text)">${fmtD(p.data)}</b> via ${p.metodo}</div>
        ${p.crias?`<div style="font-size:12px;color:var(--text2);margin-top:3px;">Crias previstas: <b style="color:var(--text)">${p.crias}</b></div>`:''}
        ${p.prevParto?`<div style="font-size:12px;color:var(--text2);margin-top:3px;">Parto previsto: <b style="color:var(--text)">${fmtD(p.prevParto)}</b></div>`:''}
        <div style="margin-top:10px;text-align:right;"><button class="btn btn-outline btn-sm" onclick="fPrenhez(${i});showModal(fPrenhez(${i}))">Editar</button> <button class="btn btn-outline btn-sm" onclick="del('prenheces',${i})">Remover</button></div>
      </div>`).join('');
  } else {
    const el=document.getElementById('repro-parto');
    if(!D.partos.length){ el.innerHTML='<div class="empty">Nenhum parto registrado.<br>Toque em + para adicionar.</div>'; return; }
    el.innerHTML=D.partos.map((p,i)=>`
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <span style="font-weight:600;">${fmtD(p.data)}</span><span class="badge ${p.tipo==='Normal'?'bg':'ba'}">${p.tipo}</span>
        </div>
        <div style="font-size:13px;color:var(--text2);">Mãe: <b style="color:var(--text)">${p.mae||'-'}</b> / Pai: <b style="color:var(--text)">${p.pai||'-'}</b></div>
        <div style="font-size:13px;color:var(--text2);margin-top:3px;"><b style="color:var(--text)">${p.qtd}</b> cria(s) — ${p.sexo}${p.peso?' — '+p.peso+'kg':''}</div>
        ${p.obs?`<div style="font-size:12px;color:var(--text3);margin-top:3px;">${p.obs}</div>`:''}
        <div style="margin-top:10px;text-align:right;"><button class="btn btn-outline btn-sm" onclick="fParto(${i});showModal(fParto(${i}))">Editar</button> <button class="btn btn-outline btn-sm" onclick="del('partos',${i})">Remover</button></div>
      </div>`).join('');
  }
}
