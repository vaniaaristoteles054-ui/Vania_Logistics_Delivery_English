// Programa JavaScript: boas-vindas e cálculo de compra online.
function mostrarBoasVindas() {
  let nome = prompt("Please enter your name:");
  if (nome === null || nome.trim() === "") {
    nome = "Visitor";
  } else {
    nome = nome.trim();
  }

  const agora = new Date();
  const dias = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const meses = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const mensagem = `Hello, ${nome}! Welcome to Vânia Logistics. Today is ${dias[agora.getDay()]}, ${meses[agora.getMonth()]} ${agora.getDate()}, ${agora.getFullYear()}, at ${String(agora.getHours()).padStart(2, "0")}:${String(agora.getMinutes()).padStart(2, "0")}:${String(agora.getSeconds()).padStart(2, "0")}.`;
  const welcome = document.querySelector("#welcomeMessage");
  if (welcome) welcome.textContent = mensagem;
}

function mt(valor) {
  return valor.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " MT";
}

function calcularEncomenda(event) {
  event.preventDefault();

  let quantidadeTotal = 0;
  let subtotal = 0;
  let pesoTotal = 0;
  const linhasRecibo = [];

  for (let i = 1; i <= 4; i++) {
    const nome = document.querySelector(`#produto${i}`).value.trim() || `Produto ${i}`;
    const preco = Number(document.querySelector(`#preco${i}`).value);
    const peso = Number(document.querySelector(`#peso${i}`).value);
    const quantidade = Number(document.querySelector(`#qtd${i}`).value);

    if (![preco, peso, quantidade].every(Number.isFinite) || preco < 0 || peso < 0 || quantidade < 0 || !Number.isInteger(quantidade)) {
      alert("Please check the prices, weights, and quantities. Negative values are not accepted, and quantity must be a whole number.");
      return;
    }

    if (quantidade > 0) {
      const totalProduto = preco * quantidade;
      subtotal += totalProduto;
      quantidadeTotal += quantidade;
      pesoTotal += peso * quantidade;
      linhasRecibo.push({ nome, quantidade, totalProduto });
    }
  }

  if (quantidadeTotal === 0) {
    alert("Enter at least one product unit to calculate the order.");
    return;
  }

  // The 10% discount applies when the total quantity is greater than 30.
  let taxaDesconto = 0;
  if (quantidadeTotal > 30) taxaDesconto = 0.10;
  else if (quantidadeTotal > 15) taxaDesconto = 0.05;

  const desconto = subtotal * taxaDesconto;
  const subtotalComDesconto = subtotal - desconto;
  const custoPeso = pesoTotal * 250;
  const taxaContinente = Number(document.querySelector("#continente").value);
  const total = subtotalComDesconto + custoPeso + taxaContinente;

  const recibo = document.querySelector("#receipt");
  recibo.innerHTML = `
    <div class="receipt-head"><span>VL / RECEIPT</span><span>SIMULATION</span></div>
    <h3>Order Summary</h3>
    <div class="receipt-lines">
      ${linhasRecibo.map(item => `<div class="receipt-line"><span>${escaparHTML(item.nome)} × ${item.quantidade}</span><span>${mt(item.totalProduto)}</span></div>`).join("")}
    </div>
    <div class="receipt-line"><span>Total Quantity</span><span>${quantidadeTotal} unit(s)</span></div>
    <div class="receipt-line"><span>Products Subtotal</span><span>${mt(subtotal)}</span></div>
    <div class="receipt-line"><span>Discount (${(taxaDesconto * 100).toFixed(0)}%)</span><span>− ${mt(desconto)}</span></div>
    <div class="receipt-line"><span>Total Weight</span><span>${pesoTotal.toLocaleString("en-US", {maximumFractionDigits: 2})} kg</span></div>
    <div class="receipt-line"><span>Weight-based shipping (250 MT/kg)</span><span>${mt(custoPeso)}</span></div>
    <div class="receipt-line"><span>Continent Fee</span><span>${mt(taxaContinente)}</span></div>
    <div class="receipt-total"><span>TOTAL TO PAY</span><strong>${mt(total)}</strong></div>
    <p class="receipt-small">Academic estimate. Weight-based shipping is calculated using the total weight of all units.</p>`;
}

function escaparHTML(texto) {
  return texto.replace(/[&<>"']/g, caracter => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[caracter]));
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarBoasVindas();
  const form = document.querySelector("#orderForm");
  if (form) {
    form.addEventListener("submit", calcularEncomenda);
    form.addEventListener("reset", () => {
      const recibo = document.querySelector("#receipt");
      if (recibo) {
        setTimeout(() => {
          recibo.innerHTML = '<div class="receipt-head"><span>VL / RECEIPT</span><span>SIMULATION</span></div><h3>Order Summary</h3><p>Fill in the details and select “Calculate Order Total”.</p>';
        }, 0);
      }
    });
  }
});
