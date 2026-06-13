import re
from pathlib import Path


def limpar_nome_arquivo(nome: str) -> str:
    nome = re.sub(r'[\\/:*?"<>|]', "", nome)
    nome = nome.strip()
    return nome

def salvar_legenda(titulo: str, legenda: str):
    pasta = Path("output")
    pasta.mkdir(exist_ok=True)
    titulo = limpar_nome_arquivo(titulo)
    caminho = pasta / f"{titulo}.txt"
    with open(caminho, "w", encoding="utf-8") as arquivo:
        arquivo.write(legenda)
    return caminho