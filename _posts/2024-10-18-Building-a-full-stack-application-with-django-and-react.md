---
layout: home
title:  Building a full stack application with Django and React
date:   2024-10-18 05:40:44 -0500
---
# Building a Full-Stack Application with Django and React: A Step-by-Step Guide

In this comprehensive guide, we'll walk through the process of building a full-stack application using Django for the backend and React for the frontend. The application allows users to upload a writing sample, analyzes it using an AI language model, and generates blog posts in the style of the uploaded sample.

## Table of Contents

1. [Introduction](#introduction)
2. [Setting Up the Backend with Django](#setting-up-the-backend-with-django)
   - [Creating a Django Project](#creating-a-django-project)
   - [Configuring Settings](#configuring-settings)
   - [Defining Models](#defining-models)
   - [Creating Serializers](#creating-serializers)
   - [Writing Utility Functions](#writing-utility-functions)
   - [Building Views](#building-views)
   - [Setting Up URLs](#setting-up-urls)
3. [Setting Up the Frontend with React](#setting-up-the-frontend-with-react)
   - [Creating a React App](#creating-a-react-app)
   - [Configuring Axios](#configuring-axios)
   - [Building Components](#building-components)
   - [Integrating React Router](#integrating-react-router)
4. [Running and Testing the Application](#running-and-testing-the-application)
5. [Conclusion](#conclusion)

---

## Introduction

This guide aims to help you build a full-stack application that:

- **Backend (Django):**
  - Allows users to upload a writing sample.
  - Analyzes the writing sample using an AI language model.
  - Stores the analysis and allows generating new content based on the analysis.

- **Frontend (React):**
  - Provides a user interface to upload writing samples.
  - Displays a list of saved personas (analysis results).
  - Allows generating and viewing blog posts in the style of the uploaded samples.

---

## Setting Up the Backend with Django

### Creating a Django Project

First, ensure you have Python and Django installed. Create a new Django project and application:

```bash
django-admin startproject backend
cd backend
python manage.py startapp core
```

### Configuring Settings

Update the `backend/settings.py` file to include the necessary configurations:

- Add `rest_framework`, `core`, and `corsheaders` to `INSTALLED_APPS`.
- Configure middleware to include `CorsMiddleware`.
- Set up `CORS_ALLOWED_ORIGINS` to allow your frontend to communicate with the backend.

```python
# backend/settings.py

INSTALLED_APPS = [
    # ...
    'rest_framework',
    'core',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # ...
]

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',  # Frontend URL
]
```

### Defining Models

Create models for `Persona` and `BlogPost` in `core/models.py`:

```python
# core/models.py

from django.db import models

class Persona(models.Model):
    name = models.CharField(max_length=100)
    data = models.JSONField()

    def __str__(self):
        return self.name

class BlogPost(models.Model):
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE, related_name='blog_posts')
    title = models.CharField(max_length=200, blank=True, null=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title or f"BlogPost {self.id}"
```

Apply the migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

### Creating Serializers

Define serializers to convert model instances to JSON and vice versa in `core/serializers.py`:

```python
# core/serializers.py

from rest_framework import serializers
from .models import Persona, BlogPost
from .utils import analyze_writing_sample
import logging

logger = logging.getLogger(__name__)

class PersonaSerializer(serializers.ModelSerializer):
    writing_sample = serializers.CharField(write_only=True)

    class Meta:
        model = Persona
        fields = ['id', 'name', 'writing_sample', 'data']
        read_only_fields = ['id', 'data']

    def create(self, validated_data):
        writing_sample = validated_data.pop('writing_sample')
        logger.debug(f"Writing sample received: {writing_sample[:100]}...")
        analyzed_data = analyze_writing_sample(writing_sample)
        logger.debug(f"Analyzed data: {analyzed_data}")
        if not analyzed_data:
            logger.error("Failed to analyze the writing sample.")
            raise serializers.ValidationError({"writing_sample": "Analysis failed."})
        validated_data['data'] = analyzed_data
        return Persona.objects.create(**validated_data)

class BlogPostSerializer(serializers.ModelSerializer):
    persona = serializers.StringRelatedField()

    class Meta:
        model = BlogPost
        fields = ['id', 'persona', 'title', 'content', 'created_at']
```

### Writing Utility Functions

Create utility functions in `core/utils.py` to interact with the AI language model and process responses:

```python
# core/utils.py

import logging
import requests
import json
import re
from decouple import config

logger = logging.getLogger(__name__)
OLLAMA_API_URL = config('OLLAMA_API_URL', default='http://localhost:11434/api/generate')

def extract_json(response_text):
    decoder = json.JSONDecoder()
    pos = 0
    while pos < len(response_text):
        try:
            obj, pos = decoder.raw_decode(response_text, pos)
            return obj
        except json.JSONDecodeError:
            pos += 1
    return None

# Building a Full-Stack Application with Django and React: A Step-by-Step Guide

In this comprehensive guide, we'll walk through the process of building a full-stack application using Django for the backend and React for the frontend. The application allows users to upload a writing sample, analyzes it using an AI language model, and generates blog posts in the style of the uploaded sample.

## Table of Contents

1. [Introduction](#introduction)
2. [Setting Up the Backend with Django](#setting-up-the-backend-with-django)
   - [Creating a Django Project](#creating-a-django-project)
   - [Configuring Settings](#configuring-settings)
   - [Defining Models](#defining-models)
   - [Creating Serializers](#creating-serializers)
   - [Writing Utility Functions](#writing-utility-functions)
   - [Building Views](#building-views)
   - [Setting Up URLs](#setting-up-urls)
3. [Setting Up the Frontend with React](#setting-up-the-frontend-with-react)
   - [Creating a React App](#creating-a-react-app)
   - [Configuring Axios](#configuring-axios)
   - [Building Components](#building-components)
   - [Integrating React Router](#integrating-react-router)
4. [Running and Testing the Application](#running-and-testing-the-application)
5. [Conclusion](#conclusion)

---

## Introduction

This guide aims to help you build a full-stack application that:

- **Backend (Django):**
  - Allows users to upload a writing sample.
  - Analyzes the writing sample using an AI language model.
  - Stores the analysis and allows generating new content based on the analysis.

- **Frontend (React):**
  - Provides a user interface to upload writing samples.
  - Displays a list of saved personas (analysis results).
  - Allows generating and viewing blog posts in the style of the uploaded samples.

---

## Setting Up the Backend with Django

### Creating a Django Project

First, ensure you have Python and Django installed. Create a new Django project and application:

```bash
django-admin startproject backend
cd backend
python manage.py startapp core
```

### Configuring Settings

Update the `backend/settings.py` file to include the necessary configurations:

- Add `rest_framework`, `core`, and `corsheaders` to `INSTALLED_APPS`.
- Configure middleware to include `CorsMiddleware`.
- Set up `CORS_ALLOWED_ORIGINS` to allow your frontend to communicate with the backend.

```python
# backend/settings.py

INSTALLED_APPS = [
    # ...
    'rest_framework',
    'core',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # ...
]

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',  # Frontend URL
]
```

### Defining Models

Create models for `Persona` and `BlogPost` in `core/models.py`:

```python
# core/models.py

from django.db import models

class Persona(models.Model):
    name = models.CharField(max_length=100)
    data = models.JSONField()

    def __str__(self):
        return self.name

class BlogPost(models.Model):
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE, related_name='blog_posts')
    title = models.CharField(max_length=200, blank=True, null=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title or f"BlogPost {self.id}"
```

Apply the migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

### Creating Serializers

Define serializers to convert model instances to JSON and vice versa in `core/serializers.py`:

```python
# core/serializers.py

from rest_framework import serializers
from .models import Persona, BlogPost
from .utils import analyze_writing_sample
import logging

logger = logging.getLogger(__name__)

class PersonaSerializer(serializers.ModelSerializer):
    writing_sample = serializers.CharField(write_only=True)

    class Meta:
        model = Persona
        fields = ['id', 'name', 'writing_sample', 'data']
        read_only_fields = ['id', 'data']

    def create(self, validated_data):
        writing_sample = validated_data.pop('writing_sample')
        logger.debug(f"Writing sample received: {writing_sample[:100]}...")
        analyzed_data = analyze_writing_sample(writing_sample)
        logger.debug(f"Analyzed data: {analyzed_data}")
        if not analyzed_data:
            logger.error("Failed to analyze the writing sample.")
            raise serializers.ValidationError({"writing_sample": "Analysis failed."})
        validated_data['data'] = analyzed_data
        return Persona.objects.create(**validated_data)

class BlogPostSerializer(serializers.ModelSerializer):
    persona = serializers.StringRelatedField()

    class Meta:
        model = BlogPost
        fields = ['id', 'persona', 'title', 'content', 'created_at']
```

### Writing Utility Functions

Create utility functions in `core/utils.py` to interact with the AI language model and process responses:

```python
# core/utils.py

import logging
import requests
import json
import re
from decouple import config

logger = logging.getLogger(__name__)
OLLAMA_API_URL = config('OLLAMA_API_URL', default='http://localhost:11434/api/generate')

def extract_json(response_text):
    decoder = json.JSONDecoder()
    pos = 0
    while pos < len(response_text):
        try:
            obj, pos = decoder.raw_decode(response_text, pos)
            return obj
        except json.JSONDecodeError:
            pos += 1
    return None

def analyze_writing_sample(writing_sample):
    encoding_prompt = f'''
Please analyze the writing style and personality of the given writing sample. Provide a detailed assessment of their characteristics using the following template. Rate each applicable characteristic on a scale of 1-10 where relevant, or provide a descriptive value. Return the results in a JSON format.


 "name": "[Author/Character Name]",
 "vocabulary_complexity": [1-10],
 "sentence_structure": "[simple/complex/varied]",
 "paragraph_organization": "[structured/loose/stream-of-consciousness]",
 "idiom_usage": [1-10],
 "metaphor_frequency": [1-10],
 "simile_frequency": [1-10],
 "tone": "[formal/informal/academic/conversational/etc.]",
 "punctuation_style": "[minimal/heavy/unconventional]",
 "contraction_usage": [1-10],
 "pronoun_preference": "[first-person/third-person/etc.]",
 "passive_voice_frequency": [1-10],
 "rhetorical_question_usage": [1-10],
 "list_usage_tendency": [1-10],
 "personal_anecdote_inclusion": [1-10],
 "pop_culture_reference_frequency": [1-10],
 "technical_jargon_usage": [1-10],
 "parenthetical_aside_frequency": [1-10],
 "humor_sarcasm_usage": [1-10],
 "emotional_expressiveness": [1-10],
 "emphatic_device_usage": [1-10],
 "quotation_frequency": [1-10],
 "analogy_usage": [1-10],
 "sensory_detail_inclusion": [1-10],
 "onomatopoeia_usage": [1-10],
 "alliteration_frequency": [1-10],
 "word_length_preference": "[short/long/varied]",
 "foreign_phrase_usage": [1-10],
 "rhetorical_device_usage": [1-10],
 "statistical_data_usage": [1-10],
 "personal_opinion_inclusion": [1-10],
 "transition_usage": [1-10],
 "reader_question_frequency": [1-10],
 "imperative_sentence_usage": [1-10],
 "dialogue_inclusion": [1-10],
 "regional_dialect_usage": [1-10],
 "hedging_language_frequency": [1-10],
 "language_abstraction": "[concrete/abstract/mixed]",
 "personal_belief_inclusion": [1-10],
 "repetition_usage": [1-10],
 "subordinate_clause_frequency": [1-10],
 "verb_type_preference": "[active/stative/mixed]",
 "sensory_imagery_usage": [1-10],
 "symbolism_usage": [1-10],
 "digression_frequency": [1-10],
 "formality_level": [1-10],
 "reflection_inclusion": [1-10],
 "irony_usage": [1-10],
 "neologism_frequency": [1-10],
 "ellipsis_usage": [1-10],
 "cultural_reference_inclusion": [1-10],
 "stream_of_consciousness_usage": [1-10],
 "openness_to_experience": [1-10],
 "conscientiousness": [1-10],
 "extraversion": [1-10],
 "agreeableness": [1-10],
 "emotional_stability": [1-10],
 "dominant_motivations": "[achievement/affiliation/power/etc.]",
 "core_values": "[integrity/freedom/knowledge/etc.]",
 "decision_making_style": "[analytical/intuitive/spontaneous/etc.]",
 "empathy_level": [1-10],
 "self_confidence": [1-10],
 "risk_taking_tendency": [1-10],
 "idealism_vs_realism": "[idealistic/realistic/mixed]",
 "conflict_resolution_style": "[assertive/collaborative/avoidant/etc.]",
"relationship_orientation": "[independent/communal/mixed]",
"emotional_response_tendency": "[calm/reactive/intense]",
"creativity_level": [1-10],
"age": "[age or age range]",
 "gender": "[gender]",
 "education_level": "[highest level of education]",
 "professional_background": "[brief description]",
 "cultural_background": "[brief description]",
 "primary_language": "[language]",
 "language_fluency": "[native/fluent/intermediate/beginner]",
 "background": "[A brief paragraph describing the author's context, major influences, and any other relevant information not captured above]"


Writing Sample:
{writing_sample}
'''

    payload = {
        'model': 'llama3.2',  # Replace with your Ollama model name
        'prompt': encoding_prompt,
        'stream': False
    }
    headers = {'Content-Type': 'application/json'}

    try:
        response = requests.post(OLLAMA_API_URL, json=payload, headers=headers)
        response.raise_for_status()
        json_str = re.search(r'\{.*?\}', response.text, re.DOTALL).group()
        analyzed_data = extract_json(response.text)
        if analyzed_data is None:
            logger.error("No JSON object found in the response.")
            return None
        return analyzed_data
    except (requests.RequestException, json.JSONDecodeError, AttributeError) as e:
        logger.error(f"Error during analyze_writing_sample: {str(e)}")
        return None

def generate_content(persona_data, prompt):
    decoding_prompt = f'''
You are to write a blog post in the style of {persona_data.get('name', 'Unknown Author')}, a writer with the following characteristics:

{json.dumps(persona_data, indent=2)}

Now, please write a response in this style about the following topic:
"{prompt}"
Begin with a compelling title that reflects the content of the post.
'''

    payload = {
        'model': 'llama3.2',  # Replace with your Ollama model name
        'prompt': decoding_prompt,
        'stream': False
    }
    headers = {'Content-Type': 'application/json'}

    try:
        logger.info(f"Sending request to OLLAMA API at {OLLAMA_API_URL} with payload: {payload}")
        response = requests.post(OLLAMA_API_URL, json=payload, headers=headers)
        logger.info(f"Received response from OLLAMA API: Status Code {response.status_code}")

        response.raise_for_status()

        response_json = response.json()
        response_content = response_json.get('response', '').strip()
        if not response_content:
            logger.error("OLLAMA API response 'response' field is empty.")
            return ''

        return response_content

    except requests.RequestException as e:
        logger.error(f"Error during generate_content: {e}")
        if hasattr(e, 'response') and e.response:
            logger.error(f"Ollama Response Status: {e.response.status_code}")
            logger.error(f"Ollama Response Body: {e.response.text}")
        return ''

**Note:** Replace the placeholders in `analyze_writing_sample` and `generate_content` with actual logic to interact with your AI model.

### Building Views

Create views to handle API requests in `core/views.py`:

```python
# core/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .serializers import PersonaSerializer, BlogPostSerializer
from .models import Persona, BlogPost
from .utils import generate_content
import logging

logger = logging.getLogger(__name__)

class AnalyzeWritingSampleView(APIView):
    def post(self, request):
        serializer = PersonaSerializer(data=request.data)
        if serializer.is_valid():
            persona = serializer.save()
            return Response(PersonaSerializer(persona).data, status=status.HTTP_201_CREATED)
        else:
            logger.error(f"Validation failed: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GenerateContentView(APIView):
    def post(self, request):
        # [Your logic to generate content]
        pass

class PersonaListView(generics.ListAPIView):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer

class PersonaDetailView(APIView):
    def get(self, request, persona_id):
        # [Your logic to retrieve a persona]
        pass

class BlogPostView(generics.ListAPIView):
    queryset = BlogPost.objects.all().order_by('-created_at')
    serializer_class = BlogPostSerializer
```

### Setting Up URLs

Define API endpoints in `core/urls.py`:

```python
# core/urls.py

from django.urls import path
from .views import (
    AnalyzeWritingSampleView,
    GenerateContentView,
    PersonaListView,
    PersonaDetailView,
    BlogPostView
)

urlpatterns = [
    path('analyze/', AnalyzeWritingSampleView.as_view(), name='analyze-writing-sample'),
    path('generate/', GenerateContentView.as_view(), name='generate-content'),
    path('personas/', PersonaListView.as_view(), name='persona-list'),
    path('personas/<int:persona_id>/', PersonaDetailView.as_view(), name='persona-detail'),
    path('blog-posts/', BlogPostView.as_view(), name='blog-posts'),
]
```

Include the core app's URLs in the project's `urls.py`:

```python
# backend/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
]
```

---

## Setting Up the Frontend with React

### Creating a React App

Ensure you have Node.js and npm installed. Create a new React application:

```bash
npx create-react-app frontend --template typescript
cd frontend
```

Update `package.json` to include necessary dependencies:

```json
// frontend/package.json

{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    // ...
    "axios": "^1.7.7",
    "react-router-dom": "^6.27.0"
  },
  // ...
}
```

Install the new dependencies:

```bash
npm install
```

### Configuring Axios

Create an Axios instance for consistent API calls in `src/axiosConfig.ts`:

```typescript
// src/axiosConfig.ts

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',  // Backend URL
});

export default instance;
```

### Building Components

Create the following components:

#### UploadSample Component

Allows users to upload a writing sample.

```typescript
// src/components/UploadSample.tsx

import React, { useState } from 'react';
import axios from '../axiosConfig';

const UploadSample: React.FC = () => {
  const [name, setName] = useState('');
  const [writingSample, setWritingSample] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // [Your form submission logic here]
  };

  return (
    <div>
      <h2>Upload Writing Sample</h2>
      {/* [Your form JSX here] */}
    </div>
  );
};

export default UploadSample;
```

#### PersonaList Component

Displays a list of saved personas.

```typescript
// src/components/PersonaList.tsx

import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const PersonaList: React.FC = () => {
  // [Your component logic here]
};

export default PersonaList;
```

#### GenerateContent Component

Allows generating content based on a selected persona.

```typescript
// src/components/GenerateContent.tsx

import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useSearchParams } from 'react-router-dom';

const GenerateContent: React.FC = () => {
  // [Your component logic here]
};

export default GenerateContent;
```

#### BlogPosts Component

Displays generated blog posts.

```typescript
// src/components/BlogPosts.tsx

import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const BlogPosts: React.FC = () => {
  // [Your component logic here]
};

export default BlogPosts;
```

### Integrating React Router

Set up routing in `src/App.tsx`:

```typescript
// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadSample from './components/UploadSample';
import PersonaList from './components/PersonaList';
import GenerateContent from './components/GenerateContent';
import BlogPosts from './components/BlogPosts';

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Upload Sample</Link></li>
          <li><Link to="/personas">Personas</Link></li>
          <li><Link to="/blog-posts">Blog Posts</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<UploadSample />} />
        <Route path="/personas" element={<PersonaList />} />
        <Route path="/generate" element={<GenerateContent />} />
        <Route path="/blog-posts" element={<BlogPosts />} />
      </Routes>
    </Router>
  );
};

export default App;
```

---

## Running and Testing the Application

### Starting the Backend

In the `backend` directory, start the Django development server:

```bash
python manage.py runserver
```

### Starting the Frontend

In the `frontend` directory, start the React development server:

```bash
npm start
```

### Testing the Application

1. **Upload a Writing Sample:**
   - Navigate to `http://localhost:3000/`.
   - Fill in the persona name and paste a writing sample.
   - Submit the form to create a new persona.

2. **View Saved Personas:**
   - Navigate to `http://localhost:3000/personas`.
   - See the list of personas you've created.

3. **Generate Content:**
   - From the personas list, click "Generate Content" next to a persona.
   - Enter a prompt or topic.
   - Generate content styled after the selected persona.

4. **View Blog Posts:**
   - Navigate to `http://localhost:3000/blog-posts`.
   - Read the generated blog posts.

---

## Conclusion

Congratulations! You've built a full-stack application that leverages the power of AI language models to analyze writing samples and generate content. This guide covered setting up the backend with Django, creating RESTful APIs, and building a responsive frontend with React.

**Next Steps:**

- **Enhancements:**
  - Implement user authentication.
  - Add pagination to the list views.
  - Improve error handling and input validation.

- **Deployment:**
  - Deploy the backend using services like Heroku or DigitalOcean.
  - Deploy the frontend using Netlify or Vercel.

- **Learning:**
  - Explore more features of Django REST framework.
  - Dive deeper into React hooks and state management.

---

**References:**

- [Django Documentation](https://docs.djangoproject.com/en/5.1/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Axios Documentation](https://axios-http.com/)

---

*Disclaimer: This guide assumes you have a basic understanding of Python, Django, JavaScript, and React. Adjustments may be necessary based on the specific versions of the tools and libraries you are using.*

**Note:** Replace the placeholders in `analyze_writing_sample` and `generate_content` with actual logic to interact with your AI model.

### Building Views

Create views to handle API requests in `core/views.py`:

```python
# core/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .serializers import PersonaSerializer, BlogPostSerializer
from .models import Persona, BlogPost
from .utils import generate_content
import logging

logger = logging.getLogger(__name__)

class AnalyzeWritingSampleView(APIView):
    def post(self, request):
        serializer = PersonaSerializer(data=request.data)
        if serializer.is_valid():
            persona = serializer.save()
            return Response(PersonaSerializer(persona).data, status=status.HTTP_201_CREATED)
        else:
            logger.error(f"Validation failed: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GenerateContentView(APIView):
    def post(self, request):
        # [Your logic to generate content]
        pass

class PersonaListView(generics.ListAPIView):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer

class PersonaDetailView(APIView):
    def get(self, request, persona_id):
        # [Your logic to retrieve a persona]
        pass

class BlogPostView(generics.ListAPIView):
    queryset = BlogPost.objects.all().order_by('-created_at')
    serializer_class = BlogPostSerializer
```

### Setting Up URLs

Define API endpoints in `core/urls.py`:

```python
# core/urls.py

from django.urls import path
from .views import (
    AnalyzeWritingSampleView,
    GenerateContentView,
    PersonaListView,
    PersonaDetailView,
    BlogPostView
)

urlpatterns = [
    path('analyze/', AnalyzeWritingSampleView.as_view(), name='analyze-writing-sample'),
    path('generate/', GenerateContentView.as_view(), name='generate-content'),
    path('personas/', PersonaListView.as_view(), name='persona-list'),
    path('personas/<int:persona_id>/', PersonaDetailView.as_view(), name='persona-detail'),
    path('blog-posts/', BlogPostView.as_view(), name='blog-posts'),
]
```

Include the core app's URLs in the project's `urls.py`:

```python
# backend/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
]
```

---

## Setting Up the Frontend with React

### Creating a React App

Ensure you have Node.js and npm installed. Create a new React application:

```bash
npx create-react-app frontend --template typescript
cd frontend
```

Update `package.json` to include necessary dependencies:

```json
// frontend/package.json

{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    // ...
    "axios": "^1.7.7",
    "react-router-dom": "^6.27.0"
  },
  // ...
}
```

Install the new dependencies:

```bash
npm install
```

### Configuring Axios

Create an Axios instance for consistent API calls in `src/axiosConfig.ts`:

```typescript
// src/axiosConfig.ts

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',  // Backend URL
});

export default instance;
```

### Building Components

Create the following components:

#### UploadSample Component

Allows users to upload a writing sample.

```typescript
// src/components/UploadSample.tsx

import React, { useState } from 'react';
import axios from '../axiosConfig';

const UploadSample: React.FC = () => {
  const [name, setName] = useState('');
  const [writingSample, setWritingSample] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // [Your form submission logic here]
  };

  return (
    <div>
      <h2>Upload Writing Sample</h2>
      {/* [Your form JSX here] */}
    </div>
  );
};

export default UploadSample;
```

#### PersonaList Component

Displays a list of saved personas.

```typescript
// src/components/PersonaList.tsx

import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const PersonaList: React.FC = () => {
  // [Your component logic here]
};

export default PersonaList;
```

#### GenerateContent Component

Allows generating content based on a selected persona.

```typescript
// src/components/GenerateContent.tsx

import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useSearchParams } from 'react-router-dom';

const GenerateContent: React.FC = () => {
  // [Your component logic here]
};

export default GenerateContent;
```

#### BlogPosts Component

Displays generated blog posts.

```typescript
// src/components/BlogPosts.tsx

import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const BlogPosts: React.FC = () => {
  // [Your component logic here]
};

export default BlogPosts;
```

### Integrating React Router

Set up routing in `src/App.tsx`:

```typescript
// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadSample from './components/UploadSample';
import PersonaList from './components/PersonaList';
import GenerateContent from './components/GenerateContent';
import BlogPosts from './components/BlogPosts';

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Upload Sample</Link></li>
          <li><Link to="/personas">Personas</Link></li>
          <li><Link to="/blog-posts">Blog Posts</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<UploadSample />} />
        <Route path="/personas" element={<PersonaList />} />
        <Route path="/generate" element={<GenerateContent />} />
        <Route path="/blog-posts" element={<BlogPosts />} />
      </Routes>
    </Router>
  );
};

export default App;
```

---

## Running and Testing the Application

### Starting the Backend

In the `backend` directory, start the Django development server:

```bash
python manage.py runserver
```

### Starting the Frontend

In the `frontend` directory, start the React development server:

```bash
npm start
```

### Testing the Application

1. **Upload a Writing Sample:**
   - Navigate to `http://localhost:3000/`.
   - Fill in the persona name and paste a writing sample.
   - Submit the form to create a new persona.

2. **View Saved Personas:**
   - Navigate to `http://localhost:3000/personas`.
   - See the list of personas you've created.

3. **Generate Content:**
   - From the personas list, click "Generate Content" next to a persona.
   - Enter a prompt or topic.
   - Generate content styled after the selected persona.

4. **View Blog Posts:**
   - Navigate to `http://localhost:3000/blog-posts`.
   - Read the generated blog posts.

---

## Conclusion

Congratulations! You've built a full-stack application that leverages the power of AI language models to analyze writing samples and generate content. This guide covered setting up the backend with Django, creating RESTful APIs, and building a responsive frontend with React.

**Next Steps:**

- **Enhancements:**
  - Implement user authentication.
  - Add pagination to the list views.
  - Improve error handling and input validation.

- **Deployment:**
  - Deploy the backend using services like Heroku or DigitalOcean.
  - Deploy the frontend using Netlify or Vercel.

- **Learning:**
  - Explore more features of Django REST framework.
  - Dive deeper into React hooks and state management.

---

**References:**

- [Django Documentation](https://docs.djangoproject.com/en/5.1/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Axios Documentation](https://axios-http.com/)

---

*Disclaimer: This guide assumes you have a basic understanding of Python, Django, JavaScript, and React. Adjustments may be necessary based on the specific versions of the tools and libraries you are using.*