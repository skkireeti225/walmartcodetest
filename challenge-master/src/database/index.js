'use strict';
const _ = require('lodash');
const db = require('./db.js');


// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(dataAccessMethod());
        }, 500);
    });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
    const dataAccessMethod = () => _.map(db.usersById, userInfo => userInfo)
    return mockDBCall(dataAccessMethod);
};

const getListOfAgesOfUsersWith = (item) => {
    const dataAccessMethod = () => {
        let returnData = []
        const usersWithItems = _.filter(_.keys(db.itemsOfUserByUsername), username => db.itemsOfUserByUsername[username].includes(item))
        const ageGroups = _.groupBy(_.filter(db.usersById, user => usersWithItems.includes(user.username)), userInfo => userInfo.age)
        _.forEach(_.keys(ageGroups), ageGroup => {
            returnData.push({age: ageGroup, count: ageGroups[ageGroup].length})
        })
        return returnData
    }
    return mockDBCall(dataAccessMethod);
}

module.exports = {
    getUsers,
    getListOfAgesOfUsersWith
};
