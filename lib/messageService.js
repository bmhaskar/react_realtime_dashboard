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

const calculateAverageNumberOfMessagesPerDay = messages => {
    let averageNumberOfEventsPerDay = 0;
    const messagesPerDayObj = calculateTotalMessagesPerDay(messages);
    const totalNumberOfDays = Object.keys(messagesPerDayObj).length;
    if (totalNumberOfDays) {
        const totalNumberOfEvents = Object.keys(messagesPerDayObj)
            .reduce((count, day) => count + messagesPerDayObj[day].count, 0);
         averageNumberOfEventsPerDay = Math.round(totalNumberOfEvents / totalNumberOfDays);

    }
    return averageNumberOfEventsPerDay;
}
exports.calculateAverageNumberOfMessagesPerDay = calculateAverageNumberOfMessagesPerDay;