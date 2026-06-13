from youtube import extrair_video_id

url = input("Cole a URL do vídeo: ")

video_id = extrair_video_id(url)

print(f"ID do vídeo: {video_id}")