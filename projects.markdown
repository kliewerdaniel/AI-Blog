---
layout: page
title: Projects
permalink: /projects/
description: Explore Daniel Kliewer's significant projects and open-source initiatives in AI, machine learning, and software development.
---

Explore my significant projects and open-source initiatives.

<div class="projects-grid">
  <div class="project-card">
    <h2>GhostWriter</h2>
    <p>An open-source initiative designed to help writers and content creators generate high-quality content with the assistance of AI.</p>
    <a href="/2024/10/24/Ghost-Writer.html" class="button">Learn More</a>
  </div>
  
  <div class="project-card">
    <h2>AI Agents</h2>
    <p>A collection of AI agent implementations for various tasks and applications.</p>
    <a href="/2024/10/30/Creating-AI-Agents.html" class="button">Learn More</a>
  </div>
  
  <div class="project-card">
    <h2>Data Annotation Platform</h2>
    <p>A platform for annotating and labeling data for machine learning models.</p>
    <a href="/2024/11/21/Build-a-data-annotation-platform.html" class="button">Learn More</a>
  </div>
  
  <div class="project-card">
    <h2>Persona Generator</h2>
    <p>A tool for generating realistic personas for user research and marketing.</p>
    <a href="/2024/11/27/Enhanced-Persona-Generator.html" class="button">Learn More</a>
  </div>
</div>

<style>
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }
  
  .project-card {
    background-color: #fff;
    border-radius: 4px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
  }
  
  .project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  }
  
  .project-card h2 {
    margin-top: 0;
    color: #042b6e;
  }
  
  .project-card p {
    flex-grow: 1;
    margin-bottom: 1.5rem;
  }
  
  .project-card .button {
    align-self: flex-start;
  }
  
  @media (max-width: 768px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
