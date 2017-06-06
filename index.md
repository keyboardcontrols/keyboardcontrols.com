---
title: Home
---

<center><h1>Home</h1></center>

<div>
    {% for game in site.games %}
        <p class="h4"><a href="{{ game.url }}">{{ game.title }}</a></p>
        <time class="game-date"></time>
        <p>{{ game.excerpt }}</p>
    {% endfor %}
</div>