const mongodbInstance = require('../mongo');

const addUserToDB = async (newuser) => {
    try {
        const mongodb = await mongodbInstance();
        const user = new mongodb.models.user(newuser);
        await user.save();
        return newuser
    } catch (error) {
        return error
    }
}

const readUserAgeDistribution = async () => {
    try {
        const mongodb = await mongodbInstance();
        const response = await mongodb.models.user.aggregate([
            {
                $project: {
                    "_id": 0,
                    "range": {
                        $concat: [
                            { $cond: [{ $lt: ["$age", 20] }, "<20", ""] },
                            { $cond: [{ $and: [{ $gte: ["$age", 20] }, { $lt: ["$age", 40] }] }, "21-40", ""] },
                            { $cond: [{ $and: [{ $gte: ["$age", 40] }, { $lt: ["$age", 60] }] }, "40-60", ""] },
                            { $cond: [{ $gte: ["$age", 60] }, ">60", ""] }
                        ]
                    }
                }
            },
            { $group: { _id: "$range", count: { $sum: 1 } } }
        ]);
        return response
    } catch (error) {
        return error
    }
}

module.exports = {
    addUserToDB,
    readUserAgeDistribution
}
