function fFinanceiro(idx){
  const f=idx!==null?D.financeiro[idx]:null;
  editIdx=idx; editType='financeiro';
  return `
<div class="modal-hd"><div class="modal-title">${f?'Editar':'Novo'} lançamento</div><button class="modal-close" onclick="closeModal()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
<div class="form-g"><label>Data *</label><input type="date" id="ff-data" value="${f?f.data:td()}"></div>
<div class="form-g"><label>Tipo</label>
  <select id="ff-tipo">${[['venda','Venda de animal'],['compra','Compra de animal'],['insumo','Compra de insumo'],['servico','Serviço veterinário'],['outro_entrada','Outra entrada'],['outro_saida','Outra saída']].map(([v,l])=>`<option value="${v}" ${f&&f.tipo===v?'selected':''}>${l}</option>`).join('')}</select>
</div>
<div class="form-g"><label>Descrição</label><input id="ff-desc" value="${f?f.desc||'':''}" placeholder="ex: Venda 2 borregos"></div>
<div class="row2">
  <div class="form-g"><label>Valor (R$) *</label><input type="number" step="0.01" id="ff-val" value="${f?f.valor||'':''}" placeholder="0,00"></div>
  <div class="form-g"><label>Animal (brinco)</label><input id="ff-an" value="${f?f.animal||'':''}" placeholder="opcional"></div>
</div>
<div class="row2">
  <div class="form-g"><label>Qtd / Peso</label><input id="ff-qtd" value="${f?f.qtd||'':''}" placeholder="ex: 2 animais"></div>
  <div class="form-g"><label>Comprador / Vendedor</label><input id="ff-parte" value="${f?f.parte||'':''}" placeholder="nome"></div>
</div>
<div class="form-g"><label>Observações</label><input id="ff-obs" value="${f?f.obs||'':''}" placeholder="opcional"></div>
<button class="btn btn-blue" onclick="saveFinanceiro()">${f?'Atualizar':'Salvar'} lançamento</button>`; }

function saveFinanceiro(){
  const data=document.getElementById('ff-data').value, val=parseFloat(document.getElementById('ff-val').value);
  if(!data||isNaN(val)){ alert('Informe data e valor.'); return; }
  const tipo=document.getElementById('ff-tipo').value;
  const obj={ data, tipo, desc:document.getElementById('ff-desc').value, valor:val, animal:document.getElementById('ff-an').value, qtd:document.getElementById('ff-qtd').value, parte:document.getElementById('ff-parte').value, obs:document.getElementById('ff-obs').value, entrada:['venda','outro_entrada'].includes(tipo) };
  if(editIdx!==null) D.financeiro[editIdx]=obj; else D.financeiro.push(obj);
  save(); closeModal(); renderFin(); renderDashboard();
}

function tipoBadge(t){ return ['venda','outro_entrada'].includes(t)?'<span class="badge bg">Entrada</span>':'<span class="badge br">Saída</span>'; }

function renderFin(){
  const el=document.getElementById('fin-list');
  const em=document.getElementById('fin-empty');
  const ini=document.getElementById('fin-filtro-ini').value;
  const fim=document.getElementById('fin-filtro-fim').value;
  let lista=D.financeiro;
  if(ini) lista=lista.filter(f=>f.data>=ini);
  if(fim) lista=lista.filter(f=>f.data<=fim);
  if(!lista.length){ el.innerHTML=''; em.style.display='block'; em.innerHTML=ini||fim?'Nenhum lançamento no período.':'Nenhum lançamento registrado.<br>Toque em + para adicionar.'; return; }
  em.style.display='none';
  const totalEnt=lista.filter(f=>f.entrada).reduce((s,f)=>s+f.valor,0);
  const totalSai=lista.filter(f=>!f.entrada).reduce((s,f)=>s+f.valor,0);
  el.innerHTML=`
    <div class="card" style="background:var(--bg2);">
      <div style="display:flex;gap:16px;font-size:13px;">
        <span>Entradas: <b class="pos">${fmtR(totalEnt)}</b></span>
        <span>Saídas: <b class="neg">${fmtR(totalSai)}</b></span>
        <span>Saldo: <b class="${(totalEnt-totalSai)>=0?'pos':'neg'}">${fmtR(totalEnt-totalSai)}</b></span>
      </div>
    </div>`+
  [...lista].sort((a,b)=>b.data.localeCompare(a.data)).map((f,i)=>{
    const realIdx=D.financeiro.indexOf(f);
    return `
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;">
        <div>
          <div style="font-weight:600;font-size:14px;">${f.desc||f.tipo}</div>
          <div style="font-size:12px;color:var(--text2);margin-top:2px;">${fmtD(f.data)}${f.parte?' — '+f.parte:''}</div>
          ${f.animal?`<div style="font-size:12px;color:var(--text2);">Animal: ${f.animal}</div>`:''}
        </div>
        <div style="text-align:right;flex-shrink:0;">
          ${tipoBadge(f.tipo)}
          <div style="font-size:16px;font-weight:700;margin-top:4px;" class="${f.entrada?'pos':'neg'}">${f.entrada?'+':'-'}${fmtR(f.valor)}</div>
        </div>
      </div>
      <div style="margin-top:10px;text-align:right;"><button class="btn btn-outline btn-sm" onclick="fFinanceiro(${realIdx});showModal(fFinanceiro(${realIdx}))">Editar</button> <button class="btn btn-outline btn-sm" onclick="del('financeiro',${realIdx})">Remover</button></div>
    </div>`}).join('');
}
