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


### Layout Post:

```bash
layout: post
title: Data Engineer - Message Protocols
date: 2024-01-05 10:00:00 +0700
author: Nguyen Thanh Luan
categories: ["AI & ML"]
```


### Add imgs to post

To add an image to a post in _post: please add the image to assets/imgs_post and add a link to that image in this folder in the post.

### Run

```
bundle install
bundle exec jekyll serve
```