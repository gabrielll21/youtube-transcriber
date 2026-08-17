# YouTube Transcriber

Aplicação para extrair legendas/transcrições de vídeos do YouTube. O projeto hoje possui três camadas separadas:

- uma CLI em Python, que salva a legenda em arquivo `.txt`;
- uma API HTTP em FastAPI, usada pelo frontend;
- um frontend React em `frontend/`, com interface para colar a URL e visualizar a transcrição.

A lógica principal de extração continua concentrada no backend Python e é reutilizada tanto pela CLI quanto pela API.

## Funcionalidades atuais

- Extrai o ID do vídeo a partir da URL do YouTube.
- Obtém automaticamente o título do vídeo.
- Busca legendas nas línguas suportadas:
  - Português (`pt`)
  - Português do Brasil (`pt-BR`)
  - Inglês (`en`)
- Salva a legenda em `.txt` pela CLI.
- Expõe uma API HTTP para consumo do frontend.
- Interface React pronta para colar a URL, extrair a legenda, copiar o resultado e baixar `.txt` no navegador.
- Mantém o código Python da CLI separado do frontend.

## Tecnologias

Backend:

- Python 3.12+
- `youtube-transcript-api`
- `yt-dlp`
- `fastapi`
- `uvicorn`

Frontend:

- React
- Vite

## Estrutura do projeto

```text
youtube-transcriber/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── public/
│   │   └── favicon.svg
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       ├── assets/
│       ├── components/
│       ├── pages/
│       └── services/
├── src/
│   ├── __init__.py
│   ├── api.py
│   ├── file_manager.py
│   ├── main.py
│   ├── utils.py
│   ├── youtube.py
│   └── services/
│       └── transcript_service.py
├── requirements.txt
├── README.md
└── LICENSE
```

## Como funciona

### CLI

A versão em linha de comando continua funcionando como antes:

1. o usuário cola a URL do vídeo;
2. o backend extrai o `video_id`;
3. o título é obtido;
4. a legenda é buscada;
5. o texto é salvo em `output/<título>.txt`.

### API

A API FastAPI expõe um endpoint para o frontend:

- `POST /api/transcript`

Request:

```json
{
  "url": "https://www.youtube.com/watch?v=..."
}
```

Response de sucesso:

```json
{
  "title": "Título do vídeo",
  "transcript": "Texto completo da legenda"
}
```

### Frontend

A interface React permite:

- colar a URL do YouTube;
- disparar a extração;
- visualizar título e transcrição;
- copiar o texto para a área de transferência;
- baixar a transcrição como `.txt` no navegador.

## Instalação

Clone o repositório:

```bash
git clone https://github.com/gabrielll21/youtube-transcriber.git
cd youtube-transcriber
```

### Backend Python

Crie e ative um ambiente virtual:

```bash
python -m venv .venv
```

Linux/macOS:

```bash
source .venv/bin/activate
```

Windows:

```bash
.venv\Scripts\activate
```

Instale as dependências do backend:

```bash
pip install -r requirements.txt
```

### Frontend React

Entre na pasta do frontend e instale as dependências:

```bash
cd frontend
npm install
```

## Como usar

### 1. Executar a CLI

Na raiz do projeto:

```bash
python src/main.py
```

Cole a URL quando solicitado. A legenda será salva em `output/`.

### 2. Executar a API

Na raiz do projeto:

```bash
uvicorn src.api:app --reload
```

A API ficará disponível em:

- `http://127.0.0.1:8000`
- documentação interativa em `http://127.0.0.1:8000/docs`

### 3. Executar o frontend

Em outro terminal:

```bash
cd frontend
npm run dev
```

O Vite normalmente sobe em:

- `http://127.0.0.1:5173`

Se a porta estiver ocupada, ele pode usar outra porta disponível.

## Variável de ambiente do frontend

Por padrão, o frontend aponta para a API local em `http://127.0.0.1:8000`.

Se quiser alterar isso, defina:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## Erros tratados pela API

- URL inválida → `400`
- vídeo sem legenda → `404`
- nenhuma legenda disponível nas línguas suportadas → `404`
- erro inesperado → `500`

As respostas são retornadas em JSON com mensagens pensadas para consumo pelo frontend.

## Dependências

Backend:

- `fastapi`
- `uvicorn[standard]`
- `youtube-transcript-api`
- `yt-dlp`
- `requests`

Frontend:

- `react`
- `react-dom`
- `vite`

## Melhorias futuras

- persistência de histórico de transcrições
- download em outros formatos
- autenticação e rate limiting na API
- suporte a mais idiomas
- integração com IA para resumo e refinamento de texto

## Licença

Este projeto está licenciado sob a licença MIT.
