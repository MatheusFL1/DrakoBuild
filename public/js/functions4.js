const configArray = JSON.parse(localStorage.getItem('configArray'));

document.addEventListener('DOMContentLoaded', async () => {
  if (!configArray) {
    console.error('Erro ao buscar config Array do localStorage.');
    return;
  }

  const loadingElement = document.getElementById('loading');
  const contentElement = document.querySelector('.content');
  const buttonContainer = document.querySelector('.button-container');

  async function fetchScrapedProducts(configArray) {
    try {
      loadingElement.style.display = 'block'; 
      contentElement.classList.add('hidden'); 
      buttonContainer.classList.add('hidden'); 

      const response = await fetch('http://localhost:5000/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ configArray })
      });

      if (!response.ok) {
        throw new Error('Erro ao realizar o scraping.');
      }

      const produtosEncontrados = await response.json();
      console.log('Produtos encontrados:', produtosEncontrados);
      updateTable(produtosEncontrados);
      updateTotal(produtosEncontrados);
    } catch (error) {
      console.error('Erro ao realizar o scraping:', error);
    } finally {
      loadingElement.style.display = 'none'; 
      contentElement.classList.remove('hidden'); 
      buttonContainer.classList.remove('hidden');
    }
  }

  await fetchScrapedProducts(configArray);
});

function updateTable(produtosEncontrados) {
  const tableBody = document.querySelector('#promoTable tbody');
  tableBody.innerHTML = '';

  produtosEncontrados.forEach(produto => {
    const row = document.createElement('tr');

    const pieceCell = document.createElement('td');
    pieceCell.textContent = produto.titulo;
    row.appendChild(pieceCell);

    const priceCell = document.createElement('td');
    priceCell.textContent = produto.preco ? `R$ ${produto.preco.toFixed(2)}` : 'N/A';
    row.appendChild(priceCell);

    const linkCell = document.createElement('td');
    const link = document.createElement('a');
    link.href = produto.link;
    link.target = '_blank';
    link.textContent = produto.link ? "Ver oferta" : "Não disponível";
    linkCell.appendChild(link);
    row.appendChild(linkCell);

    tableBody.appendChild(row);
  });
}

function updateTotal(produtosEncontrados) {
  const total = produtosEncontrados.reduce((acc, produto) => acc + (produto.preco || 0), 0);
  const totalFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(total);

  const totalElement = document.querySelector('#total');
  totalElement.textContent = `Total: ${totalFormatado}`;
}

function goBackToStart() {
  if (!document.getElementById('nextButton').disabled) {
    window.location.href = "index.html"; 
  }
}
