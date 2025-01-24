---
layout: home
title:  Building a Multimodal Story Generation System Complete Setup Guide
date:   2025-01-23 07:42:44 -0500
---



**Crafting Dynamic Narratives with AI: Complete Implementation Guide**  
*Build and Deploy a Multimodal Story Generation System*  

---

### **Project Overview**  
**[GitHub Repository](https://github.com/kliewerdaniel/ITB02)**  
This system transforms visual inputs into structured narratives using:  
- **Computer Vision**: Analyze images for story elements  
- **LLM Orchestration**: Gemma2-27B for dynamic story generation  
- **RAG Architecture**: ChromaDB for narrative consistency  
- **React Visualization**: Interactive story graph interface  

---

### **System Requirements**  
- Python 3.11+  
- Node.js 18+ (Frontend)  
- 16GB+ RAM (24GB+ for GPU acceleration)  
- Ollama runtime (Local LLM management)  

---

### **Quick Start: Local Development**  
**1. Environment Setup**  
```bash
# Clone repository
git clone https://github.com/kliewerdaniel/ITB02
cd ITB02

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

**2. Install Dependencies**  
```bash
# Core requirements
pip install -r requirements.txt

# Apple Silicon Special Setup
pip install --pre torch --extra-index-url https://download.pytorch.org/whl/nightly/cpu
brew install libjpeg webp  # Image processing dependencies
```

**3. Initialize AI Models**  
```bash
# Download LLMs via Ollama
ollama pull gemma2:27b
ollama pull deepseek-llm:70b
```

**4. Launch Services**  
*In separate terminals:*  

**Backend (FastAPI):**  
```bash
uvicorn backend.main:app --reload
```

**Frontend:**  
```bash
cd frontend
npm install && npm run dev
```

---

### **System Verification**  
```bash
# Check API health
curl http://localhost:8000/health

# Test story generation
curl -X POST -F "image=@./test_image.jpg" http://localhost:8000/story/generate-story
```

---

### **Key Components**  
| **Module** | **Technology** | **Function** |  
|------------|----------------|--------------|  
| Image Analysis | LLaVA, Pillow | Extract visual narrative elements |  
| Story Engine | Gemma2-27B, LangChain | Generate context-aware chapters |  
| Knowledge Base | ChromaDB | Maintain narrative consistency |  
| API Layer | FastAPI | REST endpoint management |  
| Visualization | ReactFlow | Interactive story mapping |  

---

### **Production Deployment**  
**1. Docker Setup**  
```bash
# Build and launch
docker-compose up --build

# Initialize vector store
docker exec -it backend python -c "from backend.core.rag_manager import NarrativeRAG; NarrativeRAG()"
```

**2. Cluster Configuration**  
```yaml
# docker-compose.yml
services:
  ollama:
    deploy:
      resources:
        limits:
          memory: 12G
          cpus: '4'
```

---

### **Architecture**  
```
[Frontend] ←HTTP→ [FastAPI]  
                   ↓     ↑  
                [Ollama] ←→ [ChromaDB]  
                   ↓  
                [Redis]  
                   ↓  
              [Celery Workers]
```

---

### **Troubleshooting**  
**Common Issues:**  

1. **Missing Vector Store**  
```bash
rm -rf chroma_db && mkdir chroma_db
```

2. **OOM Errors**  
```bash
# Limit Ollama memory usage
export OLLAMA_MAX_LOADED_MODELS=2
```

3. **CUDA Compatibility**  
```bash
pip uninstall torch
pip install torch --extra-index-url https://download.pytorch.org/whl/cu117
```

---

### **Ethical Implementation**  
- Content filtering layer with 3-tier moderation  
- User-controlled output constraints  
- Attribution tracking for generated content  

---

### **Development Roadmap**  
- **Q3 2024**: Audio narrative input support  
- **Q4 2024**: Collaborative editing features  
- **Q1 2025**: Mobile optimization  

---

**Final Implementation Notes**  
This system demonstrates the power of multimodal AI while emphasizing:  
- Local-first architecture for privacy  
- Modular design for component swapping  
- Progressive enhancement capabilities  

For detailed API documentation and contributor guidelines, refer to the [project repository](https://github.com/kliewerdaniel/ITB02).

© 2024 Daniel Kliewer. Released under MIT License.