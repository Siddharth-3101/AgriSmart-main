FROM python:3.11-slim
WORKDIR /app

# Install dependencies
COPY agrismart-ml-service/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY agrismart-ml-service/ ./

ENV PORT=8000
EXPOSE 8000

CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
