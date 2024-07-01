# Copy For Documentation

A vs-code extension that copies the selected text as a GitHub Flavored Markdown text snippet.

## Features

### Copy for Documentation 

The `Copy For Documentation` command copies selected source code to your clipboard as a GitHub Flavored Markdown text snippet.

For example, in a file named `src/myproject/myfile.js` with the following content:

```javascript
import { foo } from './foo';

class SomeClass {
  constructor() {
    this.foo = foo;
  }
}
```

And a selection of the following text:

```javascript
// ...
  constructor() {
    this.foo = foo;
  }
// ...
```

`Copy For Documentation` will copy the following text to the clipboard:

````markdown
`src/myproject/myfile.js:4-6`:

```javascript
constructor() {
  this.foo = foo;
}
```
````

### Copy For Slack

`Copy For Slack` is just like `Copy For Documentation`, but it leaves off the language tag on the opening markdown backticks, since Slack hates this.

That means the snippet from the above example will look like this:

````markdown
`src/myproject/myfile.js:4-6`:

```
constructor() {
  this.foo = foo;
}
```
````

### Copy For HTML

I don't have a use for this one, but it's there. Just like `Copy For Documentation`, but it wraps everything in HTML tags, suitable for use with [highlight.js](https://highlightjs.org/).

That means the snippet from the above example will look like this:

```html
<p><code>src/myproject/myfile.js:4-6</code></p>

<pre><code class="language-javascript">
constructor() {
  this.foo = foo;
}</>
</code></pre>
```

## Known Issues

I'm as curious as y'all. 

## Release Notes

### 0.1.0

Added `Copy For Slack` and `Copy For HTML` commands.

### 0.0.1

Initial release, basic functionality. Works On My Machine!™
