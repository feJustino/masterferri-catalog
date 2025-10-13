# MasterFerri Catalog - MVP

Este é o MVP do marketplace de peças automotivas MasterFerri, desenvolvido com Next.js e integração com o ERP Bling.

## 🚀 Funcionalidades Implementadas

### ✅ Fase 2 - Funcionalidades Principais

1. **Integração Bling API v3**
   - Autenticação OAuth 2.0
   - Sincronização de produtos (`/api/bling/sync`)
   - Busca e filtros de produtos
   - Controle de estoque em tempo real
   - Tratamento de rate limit (1000 requests/dia)

2. **Frontend Next.js com TailwindCSS**
   - 🏠 **Home**: Hero section + produtos em destaque
   - 📦 **Catálogo**: Filtros por categoria, busca e ordenação
   - 🔍 **Detalhes do Produto**: Especificações + compatibilidade
   - 🛒 **Carrinho**: Drawer com resumo e persistência localStorage

3. **Contexto de Carrinho**
   - Adição múltipla de produtos
   - Cálculo de total parcial
   - Persistência via localStorage
   - Controle de quantidades

4. **Fluxo WhatsApp**
   - Geração de mensagem dinâmica
   - Formulário de dados do cliente
   - Redirecionamento automático para WhatsApp
   - Limpeza do carrinho após envio

5. **Cálculo de Frete** (Mock)
   - Campo para CEP no carrinho
   - Simulação de opções PAC/SEDEX
   - Interface pronta para integração real

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Bling Developers

## 🛠️ Instalação

1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd masterferri-catalog
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env.local
   ```
   
   Edite o arquivo `.env.local` com suas credenciais:
   ```env
   # Bling API Configuration
   BLING_CLIENT_ID=your_bling_client_id_here
   BLING_CLIENT_SECRET=your_bling_client_secret_here
   BLING_ACCESS_TOKEN=your_bling_access_token_here
   BLING_REFRESH_TOKEN=your_bling_refresh_token_here
   

   ```

4. **Execute o projeto em desenvolvimento**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**
   - Frontend: http://localhost:3000
   - API de sincronização: http://localhost:3000/api/bling/sync

## 🔧 Configuração do Bling

### 1. Registro no Bling Developers

1. Acesse [Bling Developers](https://developer.bling.com.br)
2. Crie uma conta ou faça login
3. Registre uma nova aplicação
4. Anote as credenciais:
   - Client ID
   - Client Secret

### 2. Obtenção do Access Token

1. Use o fluxo OAuth 2.0 para obter o access_token
2. Exemplo de requisição:
   ```bash
   curl -X POST "https://www.bling.com.br/Api/v3/oauth/token" \
     -H "Content-Type: application/json" \
     -d '{
       "grant_type": "authorization_code",
       "code": "AUTHORIZATION_CODE",
       "client_id": "YOUR_CLIENT_ID",
       "client_secret": "YOUR_CLIENT_SECRET"
     }'
   ```

### 3. Configuração das Permissões

Certifique-se de que sua aplicação Bling tenha permissões para:
- Produtos (leitura)
- Estoques (leitura)
- Categorias (leitura)

## 📁 Estrutura do Projeto

```
masterferri-catalog/
├── components/
│   ├── CartDrawer.js          # Carrinho lateral
│   ├── Layout.js              # Layout principal
│   ├── ProductCard.js         # Card de produto
│   └── WhatsAppButton.js      # Botão finalização WhatsApp
├── context/
│   └── CartContext.js         # Contexto do carrinho
├── pages/
│   ├── api/
│   │   └── bling/
│   │       ├── sync.js        # Sincronização produtos
│   │       ├── products.js    # Listagem produtos
│   │       ├── categories.js  # Listagem categorias
│   │       └── product/[id].js # Produto específico
│   ├── produto/
│   │   └── [id].js           # Página detalhes produto
│   ├── _app.js               # App principal
│   ├── index.js              # Home page
│   ├── catalogo.js           # Página catálogo
│   ├── sobre.js              # Página sobre
│   └── contato.js            # Página contato
├── services/
│   └── blingService.js       # Serviço integração Bling
├── styles/
│   └── globals.css           # Estilos globais
└── public/
    └── images/               # Imagens estáticas
```

## 🎯 APIs Disponíveis

### Sincronização Bling
```
POST /api/bling/sync
```
Sincroniza todos os produtos do Bling com controle de rate limit.

### Listagem de Produtos
```
GET /api/bling/products?page=1&limit=20&categoria=X&search=Y
```
Retorna produtos com filtros e paginação.

### Produto Específico
```
GET /api/bling/product/[id]
```
Retorna detalhes de um produto específico.

### Categorias
```
GET /api/bling/categories
```
Retorna todas as categorias disponíveis.

## 🚀 Deploy (Vercel)

1. **Conecte seu repositório GitHub ao Vercel**

2. **Configure as variáveis de ambiente**
   - Adicione todas as variáveis do `.env.local` no painel da Vercel

3. **Deploy automático**
   - O Vercel fará deploy automaticamente a cada push na branch master

4. **Comandos de build**
   ```bash
   # Build
   npm run build
   
   # Start production
   npm start
   ```

## 📱 Fluxo de Uso

1. **Cliente navega pelo catálogo**
2. **Adiciona produtos ao carrinho**
3. **Preenche dados pessoais**
4. **Clica em "Finalizar no WhatsApp"**
5. **É redirecionado para WhatsApp com mensagem pré-formatada**
6. **Atendimento humano finaliza a venda**

## 🔄 Próximas Fases

### Fase 3 - Melhorias (Semanas 9-10)
- [ ] Implementação de pagamentos online
- [ ] Sistema de usuários e histórico
- [ ] Integração real com API dos Correios
- [ ] Dashboard administrativo

### Fase 4 - Otimização (Semanas 11-12)
- [ ] SEO e performance
- [ ] PWA (Progressive Web App)
- [ ] Analytics e monitoramento
- [ ] Testes automatizados

## 🐛 Troubleshooting

### Erro de Token Bling
```
Error: 401 Unauthorized
```
**Solução**: Verifique se o access_token está válido e renove se necessário.

### Erro de Rate Limit
```
Error: 429 Too Many Requests
```
**Solução**: O sistema implementa delay automático. Aguarde alguns minutos.

### Produtos não aparecem
**Possíveis causas**:
- Token inválido
- Produtos inativos no Bling
- Erro na sincronização

**Solução**: Execute `POST /api/bling/sync` para ressincronizar.

## 📞 Suporte
 (19) 97413-9793
- **Email**: contato@masterferri.com.br
- **Documentação Bling**: https://developer.bling.com.br/referencia

## 📄 Licença

Este projeto está licenciado sob a MIT License.

---

**Desenvolvido para MasterFerri** - Versão MVP 1.0
**Prazo**: 12 semanas conforme documento de especificação
**Tecnologias**: Next.js, TailwindCSS, Bling API v3, WhatsApp Business
