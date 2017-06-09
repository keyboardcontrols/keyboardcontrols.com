---
title: Home
---

<center><h1>Games</h1></center>

<div class="row">
    {% for game in site.games %}
        <div class="card" style="width: 20rem;">
            <img class="card-img-top" src="..." alt="Card image cap">
            <div class="card-block">
                <a class="card-link" href="{{ game.url }}">
                    {{ game.title }}
                </a>
                <p class="card-text"></p>
            </div>
        </div>
    {% endfor %}
</div>