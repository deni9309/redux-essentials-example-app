import { sub } from 'date-fns';

export const seedPostsData = [
    {
        id: 'dgPXxAz_6fWIQBD8XniSy',
        title: 'First Post!',
        content: 'Hello Redux!',
        user: '2',
        date: sub(new Date(), { months: 4 }).toISOString(),
        reactions: { thumbsUp: 10, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
    }, {
        id: '5cPYxUz_1aBIRBD5tmiSz',
        title: 'Second Post',
        content: 'Hello from ReactJS',
        user: '1',
        date: sub(new Date(), { weeks: 2, hours: 12 }).toISOString(),
        reactions: { thumbsUp: 0, hooray: 0, heart: 5, rocket: 0, eyes: 0 }
    }
];

export const seedUsersData = [
    {
        id: '0',
        name: 'Tianna Jenkins'
    }, {
        id: '1',
        name: 'Kevin Grant'
    }, {
        id: '2',
        name: 'Madison Price'
    }
];