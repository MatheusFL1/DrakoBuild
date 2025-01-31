async function carregarConfiguracoes() {
    try {
        const response = await axios.get('http://localhost:5000/api/configuracao');
        const configuracoes = response.data;
        const configuracoesArmazenadas = document.getElementById('configuracoesArmazenadas');
        configuracoesArmazenadas.innerHTML = '';

        configuracoes.forEach(config => {
            const div = document.createElement('div');
            div.classList.add('config-item');
            div.innerHTML = `
                <strong>Categoria:</strong> ${config.categoria} <br>
                <strong>Processador:</strong> ${config.processador} <br>
                <strong>Placa Mãe:</strong> ${config.placaMae} <br>
                <strong>Memória:</strong> ${config.memoria}<br>
                <strong>Cooler:</strong> ${config.cooler}<br>
                <button onclick="preencherFormulario('${config._id}')">Alterar</button>
                <button class="btn-excluir" onclick="excluirConfiguracao('${config._id}')">Excluir</button>
            `;
            configuracoesArmazenadas.appendChild(div);
        });
    } catch (error) {
        console.error('Erro ao carregar configurações:', error);
    }
}

async function preencherFormulario(id) {
    try {
        const response = await axios.get(`http://localhost:5000/api/configuracao/${id}`);
        const config = response.data;

        document.getElementById('id').value = config._id;
        document.getElementById('categoriaEditar').value = config.categoria;
        document.getElementById('processadorEditar').value = config.processador;
        document.getElementById('placaMaeEditar').value = config.placaMae;
        document.getElementById('memoriaEditar').value = config.memoria;
        document.getElementById('coolerEditar').value = config.cooler;
    } catch (error) {
        console.error('Erro ao carregar dados para alteração:', error);
    }
}

async function modificarConfig(event) {
    event.preventDefault(); 

    const id = document.getElementById('id').value;
    const categoria = document.getElementById('categoriaEditar').value;
    const processador = document.getElementById('processadorEditar').value;
    const placaMae = document.getElementById('placaMaeEditar').value;
    const memoria = document.getElementById('memoriaEditar').value;
    const cooler = document.getElementById('coolerEditar').value;
 

    const data = {
        categoria,
        processador,
        placaMae,
        memoria,
        cooler
    };

    try {
        if (id) {
            await axios.put(`http://localhost:5000/api/configuracao/${id}`, data);
            alert('Configuração alterada com sucesso');
        } else {
            await axios.post('http://localhost:5000/api/configuracao', data);
            alert('Configuração criada com sucesso');
        }
        carregarConfiguracoes(); 
        limparFormulario();
    } catch (error) {
        console.error('Erro ao modificar configuração:', error);
        alert('Erro ao modificar configuração');
    }
}

async function excluirConfiguracao(id) {
    try {
        await axios.delete(`http://localhost:5000/api/configuracao/${id}`);
        alert('Configuração excluída com sucesso');
        carregarConfiguracoes(); 
    } catch (error) {
        console.error('Erro ao excluir configuração:', error);
        alert('Erro ao excluir configuração');
    }
}

function limparFormulario() {
    document.getElementById('id').value = '';
    document.getElementById('categoriaEditar').value = '';
    document.getElementById('processadorEditar').value = '';
    document.getElementById('placaMaeEditar').value = '';
    document.getElementById('memoriaEditar').value = '';
    document.getElementById('coolerEditar').value = '';
}

function goBackToStart() {
    window.location.href = "admin.html";
}

carregarConfiguracoes();
