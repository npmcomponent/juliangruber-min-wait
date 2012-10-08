var wait = require('../index');
var Stream = require('stream');

var start = new Date;

var s = wait(100);

var dest = new Stream;
dest.writable = true;
dest.write = function(should) {
  var itTook = new Date - start;
  if (itTook - should.t > 100)
    throw new Error('no! should: '+should.t+' itTook: '+itTook);
};

s.pipe(dest);

s.write({t:200});

setTimeout(function() { s.write({t:200}); }, 100)
setTimeout(function() { s.write({t:400}); }, 300);
setTimeout(function() { console.log('1/2 success') }, 500);
