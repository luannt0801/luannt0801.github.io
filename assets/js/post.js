// assets/js/post.js
// Progressive enhancement for article pages. Markdown is rendered by Jekyll
// (kramdown + Rouge); this script only decorates that HTML, so content order
// and code text are never changed.

(function () {
    const prose = document.querySelector(".prose");
    if (!prose) return;

    // --- Figures: standalone images -> <figure> with optional caption ---
    // Syntax in Markdown:  ![alt text](/path.png "Caption"){: .inline}
    // Images always stay inside the text column; .wide/.full are retired and just dropped.
    const LAYOUT_CLASSES = ["inline", "small"];
    const RETIRED_CLASSES = ["wide", "full", "center"];

    function isImageOnlyParagraph(p) {
        return Array.from(p.childNodes).every(node => {
            if (node.nodeType === Node.TEXT_NODE) return node.textContent.trim() === "";
            if (node.nodeName === "BR") return true;
            if (node.nodeName === "IMG") return true;
            return node.nodeName === "A" && node.children.length === 1 && node.firstElementChild.nodeName === "IMG";
        });
    }

    // Obsidian writes vault-relative links ("assets/imgs_post/x.png"); make them site-absolute
    prose.querySelectorAll('img[src^="assets/"]').forEach(img => {
        img.src = "/" + img.getAttribute("src");
    });

    function buildFigure(media) {
        const img = media.nodeName === "IMG" ? media : media.querySelector("img");
        const figure = document.createElement("figure");

        LAYOUT_CLASSES.forEach(cls => {
            if (img.classList.contains(cls)) {
                figure.classList.add(cls);
                img.classList.remove(cls);
            }
        });
        RETIRED_CLASSES.forEach(cls => img.classList.remove(cls));

        img.loading = "lazy";
        img.decoding = "async";
        figure.appendChild(media);

        const caption = img.getAttribute("title");
        if (caption) {
            const figcaption = document.createElement("figcaption");
            figcaption.textContent = caption;
            figure.appendChild(figcaption);
            img.removeAttribute("title");
        }
        return figure;
    }

    prose.querySelectorAll("p").forEach(p => {
        if (!p.querySelector("img") || !isImageOnlyParagraph(p)) return;
        const media = Array.from(p.children).filter(el => el.nodeName !== "BR");
        const figures = media.map(buildFigure);
        p.replaceWith(...figures);
    });

    // --- Code blocks: toolbar (language, file title, wrap, copy) + line numbers ---
    // Optional attributes in Markdown, on the line right after the closing fence:
    //   {: .line-numbers data-title="train.py"}
    const LANGUAGE_NAMES = {
        py: "Python", python: "Python", js: "JavaScript", javascript: "JavaScript",
        ts: "TypeScript", typescript: "TypeScript", c: "C", cpp: "C++", "c++": "C++",
        java: "Java", bash: "Bash", sh: "Shell", shell: "Shell", console: "Console",
        powershell: "PowerShell", ps1: "PowerShell", sql: "SQL", json: "JSON",
        yaml: "YAML", yml: "YAML", html: "HTML", css: "CSS", latex: "LaTeX", tex: "LaTeX",
        go: "Go", rust: "Rust", ruby: "Ruby", dockerfile: "Dockerfile", docker: "Dockerfile",
        toml: "TOML", markdown: "Markdown", md: "Markdown", text: "Text", plaintext: "Text",
        cuda: "CUDA", kotlin: "Kotlin", php: "PHP", r: "R", matlab: "MATLAB", xml: "XML"
    };

    function languageOf(el) {
        const match = Array.from(el.classList).map(c => c.match(/^language-(.+)$/)).find(Boolean);
        if (!match) return null;
        const key = match[1].toLowerCase();
        return LANGUAGE_NAMES[key] || key;
    }

    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }
        const area = document.createElement("textarea");
        area.value = text;
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        try { document.execCommand("copy"); } finally { area.remove(); }
        return Promise.resolve();
    }

    function iconButton(icon, label) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "code-btn";
        btn.setAttribute("aria-label", label);
        btn.title = label;
        btn.innerHTML = `<i class="${icon}" aria-hidden="true"></i>`;
        return btn;
    }

    prose.querySelectorAll("pre").forEach(pre => {
        const code = pre.querySelector("code");
        if (!code || pre.closest(".code-block")) return;

        // Rouge wraps fenced code in div.highlighter-rouge > div.highlight > pre
        const source = pre.closest(".highlighter-rouge") || pre;
        const block = document.createElement("div");
        block.className = "code-block";
        source.parentNode.insertBefore(block, source);

        const language = languageOf(source) || languageOf(code);
        const title = source.getAttribute("data-title") || pre.getAttribute("data-title");

        // GitHub README style: no header bar; actions appear on hover in the top-right
        // corner. Only blocks with a file title get a thin title bar.
        const actions = document.createElement("div");
        actions.className = "code-actions";
        const wrapBtn = iconButton("fas fa-level-down-alt fa-rotate-90", "Toggle line wrap");
        const copyBtn = iconButton("far fa-copy", "Copy code");
        actions.append(wrapBtn, copyBtn);

        let header = null;
        if (title) {
            block.classList.add("has-title");
            header = document.createElement("div");
            header.className = "code-title";
            const name = document.createElement("span");
            name.className = "code-title__name";
            name.textContent = title;
            header.appendChild(name);
            if (language) {
                const lang = document.createElement("span");
                lang.className = "code-title__lang";
                lang.textContent = language;
                header.appendChild(lang);
            }
            header.appendChild(actions);
        } else if (language) {
            const lang = document.createElement("span");
            lang.className = "code-lang";
            lang.textContent = language;
            block.appendChild(lang);
        }

        const body = document.createElement("div");
        body.className = "code-body";

        // Line numbers live in a separate gutter so copied text stays clean
        // and Rouge spans that cross lines are never split.
        if (source.classList.contains("line-numbers")) {
            const lineCount = code.textContent.replace(/\n$/, "").split("\n").length;
            const gutter = document.createElement("div");
            gutter.className = "code-gutter";
            gutter.setAttribute("aria-hidden", "true");
            gutter.textContent = Array.from({ length: lineCount }, (_, i) => i + 1).join("\n");
            body.appendChild(gutter);
            block.classList.add("has-line-numbers");
        }

        body.appendChild(pre);
        if (header) block.append(header, body);
        else block.append(body, actions);
        if (source !== pre) source.remove();

        wrapBtn.addEventListener("click", () => {
            const wrapped = block.classList.toggle("is-wrapped");
            wrapBtn.setAttribute("aria-pressed", wrapped);
        });

        copyBtn.addEventListener("click", () => {
            copyText(code.innerText.replace(/\n$/, "")).then(() => {
                copyBtn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i>';
                copyBtn.classList.add("is-done");
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="far fa-copy" aria-hidden="true"></i>';
                    copyBtn.classList.remove("is-done");
                }, 1600);
            });
        });
    });

    // --- Table of contents from h2 / h3 ---
    const headings = Array.from(prose.querySelectorAll("h2[id], h3[id]"));
    if (headings.length >= 3) {
        const list = document.createElement("ol");
        headings.forEach(h => {
            const li = document.createElement("li");
            li.className = h.tagName === "H3" ? "toc__h3" : "toc__h2";
            const a = document.createElement("a");
            a.href = "#" + h.id;
            a.textContent = h.textContent;
            li.appendChild(a);
            list.appendChild(li);
        });

        document.querySelectorAll(".toc-desktop, .toc-mobile").forEach(container => {
            container.querySelector(".toc").appendChild(list.cloneNode(true));
            container.hidden = false;
        });

        const links = Array.from(document.querySelectorAll(".toc a"));
        const setActive = id => links.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + id));

        if ("IntersectionObserver" in window) {
            const visible = new Set();
            const observer = new IntersectionObserver(entries => {
                entries.forEach(e => e.isIntersecting ? visible.add(e.target) : visible.delete(e.target));
                const current = headings.find(h => visible.has(h));
                if (current) setActive(current.id);
            }, { rootMargin: "-70px 0px -65% 0px" });
            headings.forEach(h => observer.observe(h));
        }

        document.querySelectorAll(".toc-mobile a").forEach(a =>
            a.addEventListener("click", () => { a.closest("details").open = false; }));
    }

    // --- Share buttons ---
    const url = encodeURIComponent(location.href.split("#")[0]);
    const text = encodeURIComponent(document.querySelector(".post-header__title")?.textContent.trim() || document.title);
    const shareUrls = {
        x: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`
    };

    document.querySelectorAll("[data-share]").forEach(el => {
        const kind = el.getAttribute("data-share");
        if (kind === "copy") {
            el.addEventListener("click", () => {
                copyText(location.href.split("#")[0]).then(() => {
                    el.classList.add("is-copied");
                    setTimeout(() => el.classList.remove("is-copied"), 1600);
                });
            });
        } else if (shareUrls[kind]) {
            el.href = shareUrls[kind];
        }
    });
})();
