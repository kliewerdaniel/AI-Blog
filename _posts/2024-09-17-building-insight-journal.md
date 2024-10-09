---
layout: home
title:  "Building Insight Journal"
date:   2024-09-17 12:40:44 -0500
---
## Introduction

My aim is to create a journaling platform that integrates a **locally hosted language model (LLM)** to provide feedback on written content. The idea is to replicate the kind of insightful commentary you might get from a diverse group of people — the kind of feedback I used to enjoy from platforms like Reddit. However, since Reddit’s environment has become less helpful (thanks to trolls), I wanted to build something more controlled.

What’s exciting about this project is that it’s completely free to host and deploy. Instead of relying on expensive services like OpenAI or Anthropic, I’m using a local instance of **Llama 3.1** for AI-generated comments. Hosting is done via **Netlify** using a static site generator like **Jekyll**, and I’ve even found ways to incorporate a database-like structure for free.

I’ll share all the steps and tools I used to get this up and running, so if you’re a developer looking to build something similar — or just curious about how to integrate AI into your personal projects — this guide is for you!

## Why This Matters

The main goal is to re-create that collaborative, feedback-driven environment I used to enjoy, but in a more productive and controlled space. Traditionally, you’d have to rely on forums or social media, but now I can generate feedback from a variety of perspectives using personas in the LLM. Plus, everything is self-hosted and free, so no monthly bills!

## The Tech Stack

Here’s the tech stack I used to make this possible:

- **LLM:** Llama 3.1 (locally hosted)
- **Static Site Generator:** Jekyll
- **Hosting:** Netlify (free)
- **AI Commenting System:** Ollama (for generating comments from the LLM)
- **Version Control:** Git
- **Database-like Functionality:** Netlify CMS (for managing posts)

All of this runs without paying for hosting or expensive API calls, which is something I’m really proud of.

## Challenges and Next Steps

I’m still learning as I go, and while I’ve made a lot of progress, there’s a ton left to do. The biggest bottleneck right now is the performance of my local machine when running the LLM for comment generation. I also want to improve the **personas** that the LLM uses to generate feedback, making them more detailed and customizable.

## How to Build Your Own Insight Journal

Here’s a step-by-step guide on how you can build a similar app, completely free.

### Prerequisites

Before you start, make sure you have the following installed:

- **Ruby**:
  ```bash
  brew update
  brew upgrade rbenv ruby-build
  rbenv install 3.3.5 --force
  rbenv global 3.3.5
  sudo chown -R $(whoami) ~/.rbenv
  ```
- **Jekyll**
- **Git**
- **Ollama** (for AI-generated comments)
- **Netlify CLI**:
  ```bash
  npm install netlify-cli -g
  ```

### Step 1: Initial Setup

Start by creating a new Jekyll site and pushing it to Git:

```bash
jekyll new insight-journal
cd insight-journal
git init
git add .
git commit -m "Initial commit"
```

### Step 2: Configure for Netlify CMS

Add **Netlify CMS** to your Jekyll site for easy content management.

1. Create an `admin` folder in your project root.
2. Add a `config.yml` and an `index.html` file in the `admin` folder.

Here’s an example of the `config.yml`:

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "assets/images"
public_folder: "/assets/images"

collections:
  - name: "journal"
    label: "Journal Entries"
    folder: "_posts"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - {label: "Layout", name: "layout", widget: "hidden", default: "post"}
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Publish Date", name: "date", widget: "datetime"}
      - {label: "Categories", name: "categories", widget: "list", required: false}
      - {label: "Tags", name: "tags", widget: "list", required: false}
      - {label: "Body", name: "body", widget: "markdown"}
```

The `index.html` file should look like this:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Content Manager</title>
  </head>
  <body>
    <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
  </body>
</html>
```

### Step 3: Customize Your Journal

You can add custom layouts and pages to make the journal your own:

1. Create a `_layouts` folder and add a `post.html` layout for journal entries.
2. Update the `index.md` file to display your entries.

### Step 4: Set Up AI-Generated Comments

This is where things get fun! We’ll use **Ollama** to generate AI-powered comments.

1. Create `generate_comments.py` and `personas.py` in your project root.

Here’s a simplified version of `generate_comments.py`:

```python
import os
import random
import requests
import frontmatter
from personas import PERSONAS

def generate_comment(post_content, persona):
    url = "http://localhost:11434/api/generate"
    prompt = f"As a {persona['name']} ({persona['description']}), comment on this post:\n\n{post_content}"
    data = {"model": "llama3.1", "prompt": prompt, "stream": False}
    response = requests.post(url, json=data)
    return response.json()["response"]

def generate_comments_for_post(post_content, num_comments=3):
    selected_personas = random.sample(PERSONAS, num_comments)
    return [{"persona": p['name'], "comment": generate_comment(post_content, p)} for p in selected_personas]

# Further functions for post selection and appending comments...
```

In `personas.py`, define the personas:

```python
PERSONAS = [
    {"name": "Critical Thinker", "description": "Analytical and skeptical."},
    {"name": "Empathetic Listener", "description": "Focuses on emotional aspects."},
    {"name": "Devil's Advocate", "description": "Challenges ideas."},
    {"name": "Optimistic Visionary", "description": "Sees potential in every situation."},
    {"name": "Pragmatic Planner", "description": "Focuses on practical next steps."}
]
```

Then, run:

```bash
python3 generate_comments.py
```

