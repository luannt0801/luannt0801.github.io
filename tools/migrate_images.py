"""Normalize images referenced by posts in _posts/.

For every post (published and "__" drafts) this script:
  * finds images written as ![alt](url "caption"){: .wide} or Obsidian ![[file.png]]
  * moves each image into assets/imgs_post/<post-slug>/<safe-file-name>
  * rewrites the reference as a site-absolute Markdown link, keeping alt text,
    caption (title) and kramdown attributes, so the image stays exactly where
    it was written
  * splits several images written on one line into separate lines

Safe to run repeatedly: images already in place are left alone.

Usage (from the repo root):
    python tools/migrate_images.py            # dry run, prints planned changes
    python tools/migrate_images.py --apply    # move files and rewrite posts
"""

import argparse
import re
import shutil
import subprocess
import sys
import unicodedata
import urllib.parse
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
POSTS = ROOT / "_posts"
IMG_ROOT = ROOT / "assets" / "imgs_post"
IMG_EXTS = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".avif"}

MD_IMAGE = re.compile(r'!\[(?P<alt>[^\]]*)\]\((?P<url><[^>]+>|[^)"]+?)\s*(?:"(?P<title>[^"]*)")?\)(?P<ial>\{:[^}]*\})?')
WIKI_IMAGE = re.compile(r'!\[\[(?P<name>[^\]|#]+)(?:\|(?P<alt>[^\]]*))?\]\]')


def slugify(text):
    text = text.replace("đ", "d").replace("Đ", "D")
    text = unicodedata.normalize("NFKD", text)
    text = "".join(c for c in text if not unicodedata.combining(c))
    text = re.sub(r"[^A-Za-z0-9]+", "-", text).strip("-").lower()
    return text or "untitled"


def post_slug(path):
    name = path.stem.lstrip("_")
    name = re.sub(r"^\d{4}-\d{2}-\d{2}-", "", name)
    return slugify(name)


def safe_file_name(name):
    p = Path(name)
    return slugify(p.stem) + p.suffix.lower()


def resolve_source(ref, post_path):
    """Find the image file on disk for a link written in a post."""
    ref = urllib.parse.unquote(ref.strip("<>").strip())
    if re.match(r"^[a-z]+://", ref) or ref.startswith("data:"):
        return None
    candidates = [
        ROOT / ref.lstrip("/"),
        post_path.parent / ref,
        POSTS / Path(ref).name,
        IMG_ROOT / Path(ref).name,
        ROOT / Path(ref).name,
    ]
    for c in candidates:
        if c.is_file() and c.suffix.lower() in IMG_EXTS:
            return c.resolve()
    return None


def is_tracked(path):
    result = subprocess.run(["git", "ls-files", "--error-unmatch", str(path)],
                            cwd=ROOT, capture_output=True)
    return result.returncode == 0


def move(src, dst, apply):
    if src == dst.resolve():
        return
    print(f"  move {src.relative_to(ROOT)} -> {dst.relative_to(ROOT)}")
    if not apply:
        return
    dst.parent.mkdir(parents=True, exist_ok=True)
    if is_tracked(src):
        subprocess.run(["git", "mv", str(src), str(dst)], cwd=ROOT, check=True)
    else:
        shutil.move(str(src), str(dst))


def process_post(path, apply, moved):
    text = path.read_text(encoding="utf-8")
    slug = post_slug(path)
    target_dir = IMG_ROOT / slug
    problems = []

    def target_for(src):
        # An image already moved for another post keeps its first location
        if src in moved:
            return moved[src]
        # Already filed under some post's folder: reuse it, never steal it
        if src.parent != IMG_ROOT.resolve() and IMG_ROOT.resolve() in src.parents:
            moved[src] = src
            return src
        dst = target_dir / safe_file_name(src.name)
        if dst.exists() and dst.resolve() != src:
            dst = target_dir / f"{dst.stem}-{len(moved)}{dst.suffix}"
        moved[src] = dst
        return dst

    def url_for(dst):
        return "/" + urllib.parse.quote(dst.relative_to(ROOT).as_posix())

    def replace_md(m):
        src = resolve_source(m.group("url"), path)
        if src is None:
            if not re.match(r"^<?[a-z]+://", m.group("url")):
                problems.append(m.group("url"))
            return m.group(0)
        dst = target_for(src)
        move(src, dst, apply)
        title = f' "{m.group("title")}"' if m.group("title") else ""
        return f'![{m.group("alt")}]({url_for(dst)}{title}){m.group("ial") or ""}'

    def replace_wiki(m):
        src = resolve_source(m.group("name"), path)
        if src is None:
            problems.append(m.group("name"))
            return m.group(0)
        dst = target_for(src)
        move(src, dst, apply)
        return f'![{m.group("alt") or ""}]({url_for(dst)})'

    new_lines = []
    in_fence = False
    for line in text.split("\n"):
        if re.match(r"^\s*(```|~~~)", line):
            in_fence = not in_fence
        if in_fence:
            new_lines.append(line)
            continue
        line = MD_IMAGE.sub(replace_md, line)
        line = WIKI_IMAGE.sub(replace_wiki, line)

        # Several images glued on one line -> one image per line
        images = list(MD_IMAGE.finditer(line))
        if len(images) > 1 and MD_IMAGE.sub("", line).strip() == "":
            indent = re.match(r"^\s*", line).group(0)
            for i, img in enumerate(images):
                if i:
                    new_lines.append("")
                new_lines.append(indent + img.group(0))
            continue
        new_lines.append(line)

    new_text = "\n".join(new_lines)
    if new_text != text:
        print(f"  rewrite {path.relative_to(ROOT)}")
        if apply:
            path.write_text(new_text, encoding="utf-8", newline="")
    for p in problems:
        print(f"  WARNING image not found: {p}")


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--apply", action="store_true", help="move files and rewrite posts")
    args = parser.parse_args()

    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    moved = {}
    for path in sorted(POSTS.glob("*.md")):
        print(path.name)
        process_post(path, args.apply, moved)
    if not args.apply:
        print("\nDry run only. Re-run with --apply to make these changes.")


if __name__ == "__main__":
    main()
