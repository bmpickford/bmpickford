---
layout: "../../layouts/BlogPost.astro"
title: "Integrating Prism into a create-react-app project"
description: "A quick walkthough of how to best integrate the current version of Prism into a React project, bootstrapped with create-react-app"
publishDate: "September 20 2021"
tags: ["react", "prism"]
---

Prism doesn't have a setup akin to much of the modern web, which can create some friction when integrating with modern tooling for ever changing frameworks. There are a few methods of installing prismjs, but this guide follows their recommended approach. Assuming a project already exists that was created with create-react-app, these steps should get you up and running with Prism quickly.

### Download and Installation

1. Navigate to https://prismjs.com/
1. Click Download and select the theme you want, languages and plugins you would like to support
1. Download JS and CSS
1. Copy the JS and CSS to the public folder
1. In your `public/index.html`, add this tag:

```html
<!-- index.html -->
<script async src="%PUBLIC_URL%/prism.js" />
<link rel="stylesheet" href="/prism.css" />
```

### Usage with dyanmic content

You will need to do one of the below if you are changing content that needs syntax highlighting. For example, wisiwyg editor. Add one of the below code blocks where you're update your data.

#### Option 1 - Reload all highlight on value change.

```jsx
const [value, setValue] = useState("" /* your dynamic code block */);

useEffect(() => {
  window.Prism?.highlightAll();
}, [value]);

return (
  <pre>
    <code className={`language-json`}>{value}</code>
  </pre>
);
```

#### Option 2 - Reload single code block (recommended)

This approach is recommended if you have more than 1 code block, as it will save you unnessesary reloads.

```jsx
const [value, setValue] = useState("" /* your dynamic code block */);
const ref = useRef(null);

useEffect(() => {
  if (ref.current) {
    window.Prism?.highlightElement(ref.current);
  }
}, [value, ref.current]);

return (
  <pre>
    <code ref={codeEl} className={`language-json`}>
      {value}
    </code>
  </pre>
);
```

## The Aternative

If the above approach doesn't suit your application or team, there is an npm package you can use, however you will need to also use the supplied babel plugin. When using a no config solution like create-react-app, this becomes difficult and you may will may need to use [craco](https://github.com/gsoft-inc/craco) or eject your configuration.

```jsx
// SomeComponent.jsx
import Prism from "prismjs";

// code here

Prism.highlightAll();

// code here
```

For the babel plugin see: https://github.com/mAAdhaTTah/babel-plugin-prismjs

## Full Example

To see a full working example, PrismJS has been implemented in the following web app:
https://github.com/bmpickford/dynamoconverter
