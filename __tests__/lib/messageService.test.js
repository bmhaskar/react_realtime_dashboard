import {calculateTotalMessagesPerDay} from "../../lib/messageService";

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
});
