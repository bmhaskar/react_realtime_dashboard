const moment = require('moment');
const calculateTotalMessagesPerDay = messages => messages.reduce((prev, next, currentIdex) => {

    const time = moment(next.time).format('Y-M-D');
    if(prev.hasOwnProperty(time)) {
        prev[time].count += 1;
    } else {
        prev[time]= {time: next.time, count:1};
    }

    return prev;
},{});

exports.calculateTotalMessagesPerDay = calculateTotalMessagesPerDay;