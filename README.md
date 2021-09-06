# a-callback

> A utility to convert node callbacks to promise

## fromCallback

```ts
fromCallback(
    resolver: (cb: (error?: any, ...args: any[]) => any) => any,
    [Object {multiArgs: boolean=false} options]
) -> Promise
```

```ts
fromNode(
    resolver: (cb: (error?: any, ...args: any[]) => any) => any,
    [Object {multiArgs: boolean=false} options]
) -> Promise
```

Returns a promise that is resolved by a node style callback function. This is the most fitting way to do on the fly
promisification when libraries don't expose classes for automatic promisification by undefined.

The resolver function is passed a callback that expects to be called back according to error-first node conventions.

Setting multiArgs to true means the resulting promise will always fulfill with an array of the callback's success
value(s). This is needed because promises only support a single success value while some callback API's have multiple
success value. The default is to ignore all but the first success value of a callback function.

Using manual resolver:

```ts
import util from 'util';
import {fromCallback} from 'a-callback';
// "email-templates" doesn't expose prototypes for promisification
const emailTemplates = util.promisify(require('email-templates'));
const templatesDir = path.join(__dirname, 'templates');

const template = await emailTemplates(templatesDir);
const [html, text] = await fromCallback(cb => template('newsletter', cb), {multiArgs: true});
console.log(html, text);
```
