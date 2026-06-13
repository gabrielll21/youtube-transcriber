from urllib.parse import urlparse, parse_qs
from youtube_transcript_api import YouTubeTranscriptApi
from yt_dlp import YoutubeDL

def extrair_video_id(url: str) -> str:
    parsed = urlparse(url)
    if parsed.hostname == "youtu.be":
        return parsed.path[1:]
    if parsed.hostname in ("www.youtube.com", "youtube.com"):
        return parse_qs(parsed.query)["v"][0]
    raise ValueError("URL inválida.")

def buscar_legenda(video_id: str) -> str:
    transcript = YouTubeTranscriptApi().fetch(video_id, languages=["pt", "pt-BR", "en"])
    texto = ""
    for trecho in transcript:
        texto += trecho.text + " "
    return texto.strip()

def obter_titulo(url: str) -> str:
    with YoutubeDL({"quiet": True}) as ydl:
        info = ydl.extract_info(url, download=False)
        return info["title"]