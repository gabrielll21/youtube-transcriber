# YouTube Transcriber

Aplicação desenvolvida em Python para extrair automaticamente a legenda de vídeos do YouTube e salvá-la em um arquivo `.txt`.

O projeto foi criado com o objetivo de facilitar o estudo através da leitura de vídeos, permitindo transformar legendas em texto de forma rápida.

## Funcionalidades

- Extrai o ID de vídeos do YouTube.
- Obtém o título do vídeo automaticamente.
- Busca legendas disponíveis (Português, Português-BR e Inglês).
- Salva a legenda em um arquivo `.txt`.
- Cria automaticamente a pasta `output`.
- Gera o nome do arquivo com base no título do vídeo.
- Remove caracteres inválidos do nome do arquivo.

## Tecnologias

- Python 3.12
- youtube-transcript-api
- yt-dlp

## Estrutura do projeto

```
youtube-transcriber/
│
├── output/
├── src/
│   ├── main.py
│   ├── youtube.py
│   ├── file_manager.py
│   └── utils.py
│
├── requirements.txt
├── README.md
├── LICENSE
└── .gitignore
```

## Instalação

Clone o repositório:

```bash
git clone https://github.com/gabrielll21/youtube-transcriber.git
```

Entre na pasta:

```bash
cd youtube-transcriber
```

Crie um ambiente virtual:

```bash
python -m venv .venv
```

Ative o ambiente:

### Windows

```bash
.venv\Scripts\activate
```

### Linux/macOS

```bash
source .venv/bin/activate
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

## Como utilizar

Execute:

```bash
python src/main.py
```

Cole a URL do vídeo quando solicitado.

Exemplo:

```
Cole a URL do vídeo:
https://www.youtube.com/watch?v=jNQXAC9IVRw
```

A legenda será salva automaticamente na pasta `output`.

## Dependências

- youtube-transcript-api
- yt-dlp

## Observações

- O vídeo precisa possuir legenda disponível.
- Caso existam múltiplos idiomas, a aplicação tenta utilizar:
  1. Português
  2. Português (Brasil)
  3. Inglês

## Melhorias futuras

- Interface gráfica
- Exportação para PDF
- Resumo automático com IA
- Suporte para outras plataformas de vídeo
- Geração de legendas utilizando Whisper quando o vídeo não possuir legenda

## Licença

Este projeto está licenciado sob a licença MIT.