const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { handleError } = require('./server/utils/errors');
const { jwt } = require('./server/utils/jwt');
require('./server/models/db');
const csurf = require('./server/utils/csurf');
const fs = require('fs');
const multer = require('multer');
const CronJob = require('./server/models/CronJobs');
const Event = require('./server/models/Event');
const moment = require('moment');
const schedule = require('node-schedule');
const apiRouter = require('./server/routes/router');
var app = express();

app.use(require('body-parser').json());

const User = require('./server/models/User');

app.post('/subscribe', (req, res) => {
	const subscription = req.body;
	res.status(201).json({});
	const payload = JSON.stringify({ title: 'test' });

	console.log(`subscription: `, subscription);

	webpush.sendNotification(subscription, payload).catch((error) => {
		console.error(error.stack);
	});
});

const {
	insertNonexistingArticles,
} = require('./server/services/elasticsearch');
if (process.env.NODE_ENV === 'production') {
	insertNonexistingArticles();
}

require('dotenv').config();

const port =
	process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 4000;
require('dotenv').config();
app.use(cookieParser());
let allowedOrigins = [
	'https://digpads.com',
	process.env.ORIGIN_URL,
	process.env.STRAPI_API_URL,
];

//sets headers and configures CSRF
app.use(function (req, res, next) {
	let origin = req.headers.origin;

	res.header('Access-Control-Allow-Origin', origin);

	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader('Access-Control-Allow-Credentials', true);
	try {
		if (req.headers['cookie']) {
			if (req.cookies['X-XSRF-TOKEN'])
				req.headers['csrf-token'] = req.cookies['X-XSRF-TOKEN'];
		}
	} catch (e) {
		console.log('Error' + req.headers['cookie']);
	}
	next();
});

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(helmet());
app.use(csurf());
app.use(
	cors({
		credentials: true,
		origin: allowedOrigins,
		exposedHeaders: ['set-cookie'],
	})
);
app.use(require('morgan')('dev'));
app.use(jwt());
app.use('/api/uploads', express.static('./uploads'));
app.use('/api', apiRouter);

var upload = multer();
app.post('/api/image-upload', upload.array(), function (req, res) {
	var user = req.user.id;
	var base64Data = req.body.image;
	var base64 = base64Data.split(';base64,').pop();
	const fileName = `/uploads/images/${
		user + Date.now() + Math.floor(Math.random() * 1000)
	}.png`;
	fs.writeFile(__dirname + fileName, base64, 'base64', function (err) {
		if (err) console.log(err);
		fs.readFile(__dirname + fileName, function (err, data) {
			if (err) throw err;
			res.json({
				path: fileName.substring(1),
			});
		});
	});
});

app.get('/get-server-time', (req, res) => {
	const date = new Date(Date.now());
	res.send({
		date,
		local: date.toLocaleString(),
		timezone: date?.toTimeString(),
	});
});

app.all('*', (req, res, next) => {
	// record user ip address & date of login
	if (req.user) {
		var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
		User.findByIdAndUpdate(req.user.id, {
			$set: { lastIpAddress: ip, lastLogin: Date.now() },
		});
	}

	next();
});

//runs every minuite
schedule.scheduleJob('* * * * *', async function () {
	try {
		const jobs = await CronJob.find({ status: false });
		for await (let job of jobs) {
			let _event, _data;
			_data = job.data;
			_data.eventRecordedOn = Date.now();
			delete _data._id;
			let fObj = _data.eventData.frequencyObj;

			switch (_data.eventData.frequency) {
				case 'Once':
					break;
				case 'Daily':
					console.log('daily');
					if (moment(job.lastRanAt).isBefore(moment())) {
						if (
							moment(_data.eventData.frequencyObj.time).isSameOrBefore(
								moment().toDate()
							)
						) {
							_event = await new Event(_data).save().then(async () => {
								job.lastRanAt = moment().toDate();
								job.runCount = (job?.runCount || 0) + 1;
								job.save().then(() => console.log('job saved'));
							});
						}
					}
					break;
				case 'Weekly':
					if (fObj.day.value <= moment().weekday()) {
						if (moment(job.lastRanAt).isBefore(moment(), 'days')) {
							console.log('running the weekly... ');
							const format = 'HH:mm:ss';
							let checkTime = moment(fObj.time).format(format);
							let nowTime = moment(Date.now()).format(format);
							const date = moment(Date.now()).format('YYYY-MM-DD');
							checkTime = moment(date + 'T' + checkTime);
							nowTime = moment(date + 'T' + nowTime);

							if (moment(checkTime).isSameOrBefore(nowTime)) {
								_event = await new Event(_data).save().then(async () => {
									console.log('new event saved', _event);
									job.lastRanAt = moment().toDate();
									job.runCount = (job?.runCount || 0) + 1;
									job.save().then(() => console.log('job saved'));
								});
							}
						} else {
							console.log('already ran this week');
						}
					}
					break;
				case 'Monthly':
					console.log('monthly');
					if (moment(job.lastRanAt).isSameOrBefore(moment(), 'days')) {
						if (fObj.monthDay === moment().format('D')) {
							const format = 'HH:mm:ss';
							let checkTime = moment(fObj.time).format(format);
							let nowTime = moment(Date.now()).format(format);
							const date = moment(Date.now()).format('YYYY-MM-DD');
							checkTime = moment(date + 'T' + checkTime);
							nowTime = moment(date + 'T' + nowTime);
							if (moment(checkTime).isSameOrBefore(nowTime)) {
								console.log('creating monthly event');
								_event = await new Event(_data).save().then(async () => {
									console.log('new event saved', _event);
									job.lastRanAt = moment().toDate();
									job.runCount = (job?.runCount || 0) + 1;
									job.save().then(() => console.log('job saved'));
								});
							}
						}
					}
					break;
				case 'Anually':
					console.log('annual');
					if (moment(job.lastRanAt).isBefore(moment(), 'years')) {
						if (moment(fObj.annualTime).isSameOrBefore(moment().toDate())) {
							console.log('creating annual event');
							_event = await new Event(_data).save().then(async () => {
								console.log('new event saved', _event);
								job.lastRanAt = moment().toDate();
								job.runCount = (job?.runCount || 0) + 1;
								job.save().then(() => console.log('job saved'));
							});
						}
					} else {
						console.log('already ran this year...');
					}
				default:
					break;
			}
		}
	} catch (e) {
		console.log('error in cron job');
		console.log(e);
	}
	// }
});

app.listen(port, () => {
	console.log('API listening on port ' + port);
});

module.exports = app;
