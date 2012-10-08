var wait = require('../index');
var Stream = require('stream');
var difflet = require('difflet');

var start = new Date;

var s = wait(100);

var dest = new Stream;
dest.writable = true;
s.pipe(dest);

dest.write = function(obj) {
  var delay = new Date - start;
  var should = {
    foo: 'bar',
    bar: 'baz',
    baz: 'foo'
  }
  if (delay > 10) throw new Error('no! took '+delay+'ms');
  if (obj.foo != should.foo || obj.bar != should.bar || obj.baz != should.baz) {
    process.stdout.write(difflet.compare(obj, should));
    throw new Error('not as expected');
  }
  console.log('2/2 success!');
};
s.write({foo: 'bar'});
s.write({bar: 'baz', baz:'foo'});
