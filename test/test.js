var wait = require('../index');

var Stream = require('stream');
var difflet = require('difflet');

var maxDelay = 10;
var start, w, dest;

describe('min-wait(opts)', function() {
  beforeEach(function() {
    start = new Date;
    w = wait({ ms: 100 });
    dest = new Stream;
    dest.writable = true;
    w.pipe(dest);
  });
  it('should buffer', function(done) {
    dest.write = function(should) {
      var itTook = new Date - start;
      var delay = itTook - should.t;
      if (delay > maxDelay)
        throw new Error('should: '+should.t+' itTook: '+itTook);
        if (should.t == 400) done();
    };

    w.write({t:200});
    setTimeout(function() { w.write({t:200}); }, 100)
    setTimeout(function() { w.write({t:400}); }, 300);
  })
  it('should merge', function(done) {
    dest.write = function(obj) {
      var delay = new Date - start;
      var should = {
        one: 'foo',
        two: 'two',
        bar: 'baz'
      }
      if (delay > maxDelay) throw new Error('no! took '+delay+'ms');
      if (obj.one != should.one || obj.two != should.two || obj.bar != should.bar) {
        process.stdout.write(difflet.compare(obj, should));
        throw new Error('not as expected');
      }
      done();
    };

    w.write({ one: 'one' });
    w.write({ two: 'two' });
    w.write({ one: 'foo', bar: 'baz' });
  })
  it('should treat equally', function(done) {
    w = wait({ ms: 100, equal: true });

    dest.write = function(should) {
      var itTook = new Date - start;
      if (itTook - should.t > maxDelay)
        throw new Error('no! should: '+should.t+' itTook: '+itTook);
      
      done();
    };

    w.pipe(dest);
    w.write({ t: 100, foo: 'bar' });
  })
});
describe('min-wait(ms)', function() {
  it('should wait', function(done) {
    var start = new Date;
    w = wait(100);
    w.write('foo');
    w.on('data', function() {
      var itTook = new Date - start;
      var delay = itTook - 100;
      if (delay > maxDelay) throw new Error('should: 100 itTook '+itTook);
      done();
    });
  });
});
