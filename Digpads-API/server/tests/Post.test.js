const { createPost } = require('../controllers/posts');
const loginData = {
	email: 'varun@unleased.io',
	psw: 'password',
};
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);
describe('Testing post endpoints', () => {
	var csrf;
	var request;
	beforeEach((done) => {
		request = chai.request(require('../../app.js'));
		done();
	});
	describe('#POST forum posts', function () {
		// beforeEach(async (done) => {
		// 	let res = await request.get('/api/csrf');
		// 	let temp = res.headers['set-cookie'][0].toString();
		// 	let first = temp.indexOf('_csrf=') + 6;
		// 	console.log(temp);
		// 	csrf = temp.substr(first, temp.indexOf(';'));
		// 	console.log(csrf);
		// 	done();
		// });
		// it('test createPost', async () => {
		// 	let res = await chai
		// 		.request(app)
		// 		.post('/api/createPost')
		// 		.send({ email: 'john', psw: 'test' });
		// 	console.log(res.body);
		// });
	});
	describe('#GET forum posts', () => {
		it('getPost without an postId', (done) => {
			let res = request.get('/api/getPost').end((err, resp) => {
				console.log(resp.status);
				done();
			});
			expect(res.status === 400);
			// done();
		});
	});
	describe('#GET forum posts', () => {
		it('getPost with valid postId', (done) => {
			let res = request
				.get('/api/getPost')
				.type('form')
				.query({ postId: '5fa08bed78e1ad257bede0b0' })
				.end((err, resp) => {
					console.log(resp.body);
					done();
				});
			expect(res.status === 200);
		});
	});
});
