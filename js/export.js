function showExportModal(){
  showModal(`
<div class="modal-hd"><div class="modal-title">Exportar para Excel</div><button class="modal-close" onclick="closeModal()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
<p style="font-size:13px;color:var(--text2);margin-bottom:16px;">Escolha o que deseja exportar. Cada módulo vira uma aba separada no arquivo .xlsx.</p>
<div class="export-grid">
  <button class="btn btn-green" onclick="exportSheet('animais')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px;"><path d="M16 3a4 4 0 0 0-8 0v5a4 4 0 0 0 8 0V3z"/><path d="M4 16a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1z"/></svg> Plantel</button>
  <button class="btn btn-green" onclick="exportSheet('nascimentos')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px;"><circle cx="12" cy="12" r="10"/><path d="M12 6v6"/><path d="M12 12l4 4"/></svg> Nascimentos</button>
  <button class="btn btn-green" onclick="exportSheet('partos')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px;"><path d="M12 3c.5 2.5 2.5 4 5 4 1.5 0 3-1 3-2 0-1.5-2-3-3-4-1.5 0-3.5 1-5 2z"/><path d="M7 21c0-2.5 2-5 5-5s5 2.5 5 5"/><path d="M12 16V3"/></svg> Partos</button>
  <button class="btn btn-green" onclick="exportSheet('coberturas')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px;"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> Coberturas</button>
  <button class="btn btn-green" onclick="exportSheet('prenheces')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Prenhez</button>
  <button class="btn btn-green" onclick="exportSheet('vacinas')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px;"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> Vacinas</button>
  <button class="btn btn-green" onclick="exportSheet('verminose')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px;"><path d="M12 22s-4-5-4-9a4 4 0 0 1 8 0c0 4-4 9-4 9z"/><circle cx="12" cy="9" r="1.5"/></svg> Verminose</button>
  <button class="btn btn-green" onclick="exportSheet('mortes')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg> Mortes</button>
  <button class="btn btn-green" onclick="exportSheet('financeiro')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px;"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> Financeiro</button>
</div>
<div style="margin-top:12px;">
  <button class="btn btn-blue" onclick="exportAll()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px;"><polyline points="21 16 21 21 3 21 3 16"/><polyline points="16 10 12 14 8 10"/><line x1="12" y1="14" x2="12" y2="3"/></svg> Exportar tudo (todas as abas)</button>
</div>
<div style="margin-top:12px;padding-top:12px;border-top:0.5px solid var(--border);">
  <button class="btn btn-outline" onclick="closeModal();showConfigModal()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px;"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg> Configurações e Backup</button>
</div>`);
}

const HEADERS = {
  animais:    ['Brinco','Nome','Sexo','Raça','Nascimento','Peso(kg)','Pai','Mãe','Origem','Status'],
  nascimentos:['Data','Qtd','Mãe','Pai'],
  partos:     ['Data','Mãe','Pai','Qtd','Sexo','Tipo','Peso(kg)','Obs'],
  coberturas: ['Data','Fêmea','Reprodutor','Tipo','Parto Previsto','Obs'],
  prenheces:  ['Data','Fêmea','Resultado','Método','Crias','Parto Previsto','Obs'],
  vacinas:    ['Data','Animal','Vacina','Dose','Via','Próxima Dose','Responsável','Obs'],
  verminose:  ['Data','Animal','FAMACHA','Vermífugo','Dose','Peso(kg)','Próx. Avaliação'],
  mortes:     ['Data','Animal','Pai','Mãe','Causa','Obs'],
  financeiro: ['Data','Tipo','Descrição','Valor(R$)','Animal','Qtd/Peso','Parte','Obs','Entrada/Saída'],
};

function toRows(key){
  const rows=[HEADERS[key]];
  D[key].forEach(r=>{
    if(key==='animais')      rows.push([r.id,r.nome,r.sexo,r.raca,r.nasc,r.peso,r.pai,r.mae,r.origem,r.status]);
    else if(key==='nascimentos') rows.push([r.data,r.qtd,r.mae,r.pai]);
    else if(key==='partos')  rows.push([r.data,r.mae,r.pai,r.qtd,r.sexo,r.tipo,r.peso,r.obs]);
    else if(key==='coberturas') rows.push([r.data,r.femea,r.macho,r.tipo,r.prevParto,r.obs]);
    else if(key==='prenheces') rows.push([r.data,r.femea,r.resultado,r.metodo,r.crias,r.prevParto,r.obs]);
    else if(key==='vacinas') rows.push([r.data,r.animal,r.nome,r.dose,r.via,r.prox,r.resp,r.obs]);
    else if(key==='verminose') rows.push([r.data,r.animal,r.famacha,r.med,r.dose,r.peso,r.prox]);
    else if(key==='mortes')  rows.push([r.data,r.id,r.pai,r.mae,r.causa,r.obs]);
    else if(key==='financeiro') rows.push([r.data,r.tipo,r.desc,r.valor,r.animal,r.qtd,r.parte,r.obs,r.entrada?'Entrada':'Saída']);
  });
  return rows;
}

function exportSheet(key){
  const wb=XLSX.utils.book_new();
  const ws=XLSX.utils.aoa_to_sheet(toRows(key));
  XLSX.utils.book_append_sheet(wb,ws,key);
  XLSX.writeFile(wb,`criadouro_${key}_${td()}.xlsx`);
}

function exportAll(){
  const wb=XLSX.utils.book_new();
  Object.keys(HEADERS).forEach(key=>{
    const ws=XLSX.utils.aoa_to_sheet(toRows(key));
    XLSX.utils.book_append_sheet(wb,ws,key);
  });
  XLSX.writeFile(wb,`criadouro_completo_${td()}.xlsx`);
}
