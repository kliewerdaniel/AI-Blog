---
layout: default
title: Stories
permalink: /stories/
---

# Interactive Adventure Stories

Welcome to our collection of AI-generated adventure stories set in the Amazon rainforest. Each story segment offers multiple paths, allowing you to choose your own adventure through a series of interconnected narratives.

## Begin Your Journey

Choose your starting point from the stories below:

{% for story in site.stories %}
{% if story.url != "/stories/" %}
* [{{ story.title | default: story.url }}]({{ story.url }})
{% endif %}
{% endfor %}
