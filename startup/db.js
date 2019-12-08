const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/uesr')
	.then(() => console.log('connected to databse'))
	.catch((e) => console.log('Not connected to databse'));