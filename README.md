# my_blog_template

Categories:
-  "AI & ML"
- "Programming"
- "Project"
- "Books"
- "Network"
- "etc": other

### Install Jekyll

First, install ruby by which jekyll is writed.
```bash
sudo apt-get install ruby-full build-essential zlib1g-dev
```
Second, configure environment for gems (RubyGems)
```bash
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```
Finally, install jekyll and bundle for install package, run serve
```bash
gem install jekyll bundler
```

On Windows: Ruby+DevKit is installed at `C:\Ruby40-x64` (add `C:\Ruby40-x64\bin` to PATH), then just run `bundle install`.

### Run

```
bundle install
bundle exec jekyll serve --livereload              # published posts
bundle exec jekyll serve --livereload --unpublished  # also posts with `published: false`
```

## Writing a post (Obsidian)

1. In Obsidian: **Templates → Insert template → `post`** (template lives in `_templates/post.md`).
   Save the file as `_posts/YYYY-MM-DD-slug.md`. Files starting with `__` are drafts and are not built.
2. Front matter:

```yaml
layout: post
title: "Title"
subtitle: "One-line summary under the title"   # optional
date: 2026-10-31
author: Nguyen Thanh Luan
categories:
  - AI & ML            # first category drives "More in ..." related posts
tags: [vllm, llm]      # optional
description: ""        # SEO + card excerpt (falls back to subtitle / first paragraph)
cover: /assets/imgs_post/<slug>/cover.png   # optional
cover_alt: ""
```

3. Paste or drag images straight into the note. Obsidian saves them in `assets/imgs_post/`.
   Before committing, run:

```
python tools/migrate_images.py           # dry run: shows what will change
python tools/migrate_images.py --apply   # move images to assets/imgs_post/<slug>/ and fix links
```

   The script is safe to run any time. It also converts `![[image.png]]` wikilinks to Markdown links.

### Images

Images stay exactly where they are written. Put each image on its own line:

```markdown
![Alt text for screen readers](/assets/imgs_post/<slug>/diagram.png "Caption shown under the image")
![Alt](/assets/imgs_post/<slug>/side.png "Caption"){: .inline}
```

Images never exceed the text column; large images shrink to fit.

| Class | Layout |
|---|---|
| *(none)* | centered, at most the text column width |
| `{: .inline}` | floats right next to the text (single column on mobile) |
| `{: .small}` | half width, centered |

### Code

Use fenced code with a language (python, bash, js, ts, cpp, java, sql, json, yaml, html, css, latex, ...).
Optional attributes go on the line right after the closing fence:

````markdown
```python
print("hello")
```
{: .line-numbers data-title="train.py"}
````

Blocks look like GitHub README code (Primer colors, light/dark with the site theme). A small language
label sits top-right; copy and line-wrap buttons appear on hover. `data-title` adds a thin file-name bar,
`.line-numbers` adds line numbers.

### Embeds and math

```liquid
{% include embed.html youtube="VIDEO_ID" caption="Optional caption" %}
{% include embed.html src="https://example.com/embed" ratio="4/3" %}
```

Math: `$inline$` and `$$ block $$` (MathJax).

See `_posts/2026-10-31-showcase.md` (unpublished) for every block type in one post.