document.addEventListener('DOMContentLoaded', async function () {

    const kit = localStorage.getItem('kit');
    const placavideo = localStorage.getItem('placavideo');

    if (!kit || !placavideo) {
        alert('Configuração não encontrada. Retorne à etapa anterior.');
        window.location.href = 'parte2.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/configuracoes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ kit, placavideo }),
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar as configurações.');
        }

        const data = await response.json();

        const configArray = [
            { item: 'PROCESSADOR', value: data.cpu.processador },
            { item: 'PLACA MAE', value: data.cpu.placaMae },
            { item: 'MEMORIA', value: data.cpu.memoria },
            { item: 'REFRIGERACAO', value: data.cpu.cooler },
            { item: 'PLACA DE VIDEO', value: data.gpu.placaVideo },
            { item: 'FONTE', value: data.gpu.fonte }
        ];

        localStorage.setItem('configArray', JSON.stringify(configArray));

        document.querySelector('.image-container').innerHTML = `
            <div class="item">
                <img src="images/cpu.png" alt="CPU" class="item-image">
                <p class="item-name">PROCESSADOR:</p>
                <p class="item-info">${data.cpu.processador}</p>
            </div>
            <div class="item">
                <img src="images/mobo.png" alt="Placa Mãe" class="item-image">
                <p class="item-name">PLACA MAE:</p>
                <p class="item-info">${data.cpu.placaMae}</p>
            </div>
            <div class="item">
                <img src="images/mem.png" alt="Memória" class="item-image">
                <p class="item-name">MEMORIA:</p>
                <p class="item-info">${data.cpu.memoria}</p>
            </div>
            <div class="item">
                <img src="images/wc.png" alt="WaterCooler" class="item-image">
                <p class="item-name">REFRIGERACAO:</p>
                <p class="item-info">${data.cpu.cooler}</p>
            </div>
             <div class="item">
                <img src="images/gpu.png" alt="Placa de Vídeo" class="item-image">
                <p class="item-name">PLACA DE VIDEO:</p>
                <p class="item-info">${data.gpu.placaVideo}</p>
            </div>
            <div class="item">
                <img src="images/psu.png" alt="Fonte" class="item-image">
                <p class="item-name">FONTE:</p>
                <p class="item-info">${data.gpu.fonte}</p>
            </div>
        `;
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao carregar as configurações.');
    }
});

function goToNextPage() {
    window.location.href = "parte4.html";
}
