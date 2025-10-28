// Cambiá esto por tu Web App URL (del Deploy)
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwrtYvNLPMik8ZLwud8rWL78t2Yvnq88s-sAEKppUAn7PGtnaVle5NAWFqAiaJtMt7hPQ/exec";

document.addEventListener('DOMContentLoaded', function(){
  // fecha por defecto hoy
  const today = new Date().toISOString().substr(0,10);
  document.getElementById('fecha').value = today;

  document.getElementById('btnCrear').addEventListener('click', crearOperativo);
});

async function crearOperativo() {
  const tipo = document.getElementById('tipo').value;
  const fecha = document.getElementById('fecha').value;
  const resultEl = document.getElementById('result');
  resultEl.innerText = '';

  if (!tipo) { resultEl.innerText = 'Seleccioná el tipo de operativo.'; return; }
  resultEl.innerText = 'Creando operativo...';

  try {
    const resp = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo: tipo, fecha: fecha })
    });
    const data = await resp.json();
    if (data.success) {
      resultEl.innerHTML = `✅ <strong>${escapeHtml(data.name)}</strong><br>
        <a class="link" href="${data.url}" target="_blank">Abrir planilla</a>`;
    } else {
      resultEl.innerText = 'Error: ' + (data.error || JSON.stringify(data));
    }
  } catch (err) {
    resultEl.innerText = 'Fallo de conexión: ' + err.message;
  }
}

// util
function escapeHtml(s){ if(!s) return ''; return s.replace(/[&<>"'`=\/]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#x60;','=':'&#x3D;'}[c];}); }

