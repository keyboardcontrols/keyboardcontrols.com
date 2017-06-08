---
title: Home
---

<center><h1>Games</h1></center>

<div>
    {% for game in site.games %}
        <div class="card" style="width: 20rem;">
            <img class="card-img-top" src="..." alt="Card image cap">
            <div class="card-block">
                <h4 class="card-title">{{ game.title }}</h4>
                <p class="card-text"></p>
            </div>
        </div>
    {% endfor %}
</div>