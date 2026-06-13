from youtube import extrair_video_id, buscar_legenda, obter_titulo
from file_manager import salvar_legenda

url = input("Cole a URL do vídeo: ")

video_id = extrair_video_id(url)
titulo = obter_titulo(url)
legenda = buscar_legenda(video_id)

caminho = salvar_legenda(titulo, legenda)

print(f"Legenda salva em: {caminho}")