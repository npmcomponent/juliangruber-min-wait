*This repository is a mirror of the [component](http://component.io) module [juliangruber/min-wait](http://github.com/juliangruber/min-wait). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/juliangruber-min-wait`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*
# min-wait

Through stream that buffers input objects for at least `x ms` until it emits
them merged together.

Useful if you let your users filter data results and only want to start an api
request when the user hasn't done anything for 500ms.

Objects with multiple keys immediately trigger a flush because such
interactions come from code, not people. Try clicking two checkboxes at once ;)

[![Build Status](https://travis-ci.org/juliangruber/min-wait.png)](https://travis-ci.org/juliangruber/min-wait)

## Usage

```javascript
var Wait = require('min-wait');

src.pipe(wait(500)).pipe(dest);

src.emit('data', {one: 'one'});             // has to wait
src.emit('data', {two: 'two'});             // has to wait
src.emit('data', {one: 'foo', bar: 'baz'}); // flush
```

`dest` receives:

```javascript
{
  one: 'foo',
  two: 'two',
  bar: 'baz'
}
```

## Installation

```bash
$ npm install min-wait
# or
$ component install juliangruber/min-wait
```

## API

### wait(opts)

Returns a through stream that buffers data for at least `opts.ms`.

Possible values for `opts`:

* `ms`: Time to wait at minimum
* `equal`: Treat all input equally and also buffer multi-key objects

If `opts` is a __Number__ it is treated as `opts.ms`.

## License

(MIT)

Copyright (c) 2012 &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in 
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
