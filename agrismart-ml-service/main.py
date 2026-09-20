from fastapi import FastAPI
from predictor import Predictor
from fastapi.middleware.cors import CORSMiddleware
from schemas.recommendation import RecommendationRequest
app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
predictor=Predictor()

@app.post("/recommend")
def recommend(request:RecommendationRequest):
     return predictor.predict(request) 