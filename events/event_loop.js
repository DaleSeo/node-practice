/**
 * https://www.tutorialspoint.com/nodejs/nodejs_event_loop.htm
 */

var events = require('events');

var eventEmitter = new events.EventEmitter();
var connectHandler = function() {
	console.log('connect successful.');
	eventEmitter.emit('data_received');
};

eventEmitter.on('connection', connectHandler);
eventEmitter.on('data_received', function() {
	console.log('data received successfully.');
})

eventEmitter.emit('connection');

console.log('Program Ended');