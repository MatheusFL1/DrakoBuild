const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const listaDeProdutos = [
    'RTX 4070'
  ];

  const produtosEncontrados = [];

  for (const nomeProduto of listaDeProdutos) {
    console.log(`Buscando por: ${nomeProduto}`);

    const url = `https://www.kabum.com.br/busca/${encodeURIComponent(nomeProduto)}`;
    await page.goto(url);
    await page.waitForSelector('.sc-27518a44-4'); 

    const produtos = await page.evaluate(() => {
      const itens = Array.from(document.querySelectorAll('.sc-27518a44-4.kVoakD')); 

      return itens.map(item => {
        const linkElement = item.closest('a'); 
        const link = linkElement ? `https://www.kabum.com.br${linkElement.getAttribute('href')}` : 'Link não disponível';

        const tituloElement = item.querySelector('.sc-d79c9c3f-0.nlmfp');
        const precoElement = item.querySelector('.sc-57f0fd6e-2.hjJfoh.priceCard');
        const imagemElement = item.querySelector('img.imageCard');

        const titulo = tituloElement ? tituloElement.innerText.trim() : 'Título não disponível';
        const preco = precoElement ? precoElement.innerText.trim().replace('R$', '').replace('.', '').replace(',', '.') : 'Preço não disponível';
        const imagem = imagemElement ? imagemElement.src : 'Imagem não disponível';

        return {
          titulo,
          preco: parseFloat(preco), 
          imagem,
          link
        };
      });
    });

    if (produtos.length === 0) {
      console.log('Nenhum produto encontrado na página.');
      continue;
    }

    let produtosFiltrados = produtos.filter(produto =>
      produto.titulo.toLowerCase().includes(nomeProduto.toLowerCase())
    );

    if (produtosFiltrados.length === 0) {
      const nomeProdutoParcial = nomeProduto.split(' ')[0]; 
      console.log(`Tentando busca parcial por: ${nomeProdutoParcial}`);
      produtosFiltrados = produtos.filter(produto =>
        produto.titulo.toLowerCase().includes(nomeProdutoParcial.toLowerCase())
      );
    }

    const produtoMaisBarato = produtosFiltrados.reduce((prev, curr) => {
      return prev.preco < curr.preco ? prev : curr;
    }, { preco: Infinity });

    if (produtoMaisBarato.preco === Infinity) {
      console.log('Nenhum produto correspondente encontrado para:', nomeProduto);
    } else {
      produtosEncontrados.push(produtoMaisBarato);
      console.log('Produto mais barato para', nomeProduto, ':', produtoMaisBarato);
    }
  }

  const total = produtosEncontrados.reduce((acc, produto) => acc + produto.preco, 0);

  const totalFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(total);

  console.log('Total dos preços dos componentes:', totalFormatado);

  await browser.close();
})();
