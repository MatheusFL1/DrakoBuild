async function carregarGpus() {
    try {
        const response = await axios.get('http://localhost:5000/videocard');
        const gpus = response.data;

        const container = document.getElementById('gpusArmazenadas');
        container.innerHTML = ''; 

        gpus.forEach(gpu => {
            const div = document.createElement('div');
            div.classList.add('gpu-item');
            div.innerHTML = `
                <strong>Categoria:</strong> ${gpu.categoria} <br>
                <strong>Placa de Vídeo:</strong> ${gpu.placaVideo} <br>
                <strong>Fonte:</strong> ${gpu.fonte} <br>
                <button onclick="preencherFormularioGpu('${gpu._id}')">Alterar</button>
                <button class="btn-excluir" onclick="excluirGpu('${gpu._id}')">Excluir</button>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Erro ao carregar GPUs:', error);
    }
}

async function modificarGpu(event) {
    event.preventDefault();

    const id = document.getElementById('idGpu').value;
    const data = {
        categoria: document.getElementById('categoriaEditar').value,
        placaVideo: document.getElementById('placaEditar').value,
        fonte: document.getElementById('fonteEditar').value,
    };

    try {
        if (id) {
            await axios.put(`http://localhost:5000/videocard/${id}`, data);
            alert('Configuração de GPU alterada com sucesso!');
        } else {
            await axios.post('http://localhost:5000/videocard', data);
            alert('Configuração de GPU criada com sucesso!');
        }

        carregarGpus();
        limparFormularioGpu();
    } catch (error) {
        console.error('Erro ao salvar GPU:', error);
        alert('Erro ao salvar GPU!');
    }
}

function preencherFormularioGpu(id) {
    axios.get(`http://localhost:5000/videocard/${id}`)
        .then(response => {
            const gpu = response.data;
            document.getElementById('idGpu').value = gpu._id;
            document.getElementById('categoriaEditar').value = gpu.categoria;
            document.getElementById('placaEditar').value = gpu.placaVideo;
            document.getElementById('fonteEditar').value = gpu.fonte;
        })
        .catch(error => console.error('Erro ao carregar GPU:', error));
}

async function excluirGpu(id) {
    try {
        await axios.delete(`http://localhost:5000/videocard/${id}`);
        alert('Configuração de GPU excluída com sucesso!');
        carregarGpus();
    } catch (error) {
        console.error('Erro ao excluir GPU:', error);
        alert('Erro ao excluir GPU!');
    }
}

function limparFormularioGpu() {
    document.getElementById('idGpu').value = '';
    document.getElementById('categoriaEditar').value = '';
    document.getElementById('placaEditar').value = '';
    document.getElementById('fonteEditar').value = '';
}

function goBackToStart() {
      window.location.href = "admin.html";
  }
carregarGpus();
