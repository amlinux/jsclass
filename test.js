require('./jsclass');
var assert = require('assert');
var events = require('events');

/* Simple class test */
function A() { }
A.method('returnA', function () { return 'A'; });
A.method('returnData', function (data) { return 'A' + data; });
var a = new A();
assert.equal(a.returnA(), 'A');
assert.equal(a.returnB, undefined);
assert.equal(a.returnData(1), 'A1');

/* Inherited class test */
function B() { }
B.inherits(A);
B.method('returnB', function () { return 'B'; });
B.method('returnData', function (data) { return 'B' + data; });
var b = new B();
assert.equal(b.returnA(), 'A');
assert.equal(b.returnB(), 'B');
assert.equal(b.returnData(2), 'B2');

/* Calling parent's methods + passing parameters */
function C() { }
C.inherits(A);
C.method('returnData', function (data) { return 'C' + data + this.callParent(A, 'returnData', data + 1); });
var c = new C();
assert.equal(c.returnData(3), 'C3A4');

/* Multiple inheritance + EventEmitte */
function D() { }
D.inherits(C);
D.inherits(events.EventEmitter);
D.method('returnData', function (data) { return 'D' + data + this.callParent(C, 'returnData', data + 1); });
var d = new D();
assert.equal(d.returnData(5), 'D5C6A7');
d.on('someEvent', function () { this.eventFired = true });
assert.ok(!d.eventFired);
d.emit('someEvent');
assert.ok(d.eventFired);

/* Calling parent's constructor */
function E() { this.eField = 1; }
var e = new E();
assert.equal(e.eField, 1);
function F() { this.callParent(E, 'constructor'); this.fField = 2; }
F.inherits(E);
var f = new F();
assert.equal(f.eField, 1);
assert.equal(f.fField, 2);


