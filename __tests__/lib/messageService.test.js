import {calculateTotalMessagesPerDay, calculateAverageNumberOfMessagesPerDay} from "../../lib/messageService";

describe('Server lib testing -- Messaging Service', () => {
    it('Calculates total messages per day ', () => {
        const messages = [{"uniqueDeviceId": "1", "time": "2017-10-02 13:10:02", "level": 15},

            {"uniqueDeviceId": "1", "time": "2017-10-02 13:15:02", "level": 10},
            {"uniqueDeviceId": "1", "time": "2017-10-02 13:20:02", "level": 5},
            {"uniqueDeviceId": "1", "time": "2017-10-02 13:25:02", "level": 3},
            {"uniqueDeviceId": "1", "time": "2017-10-03 13:25:02", "level": 3},
            {"uniqueDeviceId": "1", "time": "2017-10-04 13:25:02", "level": 3},
            {"uniqueDeviceId": "1", "time": "2017-10-20 13:25:02", "level": 3}
        ]
        const messagesPerDay = calculateTotalMessagesPerDay(messages);
        expect(messagesPerDay).toBeDefined();
        expect(Object.keys(messagesPerDay).length).toBe(4);

    })
    it('Calculates average messages per day ', () => {
        const messages = [{"uniqueDeviceId": "1", "time": "2017-10-02 13:10:02", "level": 15},

            {"uniqueDeviceId": "1", "time": "2017-10-03 13:15:02", "level": 10},
            {"uniqueDeviceId": "1", "time": "2017-10-04 13:20:02", "level": 5},
            {"uniqueDeviceId": "1", "time": "2017-10-02 13:25:02", "level": 3},
            {"uniqueDeviceId": "1", "time": "2017-10-03 13:25:02", "level": 3},
            {"uniqueDeviceId": "1", "time": "2017-10-04 13:25:02", "level": 3},
            {"uniqueDeviceId": "1", "time": "2017-10-23 13:25:02", "level": 3}
        ]
        const averageMessagesPerDay = calculateAverageNumberOfMessagesPerDay(messages);
        expect(averageMessagesPerDay).toBeDefined();

        expect(averageMessagesPerDay).toBe(2);

    })
    it('Calculates average messages per day for empty input ', () => {
        const averageMessagesPerDay = calculateAverageNumberOfMessagesPerDay([]);
        expect(averageMessagesPerDay).toBeDefined();

        expect(averageMessagesPerDay).toBe(0);
    })
});


