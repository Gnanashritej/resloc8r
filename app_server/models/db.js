var mongoose = require('mongoose');
var dbURI = 'mongodb://127.0.0.1/Loc8r';
require('./locations');
mongoose.connect(dbURI);
mongoose.connection.on('connected',function (){
    console.log('mongoose connected to' +dbURI);
});
mongoose.connection.on('error',function (err){
    console.log('mongoose connection error:' +err);
});
mongoose.connection.on('disconnected',function (){
    console.log('mongoose disconnected');
});
const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
    });
    };
    // For nodemon restarts
    process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', () => {
gracefulShutdown('app termination', () => {
process.exit(0);
});
});
// For Heroku app termination
process.on('SIGTERM', () => {
gracefulShutdown('Heroku app shutdown', () => {
process.exit(0);
});
});