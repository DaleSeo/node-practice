function divEscapedContentElement(message) {
	return $('<div></div>').text(message);
}

function divSystemContentElement(message) {
	return $('<div></div>').html('<i>' + message + '</i>');
}

function processUserInput(chatApp, socket) {
	var message = $('#send-message').val();
	var systemMessage;

	if (message.charAt(0) == '/') {
		systemMessage = chatApp.proccessCommand(message);
		console.log('systemMessage:', systemMessage);
		if (systemMessage) {
			$('#messages').append(divSystemContentElement(systemMessage));
		}
	} else {
		chatApp.sendMessage($('#room').text(), message);
		$('#messages').append(divEscapedContentElement(message));
		$('#messages').scrollTop($('#messages').prop('scrollHeight'));
	}
	$('#send-message').val('');
}

var socket = io();

$(document).ready(() => {
	var chatApp = new Chat(socket);

	socket.on('nameResult', (result) => {
		var message;

		if (result.success) {
			message = 'You are now know as ' + result.name + '.';
		} else {
			message = result.message;
		}

		$('#messages').append(divSystemContentElement(message));
	});

	socket.on('joinResult', (result) => {
		console.log(result);
		$('#room').text(result.room);
		$('#messages').append(divSystemContentElement('Room changed.'));
	});

	socket.on('message', (message) => {
		var newElement = $('<div></div>').text(message.text);
		$('#messages').append(newElement);
	});

	socket.on('rooms', (rooms) => {
		$('#room-list').empty();

		for (var room in rooms) {
			if (room != '') {
				$('#room-list').append(divEscapedContentElement(room));
			}
		}

		$('#room-list div').click(() => {
			chatApp.proccessCommand('/join', + $(this).text());
			$('#send-message').focus();
		});
	});

	setInterval(() => {
		socket.emit('rooms');
	}, 1000);

	$('#send-message').focus();

	$('#send-form').submit(() => {
		processUserInput(chatApp, socket);
		return false;
	});
});