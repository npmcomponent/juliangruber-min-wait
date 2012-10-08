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
    one: 'foo',
    two: 'two',
    bar: 'baz'
  }
  if (delay > 10) throw new Error('no! took '+delay+'ms');
  if (obj.one != should.one || obj.two != should.two || obj.bar != should.bar) {
    process.stdout.write(difflet.compare(obj, should));
    throw new Error('not as expected');
  }
  console.log('2/2 success!');
};

s.write({ one: 'one' });
s.write({ two: 'two' });
s.write({ one: 'foo', bar: 'baz' });