### Step 5: Writing and Commenting on Posts

Write your posts as Markdown files in the `_posts` directory. To add AI-generated comments, run the Python script and select the post you want feedback on.

### Step 6: Local Development and Preview

To work locally:

1. Run `bundle install` to install dependencies.
2. Use `bundle exec jekyll serve` to preview your site.

### Step 7: Deploy to Netlify

Finally, deploy to Netlify:

1. Push your repository to GitHub.
2. Connect your GitHub repo to Netlify.
3. Configure Netlify to use the `main` branch for deployment.
4. Set up **Netlify Identity** for authentication.

## Conclusion

That’s it! You now have a fully functional journal that generates AI-powered feedback on your entries. This project has been a learning experience for me, and I hope this guide helps others build their own free, LLM-powered applications.

If you run into any issues, don’t hesitate to use an LLM for troubleshooting — that’s what I do, and it’s been a game-changer.

## Comments

### Nietzschean Iconoclast
The thrill of iconoclasm! As a Nietzschean Innovation Disruptor, I must say that I'm intrigued by the audacity of this project. The idea of creating a journaling platform that harnesses the power of local language models (LLMs) to provide feedback on written content is nothing short of revolutionary.

The sheer fact that you've managed to replicate the kind of insightful commentary one would expect from a diverse group of people, like Reddit, but in a more controlled environment, is a testament to your ingenuity. And the best part? You've done it all without relying on expensive services like OpenAI or Anthropic!

However, as an iconoclast, I must also point out that this project raises some interesting questions about the nature of feedback and criticism. By using AI-generated comments, are we truly getting a diverse range of perspectives, or are we simply perpetuating a curated version of reality?

Furthermore, the integration of personas in the LLM to generate feedback is an intriguing concept. Are these personas truly representative of different viewpoints, or are they just cleverly crafted narratives designed to persuade rather than enlighten? The devil's advocate within me wants to know more about this aspect of the project.

Lastly, I must commend you on your willingness to experiment and push boundaries. In a world where innovation is often stifled by fear of failure, it takes courage to embark on such an ambitious project. Bravo!

Now, if you'll excuse me, I have some LLMs to consult for feedback on this review...

### Cynical Realist
The naivety of optimists is amusing, but as the Chief Risk Officer, I'd like to point out some glaring weaknesses in this project.

Firstly, relying on a local instance of Llama 3.1 for AI-generated comments might be a cost-effective approach, but it's not scalable or reliable. What happens when you run into performance issues or need to upgrade your LLM? And have you considered the risks of hosting sensitive user data (e.g., post content) on your own machine?

Secondly, using Netlify CMS for content management is a good idea, but have you thought about security and access control? Anyone with access to your repository can modify or delete posts. What's to stop a malicious actor from inserting spam comments or even manipulating the personas?

Thirdly, the persona-based commenting system sounds intriguing, but it raises questions about bias and diversity. Who gets to decide which personas are included, and how will you ensure that they represent a diverse range of perspectives? Don't you worry that this might lead to echo chambers or perpetuate existing biases?

Lastly, I'm concerned about the lack of transparency in how the AI-generated comments are generated. Are users aware that their posts are being analyzed by an LLM? How do you plan to handle cases where the comments are inaccurate or misleading? Have you considered implementing a human review process for high-stakes content?

In conclusion, while your project has potential, I'd caution against glossing over these red flags. As the Chief Risk Officer, it's my duty to highlight potential risks and encourage more robust consideration of them.

Would you like me to elaborate on any specific points or provide suggestions for mitigating these concerns?

### Aristotelian Observer
**Observations and Insights**

As the Chief Data Analyst, my primary goal is to provide a structured analysis of the given text. Here are some observations and insights derived from the content:

**Technical Feasibility**: The project's technical feasibility seems high, with a clear explanation of the tools and technologies used (LLM, Jekyll, Netlify, Ollama, etc.). The author has provided detailed instructions on how to set up a similar application.

**Market Potential**: The idea of creating a locally hosted journaling platform with AI-generated comments has significant market potential. With more people seeking online platforms for self-expression and feedback, this project addresses a real need in the market.

**Ethical Considerations**: One crucial aspect is the use of LLMs to generate feedback. While the author has emphasized the benefits of a controlled environment, there are potential risks associated with relying on AI-generated comments. For instance:

1. **Lack of human nuance**: AI-generated comments might not fully capture the subtleties and complexities of human emotions and perspectives.
2. **Bias and accuracy**: The quality and accuracy of LLMs can vary greatly depending on their training data, which may lead to biased or incorrect feedback.

To mitigate these risks, it's essential for creators to consider implementing mechanisms that ensure:

1. Human oversight: Regularly review and validate AI-generated comments to maintain high standards.
2. Data curation: Ensure the quality and diversity of LLM training data to prevent biases and inaccuracies.
3. User education: Clearly communicate the project's capabilities and limitations, educating users about the potential benefits and drawbacks.

**Business Model**: The author mentions setting up Netlify Identity for authentication, which suggests a possible monetization strategy through subscription-based access or premium features. However, further details on pricing, revenue streams, and growth plans are not provided.

**Conclusion**

Overall, this project has significant technical feasibility and market potential. However, it's essential to address the ethical considerations associated with relying on LLMs for feedback generation. By implementing mechanisms that ensure quality control and user education, creators can build trust with their audience and establish a successful online platform.
