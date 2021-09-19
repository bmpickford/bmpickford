---
title: 'Integrating Prism into a create-react-app project'
description: 'A quick walkthough of how to best integrate the current version of Prism into a React project, bootstrapped with create-react-app'
publishDate: 'September 20 2021'
author: '@bmpickford'
heroImage: '/assets/blog/prism.svg'
alt: 'Prism'
layout: '../../layouts/BlogPost.astro'
tags: ['react', 'prism']
---
## [Prism](https://prismjs.com/) + [create-react-app](https://github.com/facebook/create-react-app)


Prism doesn't have a setup akin to much of the modern web, which can create some friction when integrating with modern tooling for ever changing frameworks. There are a few methods of installing prismjs, but this guide follows their recommended approach. Assuming a project already exists that was created with create-react-app, these steps should get you up and running with Prism quickly

<br>

1. Navigate to https://prismjs.com/
1. Click Download and select the theme you want, and the languages you would like to support
1. Download JS and CSS
1. Copy the JS to the public folder
1. Copy the CSS to you app
1. In your `index.html`, add this tag: `<script async src="%PUBLIC_URL%/prism.js"></script>`
1. In `index.js` or equivilent, import the prism css using `import ./prism.css` pointing to your newly copied prismJS file

<br>

If you have dynamic content, you will also need to tell Prism to reload the highlighting. With the script imported above, you should now have access to the global Prism object on the window which you can use to do this

If you need to reload all syntax highlighting when there is a change, you can use something like this snippet, where value is the value of the item that is being updated:
```js
useEffect(() => {
    window.Prism?.highlightAll();
}, [value]);
```

<br>

Alternatively, if you want to be more performance concious you can update the highlighting of a single element by doing something similar to the following
```js
const ref = useRef(null);

useEffect(() => {
    if (!ref.current) return;
    window.Prism?.highlightElement(ref.current);
}, [value, ref.current]);

return (
    <pre>
      <code ref={codeEl} className={`language-json`}>
        {code}
      </code>
    </pre>
);
```

## The Aternative
The above is a less than ideal solution, but luckily prismjs have included an npm package to use. You would use it like
```js
// SomeComponent.jsx
import Prism from 'prismjs'

...

Prism.highlightAll();
...
```
The main caveat with this is that it requires a babel plugin to be used with a bundler. When using a no config solution like create-react-app, this becomes difficult and solutions are limited to ejecting your configuration, or using something like `react-app-rewired`

For the babel plugin see: https://github.com/mAAdhaTTah/babel-plugin-prismjs


## Full Example

To see a full working example, PrismJS has been implemented in the following web app:
https://github.com/bmpickford/dynamoconverter