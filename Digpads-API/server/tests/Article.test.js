let chai = require('chai');
let chaiHttp = require('chai-http');
let { expect, assert } = chai;
chai.use(chaiHttp);

describe('Testing article endpoints', () => {
	var request;
	var cookies;
	beforeEach((done) => {
		request = chai.request(require('../../app.js'));
		done();
	});

	describe('#GET Article', () => {
		it('getArticle without an articleId', (done) => {
			console.log(cookies);
			let res = request
				.get('/api/getArticle')

				.end((err, resp) => {
					console.log(err);
					done();
				});
			expect(res.status === 400);
		});

		it('getArticle with valid ArticleID', (done) => {
			let res = request
				.get('/api/getArticle')
				.query({ articleId: '5ffe84907b7e7233250ca449' })
				.end((err, resp) => {
					assert.typeOf(resp.body.data.Title, 'string');
					assert.typeOf(resp.body.data.Content, 'string');
					done();
				});

			expect(res.status === 200);
		});
	});
});
