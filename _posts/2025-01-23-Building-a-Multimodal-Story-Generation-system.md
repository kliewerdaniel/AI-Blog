---
layout: home
title:  Building a Multimodal Story Generation System Complete Setup Guide
date:   2025-01-23 07:42:44 -0500
---

https://github.com/kliewerdaniel/ITB02

**Building a Multimodal Story Generation System: Complete Setup Guide**  
*Learn how to deploy an AI-powered narrative generation system with image analysis capabilities*

---

### **System Overview**  
This application combines computer vision and large language models to:  
1. Analyze images for story elements  
2. Generate multi-chapter narratives  
3. Maintain story consistency using RAG  
4. Visualize story flow with ReactFlow  

---

### **Prerequisites**  
- Python 3.11+  
- Node.js 18+ (for frontend)  
- Docker & docker-compose  
- 16GB+ RAM recommended  

---

### **1. Environment Setup**  
**Create Virtual Environment**  
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate  # Windows
```

**Install Requirements**  
```bash
pip install -r requirements.txt
```

**Apple Silicon Special Instructions**  
```bash
# Install PyTorch nightly build
pip install --pre torch --extra-index-url https://download.pytorch.org/whl/nightly/cpu

# Install system dependencies
brew install libjpeg webp
```

---

### **2. Ollama Setup**  
```bash
# Pull required LLMs
ollama pull gemma2:27b
ollama pull deepseek-llm:70b
```

---

### **3. Launch the System**  
**Option 1: Local Development**  
```bash
# Start backend
uvicorn backend.main:app --reload

# Start frontend (in separate terminal)
cd frontend
npm install
npm run dev
```

**Option 2: Docker Deployment**  
```bash
# Build and start all services
docker-compose up --build

# Initialize ChromaDB
docker exec -it backend python -c "from backend.core.rag_manager import NarrativeRAG; NarrativeRAG()"
```

---

### **4. System Verification**  
```bash
# Check backend health
curl http://localhost:8000/health

# Test story generation
curl -X POST -F "image=@/path/to/image.jpg" http://localhost:8000/story/generate-story
```

---

### **Key Components**  
| Component | Technology Stack |  
|-----------|------------------|  
| Image Analysis | LLaVA, Pillow |  
| Story Generation | Gemma-27B, LangChain |  
| Vector Database | ChromaDB |  
| API Layer | FastAPI |  
| Frontend | ReactFlow, Zustand |  

---

### **Troubleshooting Guide**  

**Common Issues:**  
1. **Missing LLM Models**  
   ```bash
   ollama list  # Verify installed models
   ```

2. **ChromaDB Initialization**  
   ```bash
   rm -rf chroma_db  # Reset database
   ```

3. **Apple Silicon Torch Issues**  
   ```bash
   pip uninstall torch
   pip install --pre torch --extra-index-url https://download.pytorch.org/whl/nightly/cpu
   ```

4. **Memory Constraints**  
   ```docker
   # In docker-compose.yml
   services:
     ollama:
       deploy:
         resources:
           limits:
             memory: 8G
   ```

---

### **Production Deployment**  
**1. Optimized Docker Build**  
```dockerfile
# Frontend
RUN npm run build

# Backend 
RUN pip install --no-cache-dir -r requirements.txt
```

**2. Environment Variables**  
```bash
# .env.production
APP_ENV=production
OLLAMA_MODEL=gemma2:27b
```

**3. Cluster Deployment**  
```bash
docker swarm init
docker stack deploy -c docker-compose.yml storygen
```

---

### **Architecture Diagram**  
```
[User Interface] → [FastAPI] → [Narrative Pipeline]  
                     ↓              ↓  
                  [Redis] ← [Celery Workers]  
                     ↓  
                  [Ollama]  
                     ↓  
                  [ChromaDB]
```

This guide provides both local development and production deployment instructions. The system leverages modern AI capabilities while maintaining modular architecture for easy customization.