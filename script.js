// Configuração inicial do mapa
let map;
let markersLayer;
let currentInfoPanel = null;

// Coordenadas centrais de Tracunhaém, PE
const TRACUNHAEM_CENTER = [-35.2404, -7.8030];
const INITIAL_ZOOM = 14;

// Inicialização do mapa
function initMap() {
    // Criar o mapa centrado em Tracunhaém
    map = L.map('map').setView(TRACUNHAEM_CENTER, INITIAL_ZOOM);

    // Adicionar camada de tiles do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);

    // Criar grupo de marcadores
    markersLayer = L.layerGroup().addTo(map);

    // Carregar dados dos eventos
    loadEventData();
}

// Carregar dados dos eventos do arquivo GeoJSON
async function loadEventData() {
    try {
        const response = await fetch('data/events.geojson');
        const data = await response.json();
        
        // Adicionar marcadores para cada evento
        data.features.forEach(feature => {
            addEventMarker(feature);
        });
        
        // Ajustar a visualização para mostrar todos os marcadores
        if (markersLayer.getLayers().length > 0) {
            map.fitBounds(markersLayer.getBounds(), { padding: [20, 20] });
        }
    } catch (error) {
        console.error('Erro ao carregar dados dos eventos:', error);
        // Se não conseguir carregar o arquivo, manter o mapa centrado em Tracunhaém
        console.log('Mantendo visualização centrada em Tracunhaém');
    }
}

// Adicionar marcador para um evento
function addEventMarker(feature) {
    const { coordinates } = feature.geometry;
    const properties = feature.properties;
    
    // Criar ícone personalizado baseado no tipo de evento
    const icon = createCustomIcon(properties.tipo || 'default', properties.iconUrl || null);
    
    // Criar marcador
    const marker = L.marker([coordinates[1], coordinates[0]], { icon })
        .bindTooltip(properties.titulo || 'Evento', { 
            permanent: false, 
            direction: 'top',
            offset: [0, -10]
        });
    
    // Adicionar evento de clique
    marker.on('click', () => {
        showEventInfo(properties);
    });
    
    // Adicionar ao grupo de marcadores
    markersLayer.addLayer(marker);
}

// Criar ícone personalizado redondo
function createCustomIcon(tipo, iconUrl = null) {
    let color = '#e74c3c'; // vermelho padrão
    
    switch (tipo) {
        case 'instalacao':
            color = '#3498db'; // azul
            break;
        case 'manutencao':
            color = '#f39c12'; // laranja
            break;
        case 'conflito':
            color = '#e74c3c'; // vermelho
            break;
        case 'aprovacao':
            color = '#27ae60'; // verde
            break;
        default:
            color = '#9b59b6'; // roxo
    }
    
    // Se um ícone personalizado for fornecido, use-o
    if (iconUrl) {
        return L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); overflow: hidden;">
                     <img src="${iconUrl}" style="width: 16px; height: 16px; object-fit: cover;" alt="Ícone do evento">
                   </div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
    }
    
    // Ícone redondo padrão
    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
}

// Mostrar informações do evento no painel lateral
function showEventInfo(properties) {
    const infoPanel = document.getElementById('info-panel');
    const infoTitle = document.getElementById('info-title');
    const infoDetails = document.getElementById('info-details');
    
    // Atualizar título principal (maior destaque)
    infoTitle.textContent = properties.titulo || 'Evento';
    
    // Criar conteúdo das informações com nova hierarquia
    const detailsHTML = `
        <div class="event-category">
            ${formatTipo(properties.tipo)}
        </div>
        <div class="event-description">
            ${properties.descricao || 'Sem descrição disponível'}
        </div>
        <div class="event-metadata">
            ${properties.data ? `<div class="metadata-item"><strong>Data:</strong> ${formatDate(properties.data)}</div>` : ''}
            ${properties.local ? `<div class="metadata-item"><strong>Local:</strong> ${properties.local}</div>` : ''}
            ${properties.responsavel ? `<div class="metadata-item"><strong>Responsável:</strong> ${properties.responsavel}</div>` : ''}
            ${properties.status ? `<div class="metadata-item"><strong>Status:</strong> ${properties.status}</div>` : ''}
            ${properties.observacoes ? `<div class="metadata-item"><strong>Observações:</strong> ${properties.observacoes}</div>` : ''}
        </div>
    `;
    
    infoDetails.innerHTML = detailsHTML;
    
    // Mostrar painel
    infoPanel.classList.remove('hidden');
    currentInfoPanel = properties;
}

// Formatar data para exibição
function formatDate(dateString) {
    if (!dateString) return 'Não informada';
    
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } catch (error) {
        return dateString;
    }
}

// Formatar tipo de evento para exibição
function formatTipo(tipo) {
    const tipos = {
        'instalacao': 'Instalação',
        'manutencao': 'Manutenção',
        'conflito': 'Conflito',
        'aprovacao': 'Aprovação',
        'default': 'Outro'
    };
    return tipos[tipo] || tipos.default;
}

// Fechar painel de informações
function closeInfoPanel() {
    const infoPanel = document.getElementById('info-panel');
    infoPanel.classList.add('hidden');
    currentInfoPanel = null;
}

// Resetar visualização do mapa
function resetMapView() {
    if (markersLayer.getLayers().length > 0) {
        map.fitBounds(markersLayer.getBounds(), { padding: [20, 20] });
    } else {
        map.setView(TRACUNHAEM_CENTER, INITIAL_ZOOM);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar mapa
    initMap();
    
    // Botão de fechar painel
    document.getElementById('close-panel').addEventListener('click', closeInfoPanel);
    
    // Botão de resetar visualização
    document.getElementById('reset-view').addEventListener('click', resetMapView);
    
    // Fechar painel ao clicar no mapa
    map.on('click', function(e) {
        // Verificar se o clique não foi em um marcador
        if (!e.originalEvent.target.closest('.custom-marker')) {
            closeInfoPanel();
        }
    });
});

