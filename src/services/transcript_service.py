from dataclasses import dataclass

try:
    from youtube import buscar_legenda, extrair_video_id, obter_titulo
except ImportError:  # pragma: no cover - supports package-style imports
    from ..youtube import buscar_legenda, extrair_video_id, obter_titulo

try:
    from youtube_transcript_api import (
        CouldNotRetrieveTranscript,
        NoTranscriptFound,
        TranscriptsDisabled,
    )
except ImportError:  # pragma: no cover - dependency not installed in static checks
    CouldNotRetrieveTranscript = NoTranscriptFound = TranscriptsDisabled = Exception


@dataclass(frozen=True)
class TranscriptResult:
    title: str
    transcript: str


class TranscriptServiceError(Exception):
    """Base class for transcript service errors."""


class InvalidYouTubeURLError(TranscriptServiceError):
    """Raised when the provided URL is not a valid YouTube URL."""


class TranscriptNotAvailableError(TranscriptServiceError):
    """Raised when the video does not provide any transcript/captions."""


class TranscriptLanguageUnavailableError(TranscriptServiceError):
    """Raised when none of the supported languages are available."""


class TranscriptExtractionError(TranscriptServiceError):
    """Raised for unexpected failures during transcript extraction."""


SUPPORTED_LANGUAGES = ["pt", "pt-BR", "en"]


def extract_transcript(url: str) -> TranscriptResult:
    try:
        video_id = extrair_video_id(url)
    except ValueError as exc:
        raise InvalidYouTubeURLError(str(exc)) from exc

    try:
        title = obter_titulo(url)
    except TranscriptServiceError:
        raise
    except Exception as exc:  # pragma: no cover - unexpected runtime failure
        raise TranscriptExtractionError("Não foi possível obter o título do vídeo.") from exc

    try:
        transcript = buscar_legenda(video_id)
    except NoTranscriptFound as exc:
        raise TranscriptLanguageUnavailableError(
            "Nenhuma legenda está disponível nas línguas suportadas (pt, pt-BR, en)."
        ) from exc
    except TranscriptsDisabled as exc:
        raise TranscriptNotAvailableError(
            "Este vídeo não possui legenda/transcrição disponível."
        ) from exc
    except CouldNotRetrieveTranscript as exc:
        print(f"ERRO YOUTUBE TRANSCRIPT: {repr(exc)}", flush=True)
        raise TranscriptNotAvailableError(
            "Não foi possível recuperar a legenda deste vídeo."
        ) from exc
    except Exception as exc:
        print(f"ERRO INESPERADO TRANSCRIPT: {repr(exc)}", flush=True)
        raise TranscriptExtractionError(
            "Ocorreu um erro inesperado durante a extração."
        ) from exc

    return TranscriptResult(title=title, transcript=transcript)
