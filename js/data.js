const D = {
  animais:[], nascimentos:[], mortes:[], vacinas:[],
  verminose:[], coberturas:[], prenheces:[], partos:[], financeiro:[],
  lotes:[],
  config:{ gestacao:147 }
};
let curSec='painel', curReproTab='cobertura', curSaudeTab='vacina';
let editIdx=null, editType=null;

function save(){ try{ localStorage.setItem('criadouro_v4', JSON.stringify(D)); }catch(e){} }
function load(){
  try{
    const raw = localStorage.getItem('criadouro_v4')||localStorage.getItem('criadouro_v3');
    if(raw){ const p=JSON.parse(raw); Object.keys(p).forEach(k=>{ if(D[k]!==undefined) D[k]=p[k]; }); }
    if(!D.config) D.config={ gestacao:147 };
    if(D.config.notificacoes===undefined) D.config.notificacoes=false;
    if(!D.lotes) D.lotes=[];
  }catch(e){}
}

const td = () => new Date().toISOString().split('T')[0];
function fmtD(d){ if(!d) return '-'; const[y,m,dd]=d.split('-'); return `${dd}/${m}/${y}`; }
function fmtR(v){ return 'R$ '+parseFloat(v||0).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2}); }
function addDays(dateStr, days){
  const d=new Date(dateStr+'T00:00:00'); d.setDate(d.getDate()+days);
  return d.toISOString().split('T')[0];
}
function daysUntil(dateStr){
  const h=new Date(); h.setHours(0,0,0,0);
  return Math.ceil((new Date(dateStr+'T00:00:00')-h)/86400000);
}
