# Copy For Documentation

A vs-code extension that copies the selected text as a GitHub Flavored Markdown text snippet.

## Features

`Copy For Documentation` command. 

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

## Known Issues

I'm as curious as y'all. 

## Release Notes

### 0.0.1

Initial release, basic functionality. Works On My Machine!™
