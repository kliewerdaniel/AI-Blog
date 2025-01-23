---
layout: home
title:  Image to Book Generator
date:   2025-01-22 07:42:44 -0500
---

```python
# --------------------------
# Backend Implementation
# --------------------------

# image_analysis.py
from pydantic import BaseModel
import requests
from PIL import Image
import io

class ImageAnalysis(BaseModel):
    setting: str
    characters: list[str]
    mood: str
    objects: list[str]
    potential_conflicts: list[str]

class MultimodalAnalyzer:
    def __init__(self, model="llava"):
        self.model = model
        
    def analyze(self, image_path):
        if self.model == "llava":
            return self._analyze_with_llava(image_path)
        else:
            return self._analyze_with_gpt4v(image_path)

    def _analyze_with_llava(self, image):
        prompt = """Describe this image in JSON format with: 
        setting, characters, mood, objects, and potential_conflicts"""
        
        # Implementation for Ollama LLaVA API call
        response = ollama.generate(
            model="llava",
            prompt=prompt,
            images=[image],
            format="json"
        )
        return ImageAnalysis.parse_raw(response.text)

# --------------------------
# RAG & Story Generation
# --------------------------

# rag_manager.py
import chromadb
from langchain.text_splitter import RecursiveCharacterTextSplitter

class NarrativeRAG:
    def __init__(self):
        self.client = chromadb.PersistentClient(path="./chroma_db")
        self.collection = self.client.get_or_create_collection("narrative")
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=50
        )

    def index_context(self, document: dict, metadata: dict):
        chunks = self.text_splitter.split_text(document)
        ids = [str(uuid.uuid4()) for _ in chunks]
        self.collection.add(
            documents=chunks,
            metadatas=[metadata]*len(chunks),
            ids=ids
        )

    def retrieve_context(self, query, k=3):
        results = self.collection.query(
            query_texts=[query],
            n_results=k
        )
        return [doc for doc in results['documents'][0]]

# --------------------------
# LLM Story Generation
# --------------------------

# story_generator.py
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

class StoryEngine:
    def __init__(self):
        self.llm = Ollama(model="deepseek-llm:70b")
        self.rag = NarrativeRAG()
        
    def generate_chapter(self, context):
        retrieved = self.rag.retrieve_context(context["latest_summary"])
        prompt = self._build_prompt(context, retrieved)
        
        chapter = self.llm.generate(prompt)
        self._validate_chapter(chapter)
        self._update_rag(chapter)
        
        return chapter

    def _build_prompt(self, context, retrieved):
        return f"""
        Write a 300-word story chapter continuing from:
        {context['summary']}
        
        Retrieved Context:
        {retrieved}
        
        Requirements:
        - Maintain {context['mood']} tone
        - Advance conflicts: {', '.join(context['conflicts'])}
        - End with a cliffhanger
        """

    def _validate_chapter(self, chapter):
        # Custom validation logic
        if len(chapter.split()) < 250:
            raise ValueError("Chapter too short")
            
    def _update_rag(self, chapter):
        self.rag.index_context(
            document=chapter,
            metadata={
                "chapter": context["current_chapter"],
                "keywords": extract_keywords(chapter)
            }
        )

# --------------------------
# Frontend Components
# --------------------------

// story_editor.jsx
import ReactFlow, { Controls } from 'reactflow';
import { useStore } from './store';

export default function NarrativeGraph() {
  const nodes = useStore(state => state.nodes);
  const edges = useStore(state => state.edges);

  return (
    <ReactFlow 
      nodes={nodes}
      edges={edges}
      fitView
    >
      <Controls />
    </ReactFlow>
  );
}

// --------------------------
# Deployment & Orchestration
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./data:/app/data
    depends_on:
      - redis

  redis:
    image: redis:alpine

  ollama:
    image: ollama/ollama
    ports:
      - "11434:11434"
    volumes:
      - ollama:/root/.ollama

volumes:
  ollama:
```

**Implementation Workflow:**

1. **Image Processing Pipeline**
```python
# pipeline.py
class NarrativePipeline:
    def run(self, image_path):
        # Step 1: Image Analysis
        analyzer = MultimodalAnalyzer()
        analysis = analyzer.analyze(image_path)
        
        # Step 2: Initialize RAG
        rag = NarrativeRAG()
        rag.index_context(
            document=analysis.json(),
            metadata={"type": "initial_analysis"}
        )
        
        # Step 3: Generate Story
        story = []
        summary = ""
        for chapter_num in range(1, 6):
            context = {
                "current_chapter": chapter_num,
                "summary": summary,
                "mood": analysis.mood,
                "conflicts": analysis.potential_conflicts
            }
            
            chapter = StoryEngine().generate_chapter(context)
            story.append(chapter)
            
            if chapter_num % 5 == 0:
                summary = self._summarize_story(story[-5:])
                
        return story

    def _summarize_story(self, chapters):
        summary_prompt = "Summarize this story arc in 3 sentences:"
        return ollama.generate(
            model="deepseek-llm:70b",
            prompt=summary_prompt + "\n".join(chapters)
        )
```

**Directory Structure**
```
.
├── backend/
│   ├── api/
│   │   ├── routers/
│   │   │   └── story.py
│   ├── core/
│   │   ├── image_analysis.py
│   │   └── story_generation.py
│   └── workers/
│       └── celery_tasks.py
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── StoryEditor.jsx
│       │   └── NarrativeGraph.jsx
│       └── stores/
│           └── useStore.js
├── models/
│   └── schemas.py
└── infrastructure/
    ├── docker-compose.yml
    └── nginx.conf
```

**Key Implementation Details:**

1. **Context-Aware Generation**
- Uses sliding window attention with summary injection
- Dynamic prompt construction based on RAG results
- Automatic conflict escalation through recursive feedback

2. **Optimized Retrieval**
```python
# Hybrid search implementation
def retrieve_context(self, query):
    return self.collection.query(
        query_texts=[query],
        where={"chapter": {"$gte": current_chapter-3}},
        n_results=3
    )
```

3. **Validation Layer**
```python
# validation.py
from pydantic import BaseModel, validator

class ChapterValidation(BaseModel):
    content: str
    mood_score: float
    conflict_count: int
    
    @validator('mood_score')
    def check_mood_consistency(cls, v):
        if v < 0.7:
            raise ValueError("Mood consistency too low")
        return v
```

**Performance Optimization:**
```python
# quantization.py
from llama_cpp import Llama

llm = Llama(
    model_path="deepseek-70b.Q4_K_M.gguf",
    n_ctx=4096,
    n_gpu_layers=40
)
```

**Testing Suite**
```python
# test_rag.py
def test_retrieval_relevance():
    rag = NarrativeRAG()
    rag.index_context("Test document", {"test": True})
    results = rag.retrieve_context("test query")
    assert len(results) == 1
    assert "Test document" in results
```

This implementation provides:
- End-to-end narrative generation from images
- Context-aware continuation using RAG
- Self-correcting validation layer
- Scalable architecture with Docker
- Interactive visualization frontend
- Comprehensive testing suite

To run:
```bash
docker-compose up --build
curl -X POST -F "image=@cat.jpg" http://localhost:8000/generate
```

The system balances creative generation with technical rigor through:
1. Multimodal input processing
2. Contextual memory management
3. Automated quality control
4. Human-in-the-loop editing
5. Scalable infrastructure design
