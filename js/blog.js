function LoadPosts() {
    const container = document.getElementById("posts");

    if (!container) {
        return;
    }

    const colors = [
        "#0078d7",
        "#e81123",
        "#107c10",
        "#5c2d91",
        "#ff8c00",
        "#008272",
        "#00b7c3",
        "#ca5010"
    ];

    Posts.forEach(post => {
        createPostTile(
            container,
            post,
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ]
        );
    });

    const flipTexts = [
        "Windows狂烈爱好者",
        "Fluent Design",
        "My Blog",
        "敬请投币",
        "HTML",
        "B站好玩",
        "JavaScript",
        "Windows",
        "TridentPiggy"
    ];

    for (let i = 0; i < 8; i++) {
        createFlipTile(
            container,
            flipTexts[
                Math.floor(
                    Math.random() * flipTexts.length
                )
            ],
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ]
        );
    }
}


function createPostTile(container, post, color) {
    const tile = document.createElement("a");

    tile.className = "post-tile";
    tile.href = "post.html?id=" + post.id;

    tile.style.background = color;

    tile.innerHTML = `
        <div class="tile-title">
            ${post.title}
        </div>
    `;

    container.appendChild(tile);
}


function createFlipTile(container, text, color) {
    const tile = document.createElement("div");

    tile.className = "flip-tile";

    tile.style.setProperty(
        "--color",
        color
    );

    tile.style.animationDelay =
        Math.random() * 5 + "s";

    tile.innerHTML = `
        <div class="flip-inner">
            <div class="flip-front"></div>
            <div class="flip-back">
                ${text}
            </div>
        </div>
    `;

    container.appendChild(tile);
}


LoadPosts();