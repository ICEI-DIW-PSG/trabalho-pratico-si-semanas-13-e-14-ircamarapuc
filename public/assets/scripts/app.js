// Define a URL base da nossa API (o JSON Server)
const API_URL = 'http://localhost:3000/pontos';

/*
|--------------------------------------------------------------------------
| FUNÇÕES DE COMUNICAÇÃO COM A API (CRUD)
|--------------------------------------------------------------------------
*/

// GET (Read): Busca todos os pontos turísticos
const getPontos = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Erro ao buscar dados da API.');
        return await response.json();
    } catch (error) {
        console.error("Falha ao buscar pontos:", error);
        return [];
    }
};

// GET (Read): Busca um ponto turístico específico pelo ID
const getPonto = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Ponto turístico não encontrado.');
        return await response.json();
    } catch (error) {
        console.error("Falha ao buscar ponto:", error);
        return null;
    }
};

// POST (Create) / PUT (Update): Salva (cria ou atualiza) um ponto
const salvarPonto = async (ponto) => {
    const method = ponto.id ? 'PUT' : 'POST';
    const url = ponto.id ? `${API_URL}/${id}` : API_URL;

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ponto)
        });
        if (!response.ok) throw new Error('Erro ao salvar os dados.');
        return await response.json();
    } catch (error) {
        console.error("Falha ao salvar ponto:", error);
    }
};

// DELETE (Delete): Exclui um ponto turístico pelo ID
const excluirPonto = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Erro ao excluir o ponto.');
    } catch (error) {
        console.error("Falha ao excluir ponto:", error);
    }
};

/*
|--------------------------------------------------------------------------
| FUNÇÕES DE RENDERIZAÇÃO E DOM (O que o usuário vê)
|--------------------------------------------------------------------------
*/

// Carrega os cards na página inicial (index.html)
const carregarCards = async () => {
    const container = document.getElementById('cards-container');
    if (!container) return;

    const pontos = await getPontos();
    container.innerHTML = '';
    pontos.forEach(ponto => {
        container.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4 mb-4">
                <div class="card h-100 shadow-sm">
                    <img src="${ponto.imagem_principal}" class="card-img-top" alt="${ponto.titulo}" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${ponto.titulo}</h5>
                        <p class="card-text">${ponto.descricao}</p>
                        <a href="detalhe.html?id=${ponto.id}" class="btn btn-primary mt-auto">Ver Detalhes</a>
                    </div>
                </div>
            </div>`;
    });
};

// Carrega as informações na página de detalhes (detalhe.html)
const carregarPaginaDetalhe = async (id) => {
    const ponto = await getPonto(id);
    if (!ponto) {
        document.getElementById('detalhe-container').innerHTML = "<p>Ponto turístico não encontrado.</p>";
        return;
    }

    document.getElementById('detalhe-titulo').textContent = ponto.titulo;
    document.getElementById('detalhe-imagem-principal').src = ponto.imagem_principal;
    document.getElementById('detalhe-conteudo').textContent = ponto.conteudo;

    const detalhesLista = document.getElementById('detalhe-lista');
    detalhesLista.innerHTML = '';
    for (const [chave, valor] of Object.entries(ponto.outros_detalhes)) {
        detalhesLista.innerHTML += `<li class="list-group-item"><strong>${chave}:</strong> ${valor}</li>`;
    }

    const atracoesContainer = document.getElementById('atracoes-container');
    atracoesContainer.innerHTML = '';
    if (ponto.atracoes && ponto.atracoes.length > 0) {
        ponto.atracoes.forEach(atracao => {
            atracoesContainer.innerHTML += `
                <div class="col-md-4 mb-3">
                    <div class="card">
                        <img src="${atracao.imagem}" class="card-img-top" alt="${atracao.nome}" style="height: 150px; object-fit: cover;">
                        <div class="card-body"><h6 class="card-title text-center">${atracao.nome}</h6></div>
                    </div>
                </div>`;
        });
    }

    document.getElementById('btn-editar').onclick = () => {
        window.location.href = `cadastro_ponto.html?id=${ponto.id}`;
    };

    document.getElementById('btn-excluir').onclick = async () => {
        if (confirm(`Tem certeza que deseja excluir "${ponto.titulo}"?`)) {
            await excluirPonto(ponto.id);
            alert('Ponto turístico excluído com sucesso.');
            window.location.href = 'index.html';
        }
    };
};

// Carrega os dados de um ponto no formulário de cadastro (para edição)
const preencherFormulario = async (id) => {
    const ponto = await getPonto(id);
    if (!ponto) return;

    document.getElementById('form-title').textContent = `Editar: ${ponto.titulo}`;
    document.getElementById('ponto-id').value = ponto.id; // <-- AQUI É ONDE O ID É SALVO
    document.getElementById('titulo').value = ponto.titulo;
    document.getElementById('descricao').value = ponto.descricao;
    document.getElementById('imagem_principal').value = ponto.imagem_principal;
    document.getElementById('conteudo').value = ponto.conteudo;
    
    if (ponto.outros_detalhes) {
        document.getElementById('detalhe-localizacao').value = ponto.outros_detalhes.Localização || '';
        document.getElementById('detalhe-funcionamento').value = ponto.outros_detalhes.Funcionamento || '';
    }
};

// Lida com o envio do formulário (Criação ou Edição)
const handleFormSubmit = async (event) => {
    event.preventDefault(); 

    // LÊ O ID DO CAMPO OCULTO
    const id = document.getElementById('ponto-id').value;

    let pontoExistente = { atracoes: [], outros_detalhes: {} };
    if (id) {
        pontoExistente = await getPonto(id);
    }

    const ponto = {
        ...pontoExistente, 
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        imagem_principal: document.getElementById('imagem_principal').value,
        conteudo: document.getElementById('conteudo').value,
        outros_detalhes: {
            ...pontoExistente.outros_detalhes,
            "Localização": document.getElementById('detalhe-localizacao').value,
            "Funcionamento": document.getElementById('detalhe-funcionamento').value
        }
    };

    // VERIFICA SE O ID EXISTE PARA DECIDIR SE É NOVO OU EDIÇÃO
    if (id) {
        ponto.id = parseInt(id, 10);
    } else {
        delete ponto.id; 
    }

    await salvarPonto(ponto);
    
    alert('Ponto turístico salvo com sucesso!');
    window.location.href = 'index.html'; 
};

/*
|--------------------------------------------------------------------------
| ROTEADOR (Onde a mágica começa)
|--------------------------------------------------------------------------
*/
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const bodyId = document.body.id;

    if (bodyId === 'page-index') {
        carregarCards();
    } else if (bodyId === 'page-detalhe') {
        if (id) {
            carregarPaginaDetalhe(id);
        } else {
            window.location.href = 'index.html'; 
        }
    } else if (bodyId === 'page-cadastro') {
        document.getElementById('ponto-form').addEventListener('submit', handleFormSubmit);
        if (id) {
            preencherFormulario(id); // Se tem ID, é uma edição e preenche o form
        }
    }
});