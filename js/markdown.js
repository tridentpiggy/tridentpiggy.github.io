function Markdown(md) {
    const meta = ParseFrontMatter(md);

    md = meta.content;

    let html = md;

    const blocks = [];

    html = html.replace(
        /```([\s\S]*?)```/g,
        function(match, code) {
            const id = blocks.length;

            blocks.push(
                "<pre><code>" +
                escapeHTML(code.trim()) +
                "</code></pre>"
            );

            return "%%BLOCK" + id + "%%";
        }
    );

    html = escapeHTML(html);

    html = html.replace(
        /^###### (.*)$/gm,
        "<h6>$1</h6>"
    );

    html = html.replace(
        /^##### (.*)$/gm,
        "<h5>$1</h5>"
    );

    html = html.replace(
        /^#### (.*)$/gm,
        "<h4>$1</h4>"
    );

    html = html.replace(
        /^### (.*)$/gm,
        "<h3>$1</h3>"
    );

    html = html.replace(
        /^## (.*)$/gm,
        "<h2>$1</h2>"
    );

    html = html.replace(
        /^# (.*)$/gm,
        "<h1>$1</h1>"
    );


    html = html.replace(
        /---/g,
        "<hr>"
    );


    html = html.replace(
        /`([^`]+)`/g,
        "<code>$1</code>"
    );


    html = html.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );


    html = html.replace(
        /\*(.*?)\*/g,
        "<em>$1</em>"
    );


    html = html.replace(
        /~~(.*?)~~/g,
        "<del>$1</del>"
    );


    html = html.replace(
        /!\[(.*?)\]\((.*?)\)/g,
        "<img src=\"$2\" alt=\"$1\">"
    );


    html = html.replace(
        /\[(.*?)\]\((.*?)\)/g,
        "<a href=\"$2\">$1</a>"
    );


    html = html.replace(
        /^> (.*)$/gm,
        "<blockquote>$1</blockquote>"
    );


    html = html.replace(
        /^- (.*)$/gm,
        "<li>$1</li>"
    );


    html = html.replace(
        /(<li>.*<\/li>)/gs,
        "<ul>$1</ul>"
    );


    html = html.replace(
        /\n\n/g,
        "</p><p>"
    );


    html =
        "<p>" +
        html +
        "</p>";


    html = html.replace(
        /\n/g,
        "<br>"
    );


    html = html.replace(
        /%%BLOCK(\d+)%%/g,
        function(match,id) {
            return blocks[id];
        }
    );


    return {
        html:html,
        meta:meta.data
    };
}


function ParseFrontMatter(text) {
    const result = {
        data:{},
        content:text
    };


    if (!text.startsWith("---")) {
        return result;
    }


    const end =
        text.indexOf(
            "---",
            3
        );


    if (end === -1) {
        return result;
    }


    const header =
        text.substring(
            3,
            end
        );


    header
        .split("\n")
        .forEach(line => {

            const pair =
                line.split(":");


            if (pair.length >= 2) {

                result.data[
                    pair[0].trim()
                ] =
                    pair.slice(1)
                    .join(":")
                    .trim();

            }

        });


    result.content =
        text.substring(
            end + 3
        );


    return result;
}


function escapeHTML(text) {
    return text
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;");
}