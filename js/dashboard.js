function renderDashboard(){
  const ativos=D.animais.filter(a=>a.status!=='morto').length;
  const totalMortos=D.mortes.length;
  const totalGeral=ativos+totalMortos;
  const taxaMorte=totalGeral>0?Math.round((totalMortos/totalGeral)*100):0;
  const totalNasc=D.nascimentos.reduce((s,n)=>s+n.qtd,0);
  const prenhezes=D.prenheces.filter(p=>p.resultado==='positivo').length;
  const entradas=D.financeiro.filter(f=>f.entrada).reduce((s,f)=>s+f.valor,0);
  const saidas=D.financeiro.filter(f=>!f.entrada).reduce((s,f)=>s+f.valor,0);
  const saldo=entradas-saidas;
  const hoje=new Date(); hoje.setHours(0,0,0,0);
  const vacAtras=D.vacinas.filter(v=>v.prox&&new Date(v.prox+'T00:00:00')<hoje).length;

  document.getElementById('dash-metrics').innerHTML=`
    <div class="metric"><div class="m-lbl">Animais ativos</div><div class="m-val">${ativos}</div></div>
    <div class="metric"><div class="m-lbl">Nascimentos</div><div class="m-val">${totalNasc}</div></div>
    <div class="metric"><div class="m-lbl">Prenhes</div><div class="m-val">${prenhezes}</div></div>
    <div class="metric"><div class="m-lbl">Vacinas atrasadas</div><div class="m-val" style="${vacAtras>0?'color:var(--red)':''}">${vacAtras}</div></div>
    <div class="metric"><div class="m-lbl">Mortes total</div><div class="m-val" style="${totalMortos>0?'color:var(--red)':''}">${totalMortos}</div><div class="m-sub">Taxa: ${taxaMorte}%</div></div>
    <div class="metric"><div class="m-lbl">Saldo</div><div class="m-val ${saldo>=0?'pos':'neg'}">${fmtR(saldo)}</div></div>`;

  const ano=hoje.getFullYear();
  document.getElementById('dash-ano').textContent=ano;
  const cnt=new Array(12).fill(0);
  D.nascimentos.forEach(n=>{ if(!n.data)return; const d=new Date(n.data+'T00:00:00'); if(d.getFullYear()===ano) cnt[d.getMonth()]+=n.qtd; });
  const max=Math.max(...cnt,1);
  const mes=['J','F','M','A','M','J','J','A','S','O','N','D'];
  document.getElementById('birth-chart').innerHTML=cnt.map((vv,i)=>`
    <div class="bc"><div class="bv">${vv||''}</div>
    <div class="bar" style="height:${Math.round((vv/max)*82)+3}px;${i===hoje.getMonth()?'background:var(--primary);opacity:1':'opacity:0.6'}"></div>
    <div class="bl">${mes[i]}</div></div>`).join('');

  const alerts=[];
  D.vacinas.forEach(v=>{ if(!v.prox)return; const d=daysUntil(v.prox); if(d<0) alerts.push({t:'r',msg:`Vacina ${v.nome||''} atrasada — ${v.animal||'-'}`}); else if(d<=7) alerts.push({t:'a',msg:`Vacina ${v.nome||''} vence em ${d}d`}); });
  D.prenheces.forEach(p=>{ if(!p.prevParto)return; const d=daysUntil(p.prevParto); if(d>=0&&d<=14) alerts.push({t:'a',msg:`Parto previsto em ${d}d — ${p.femea||'-'}`}); });
  D.coberturas.forEach(c=>{ if(!c.prevParto)return; const d=daysUntil(c.prevParto); if(d>=0&&d<=14) alerts.push({t:'a',msg:`Parto prev. em ${d}d — ${c.femea||'-'}`}); });
  D.verminose.forEach(v=>{ if(!v.prox)return; const d=daysUntil(v.prox); if(d<=0) alerts.push({t:'a',msg:`Avaliar verminose: ${v.animal||'-'}`}); });
  document.getElementById('alerts-list').innerHTML=alerts.length?alerts.slice(0,6).map(a=>`<div class="alert-r"><div class="dot d${a.t}"></div><span style="font-size:13px;">${a.msg}</span></div>`).join(''):'<div class="alert-r"><div class="dot dg"></div><span style="font-size:13px;color:var(--text2)">Sem alertas pendentes</span></div>';

  document.getElementById('fin-resumo').innerHTML=`
    <div style="display:flex;gap:20px;">
      <div><div style="font-size:11px;color:var(--text2)">Entradas</div><div class="pos" style="font-size:15px;">${fmtR(entradas)}</div></div>
      <div><div style="font-size:11px;color:var(--text2)">Saídas</div><div class="neg" style="font-size:15px;">${fmtR(saidas)}</div></div>
      <div><div style="font-size:11px;color:var(--text2)">Saldo</div><div class="${saldo>=0?'pos':'neg'}" style="font-size:15px;">${fmtR(saldo)}</div></div>
    </div>`;
}
