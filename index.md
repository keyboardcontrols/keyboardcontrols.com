---
title: Home
---

<center><h1>Games</h1></center>

<div class="row">
    {% for game in site.games %}
        <div class="card" style="width:20%; margin:0 10px;">
            <img class="card-img-top" src="" alt="game">
            <div class="card-block">
                <a class="card-link" href="{{ game.url }}">
                    {{ game.title }}
                </a>
                <p class="card-text"></p>
            </div>
        </div>
    {% endfor %}
</div>