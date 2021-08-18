---
title: 'Demo: Web vitals web component'
description: 'A web component that display web vitals for your site'
publishDate: 'August 18 2021'
author: '@bmpickford'
heroImage: '/assets/blog/web_vitals.png'
alt: 'Web vitals guages'
layout: '../../layouts/BlogPost.astro'
tags: ['web-components', 'web-vitals']
---
<script type="module" src="https://unpkg.com/web-vitals-wc@0.0.9/index.js"></script>
<style>
    svg {
        margin-top: 12px;
    }
    web-vitals-wc {
        --bg-color: black;
        margin-left: 24px;
    }
</style>

## Web Vitals
> An initiative to provide unified guidance for quality signals that are essential to delivering a great user experience on the web.
<br />If you're not familiar, I recommend having a look at the [repo](https://github.com/GoogleChrome/web-vitals) and reading through the docs at https://web.dev/


## App
The application is pretty simple, and aims to provide a non intrusive way to close the feedback loop if you're looking at measuring your web vitals in realtime

#### Tech
[Lit](https://lit.dev/) generated using the [open-wc](https://open-wc.org/docs/development/generator/) generator


## Demo
<div style="display: flex"><span>Hover over this:</span><web-vitals-wc />
