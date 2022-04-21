---
title: "Automating release notes with github actions"
description: "A brief summary of how you can completely automate release notes using the Github release functionality with Github Actions and the Github CLI"
publishDate: "April 1 2022"
author: "@bmpickford"
heroImage: "/assets/blog/release.png"
alt: "Automating release notes"
layout: "../../layouts/BlogPost.astro"
tags: ["github_actions", "ci"]
---

## The Problem

Release note generation can often be lacking, tedious or not exist at all.

## The Solution

Automate it!

<div style="width:100%;height:0;padding-bottom:56%;position:relative;margin-bottom:24px;"><iframe src="https://giphy.com/embed/1lxryzbQaqo49cKhCw" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>

Here is a small Github Actions workflow to do exactly that!

```yaml
name: Create release notes
on:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
      with:
        fetch-depth: '0'
    - id: tag
      name: Bump version and push tag
      uses: anothrNick/github-tag-action@1.36.0
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        WITH_V: true
        DEFAULT_BUMP: 'patch'
    - id: release_notes
      name: Create release notes
      run: gh release create ${{ steps.tag.outputs.new_tag }} --generate-notes
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### What does it do

When pushed to the main branch

```yaml
on:
  push:
    branches:
      - main
```

Checkout the repo

```yaml
steps:
  - uses: actions/checkout@v2
    with:
      fetch-depth: "0"
```

Use the [Github tag action](https://github.com/anothrNick/github-tag-action) to bump the version using git tags. This may not fit with every workflow so may need to adjust. This configuration will bump the tag using the patch strategy if none is explicitly defined in any of the commits since the large merge. For more details on how to configure the action, see the repo's README

```yaml
- id: tag
      name: Bump version and push tag
      uses: anothrNick/github-tag-action@1.36.0
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        WITH_V: true
        DEFAULT_BUMP: 'patch'
```

Use the Github CLI to automatically create a new release, and generate some release notes

```yaml
- id: release_notes
      name: Create release notes
      run: gh release create ${{ steps.tag.outputs.new_tag }} --generate-notes
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### What does it look like?

Here's an example! It collates all merge commits and list them alongside authors, as well as provide a changelog and list of contributors.
<img src="/release_notes.png" width="1000" alt="Release notes example" />

## Further automation

You can then send this to slack or any other messaging service and communicate what you're releasing without manual intervention.
