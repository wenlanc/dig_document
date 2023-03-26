const emails = require('../services/emails');

const user = {
	first: 'Varun',
	last: 'Sub',
	email: 'varun@unleased.io',
	confirmedEmail: 'test',
};

const sendDocumentEmailPayload = {
	email: 'mujammilkhan321@gmail.com',
	documentUrl: 'http://test.com/fsadgsdf/',
	first: 'emkay',
	last: 'emkay',
};

function test() {
	emails.signUpVerification(user);
	emails.sendDocument(sendDocumentEmailPayload);
}
test();
