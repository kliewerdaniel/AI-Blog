---
layout: default
title: Stories
permalink: /stories/
---

{% assign index_story = site.stories | where: "path", "_stories/index.md" | first %}
{{ index_story.content }}
