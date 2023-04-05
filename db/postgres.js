const prostgresInstance = require('../prostgres');

const addUserToDB = async (newuser) => {
    try {
        const prostgres = await prostgresInstance();
        return await prostgres.users.create(newuser);
    } catch (error) {
        console.log("error", error);
        return error
    }
}

const readUserAgeDistribution = async () => {
    try {
        const query = `SELECT t.range as range, COUNT(*) * 100.0/(SELECT COUNT(*) FROM public."Users") as count
        FROM (
            SELECT CASE 
            WHEN age between 0 and 20 then '<20' 
            WHEN age between 20 and 40 then '20-40' 
            WHEN age between 40 and 60 then '40-60' 
            ELSE '>60' end as range 
            FROM "Users"
        ) t
        group by t.range`

        const prostgres = await prostgresInstance();
        const response = await prostgres.sequelize.query(query)
        return response
    } catch (error) {
        console.log("error", error);
        return error
    }
}

module.exports = {
    addUserToDB,
    readUserAgeDistribution
}
