from youtube import extrair_video_id, buscar_legenda

url = input("Cole a URL do vídeo: ")

try:
    video_id = extrair_video_id(url)

    legenda = buscar_legenda(video_id)

    print("\n===== LEGENDA =====\n")
    print(legenda)

except Exception as e:
    print(f"Erro: {e}")