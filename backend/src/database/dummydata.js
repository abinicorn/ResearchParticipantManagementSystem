const dummySessions = [
    {
        studyId: "615987d1e4b0bf001f8e991a",
        sessionCode: "SE2222",
        date: new Date("2023-09-15"),
        time: "14:00",
        location: "Room 101",
        participantNum: 10,
        participantList: [
            "615987d1e4b0bf001f8e9901",
            "615987d1e4b0bf001f8e9902",
            "615987d1e4b0bf001f8e9903"
        ]
    },
    {
        studyId: "615987d1e4b0bf001f8e991a",
        sessionCode: "SE5555",
        date: new Date("2023-05-02"),
        time: "13:00",
        location: "Room 201",
        participantNum: 8,
        participantList: [
            "615987d1e4b0bf001f8e9901",
        ]
    },
    {
        studyId: "615987d1e4b0bf001f8e991b",
        sessionCode: "SE4567",
        date: new Date("2023-09-20"),
        time: "10:30",
        location: "Room 203",
        participantNum: 8,
        participantList: [
            "615987d1e4b0bf001f8e9904",
            "615987d1e4b0bf001f8e9905"
        ]
    }
];


const dummyParticipants = [
    {
        participantFirstName: "Alice",
        participantLastName: "Johnson",
        email: "alice@example.com",
        tag: ["615987d1e4b0bf001f8e9904", "615987d1e4b0bf001f8e9905"],
        isWillContact: true
    },
    {
        participantFirstName: "Bob",
        participantLastName: "Smith",
        email: "bob@example.com",
        tag: ["615987d1e4b0bf001f8e9904", "615987d1e4b0bf001f8e9905"],
        isWillContact: false
    }
]


const dummyResearchers = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        username: 'john001',
        password: '123456',
        studyList: [
            '615987d1e4b0bf001f8e9904',
            '615987d1e4b0bf001f8e9906'
        ]
    },
    {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        username: 'jane001',
        password: '123456',
        studyList: [
            '615987d1e4b0bf001f8e9904',
            '615987d1e4b0bf001f8e9906',
            '615987d1e4b0bf001f8e9907'
        ]
    },
];


export {
    dummyResearchers,
    dummySessions,
    dummyParticipants
}
