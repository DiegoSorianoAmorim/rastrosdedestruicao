# Plataforma de Mapeamento de Torres de Transmissão - Tracunhaém

Uma plataforma web interativa e gratuita para divulgação de dados de mapeamento de eventos relacionados à instalação de torres de transmissão de energia elétrica em Tracunhaém, Pernambuco.

## 🎯 Características Principais

### Interface Interativa
- **Mapa focado em Tracunhaém**: Visualização centrada especificamente no município de Tracunhaém, PE
- **Ícones redondos personalizáveis**: Marcadores circulares com cores diferenciadas por tipo de evento
- **Painel de informações hierárquico**: Layout customizado com destaque para título, categoria e descrição
- **Barra de rolagem na descrição**: Evita expansão excessiva do painel mantendo a usabilidade

### Funcionalidades Avançadas
- **Navegação fluida**: Controles de zoom e movimentação otimizados para a região
- **Responsividade**: Interface adaptada para desktop e dispositivos móveis
- **Carregamento dinâmico**: Dados carregados via arquivo GeoJSON editável
- **Interatividade completa**: Clique nos marcadores para visualizar informações detalhadas

## 🏗️ Arquitetura Técnica

### Tecnologias Utilizadas
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Mapeamento**: Leaflet.js v1.9.4
- **Dados**: GeoJSON para armazenamento estruturado
- **Tiles**: OpenStreetMap (gratuito e open source)
- **Hospedagem**: Compatível com GitHub Pages, Netlify, Vercel

### Estrutura de Arquivos
```
mapeamento-torres/
├── index.html          # Página principal
├── style.css           # Estilos customizados
├── script.js           # Lógica da aplicação
├── data/
│   └── events.geojson  # Dados dos eventos
└── README.md           # Documentação
```

## 📊 Formato dos Dados

### Estrutura GeoJSON
Os eventos são armazenados em formato GeoJSON padrão com as seguintes propriedades:

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [longitude, latitude]
  },
  "properties": {
    "titulo": "Título do evento",
    "tipo": "instalacao|manutencao|conflito|aprovacao",
    "data": "YYYY-MM-DD",
    "local": "Localização específica",
    "descricao": "Descrição detalhada do evento",
    "responsavel": "Órgão ou empresa responsável",
    "status": "Status atual do evento",
    "observacoes": "Observações adicionais",
    "iconUrl": "URL do ícone personalizado (opcional)"
  }
}
```

### Tipos de Eventos Suportados
- **Instalação** (azul): Novos projetos de instalação de torres
- **Manutenção** (laranja): Atividades de manutenção preventiva/corretiva
- **Conflito** (vermelho): Conflitos ambientais, fundiários ou sociais
- **Aprovação** (verde): Licenças e aprovações de órgãos competentes
- **Personalizado** (roxo): Outros tipos de eventos

## 🎨 Layout do Painel de Informações

### Hierarquia Visual
1. **Título do Evento** (100% - maior destaque)
   - Fonte: 1.4rem, peso 700
   - Cor: branca sobre gradiente azul-roxo
   
2. **Categoria do Evento** (40% do título)
   - Fonte: 0.9rem, peso 600
   - Estilo: caixa alta com fundo colorido
   
3. **Descrição do Evento** (60% do título)
   - Fonte: 1rem, altura de linha 1.6
   - Área com barra de rolagem (máx. 150px)
   
4. **Metadados** (menor hierarquia)
   - Data, local, responsável, status, observações
   - Fonte: 0.85rem com separadores visuais

### Características de UX
- **Barra de rolagem personalizada**: Design minimalista na descrição
- **Transições suaves**: Animações de entrada/saída do painel
- **Responsividade**: Adaptação automática para diferentes tamanhos de tela
- **Acessibilidade**: Contraste adequado e navegação por teclado

## 🔧 Personalização e Edição

### Adicionando Novos Eventos
1. Edite o arquivo `data/events.geojson`
2. Adicione uma nova feature seguindo a estrutura padrão
3. Defina as coordenadas corretas para Tracunhaém
4. Escolha o tipo apropriado para definir a cor do marcador

### Personalizando Ícones
- Adicione a propriedade `iconUrl` com o caminho para o ícone personalizado
- Ícones são redimensionados automaticamente para 16x16px
- Formatos suportados: PNG, JPG, SVG

### Modificando Estilos
- **Cores dos marcadores**: Edite a função `createCustomIcon()` em `script.js`
- **Layout do painel**: Modifique as classes CSS em `style.css`
- **Coordenadas centrais**: Ajuste `TRACUNHAEM_CENTER` em `script.js`

## 🚀 Instalação e Deploy

### Desenvolvimento Local
```bash
# Clone ou baixe os arquivos
cd mapeamento-torres

# Inicie um servidor HTTP local
python3 -m http.server 8000
# ou
npx serve .

# Acesse http://localhost:8000
```

### Deploy no GitHub Pages
1. Faça upload dos arquivos para um repositório GitHub
2. Vá em Settings > Pages
3. Selecione a branch main como source
4. A plataforma estará disponível em `https://usuario.github.io/repositorio`

### Deploy em Outras Plataformas
- **Netlify**: Arraste a pasta do projeto para netlify.com/drop
- **Vercel**: Conecte o repositório GitHub ao Vercel
- **Surge.sh**: Use `surge` CLI para deploy rápido

## 📱 Compatibilidade

### Navegadores Suportados
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Dispositivos
- **Desktop**: Experiência completa com todos os recursos
- **Tablet**: Interface adaptada com controles touch
- **Mobile**: Layout responsivo otimizado para telas pequenas

## 🔒 Segurança e Privacidade

### Dados
- Todos os dados são estáticos e públicos
- Não há coleta de informações pessoais
- Não utiliza cookies ou tracking

### Hospedagem
- Compatível com HTTPS por padrão
- Não requer backend ou banco de dados
- Funciona completamente offline após carregamento inicial

## 🤝 Contribuição

### Como Contribuir
1. Reporte bugs ou sugira melhorias via issues
2. Faça fork do projeto para modificações
3. Envie pull requests com suas contribuições
4. Mantenha a documentação atualizada

### Diretrizes
- Mantenha o código limpo e comentado
- Teste em múltiplos navegadores
- Preserve a compatibilidade com dispositivos móveis
- Documente mudanças significativas

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente para fins educacionais, de pesquisa ou comunitários. Mantenha os créditos originais ao redistribuir.

## 📞 Suporte

Para dúvidas, sugestões ou suporte técnico:
- Consulte a documentação completa
- Verifique os exemplos de dados fornecidos
- Teste localmente antes de fazer deploy
- Mantenha backups dos dados importantes

---

**Desenvolvido para o projeto de mapeamento participativo de torres de transmissão em Tracunhaém, PE**

