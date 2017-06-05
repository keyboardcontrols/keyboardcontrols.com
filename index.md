---
title: Home
---

<center><h1>Home</h1></center>

<div>
    {% for article in site.articles %}
        <p class="h4"><a href="{{ article.url }}">{{ article.title }}</a></p>
        <time class="article-date"></time>
        <p>{{ article.excerpt }}</p>
    {% endfor %}
</div>