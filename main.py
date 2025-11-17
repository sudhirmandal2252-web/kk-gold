
from fastapi import FastAPI, UploadFile
from fastapi.responses import Response
from model_utils import process_audio

app = FastAPI()

@app.post("/clean")
async def clean_audio(audio1: UploadFile, audio2: UploadFile):
    d1 = await audio1.read()
    d2 = await audio2.read()
    out = process_audio(d1, d2)
    return Response(content=out, media_type="audio/wav")
