## daniloster-if

Component to resolve conditional rendering.

[\`npm: daniloster-if\`](https://www.npmjs.com/package/daniloster-if)


### src/index.js

#### If

If
Component that wraps other components and conditionally displays them.
E.g.
```html
<If
  expression={isTruthy}
  then={() => <span>It is truthy!</span>}
  otherwise={() => <span>It is falsy!</span>}
/>
```

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
**className** | \`string\` | \`''\` | :x: | Outer world class to modify internal styles when it is provided
a children as string.
**children** | \`node\` |  | :white_check_mark: | Node conditionally rendered. Note: this node is wrapped into
a span when a string is provided.
**expression** | \`bool\` |  | :white_check_mark: | The flag that show/hide the children.

