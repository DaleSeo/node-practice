/**
 * https://www.tutorialspoint.com/nodejs/nodejs_event_emitter.htm
 */
var events = require('events');
var eventEmitter = new events.EventEmitter();

var listener1 = function() {
	console.log('listner1 executed.');
};

var listener2 = function() {
	console.log('listner2 executed.');
}

eventEmitter.addListener('connection', listener1);
eventEmitter.on('connection', listener2);

var listeners = eventEmitter.listeners('connection');
console.log("Connection event listners:", listeners);

var eventListeners = events.EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(eventListeners + " Listner(s) listening to connection event");

eventEmitter.emit('connection');

eventEmitter.removeListener('connection', listener1);
console.log('Listner1 will not listen now.');

eventEmitter.emit('connection');

eventListeners = events.EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(eventListeners + " Listner(s) listening to connection event");

console.log("Program Ended.");