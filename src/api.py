from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

try:
    from services.transcript_service import (
        InvalidYouTubeURLError,
        TranscriptExtractionError,
        TranscriptLanguageUnavailableError,
        TranscriptNotAvailableError,
        extract_transcript,
    )
except ImportError:  # pragma: no cover - supports package-style imports
    from .services.transcript_service import (
        InvalidYouTubeURLError,
        TranscriptExtractionError,
        TranscriptLanguageUnavailableError,
        TranscriptNotAvailableError,
        extract_transcript,
    )

app = FastAPI(title="YouTube Transcriber API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://youtube-transcriber-navvy.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TranscriptRequest(BaseModel):
    url: str = Field(..., description="YouTube video URL")


class TranscriptResponse(BaseModel):
    title: str
    transcript: str


@app.get("/")
def healthcheck() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/transcript", response_model=TranscriptResponse)
def create_transcript(payload: TranscriptRequest) -> TranscriptResponse:
    try:
        result = extract_transcript(payload.url)
    except InvalidYouTubeURLError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except TranscriptLanguageUnavailableError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except TranscriptNotAvailableError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except TranscriptExtractionError as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Ocorreu um erro inesperado ao processar a solicitação.",
        )

    return TranscriptResponse(title=result.title, transcript=result.transcript)
