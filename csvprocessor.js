const fs = require('fs');
const readline = require('readline');
const config = require('config');
const filepath = config.get("filepath");

module.exports = async (db) => {
    //Reading CSV File line by line
    const fileStream = fs.createReadStream(filepath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    var isHeader = true;
    var object = {};
    var objectKeys = [];
    for await (const line of rl) {
        if (isHeader) {
            //Creating a skeleton object from header line
            objectKeys = line.split(",");
            objectKeys = objectKeys.map((head) => { return head.trim() })
            objectKeys = objectKeys.map((head) => { return head.split(".") })
            for (var index = 0; index < objectKeys.length; index++) {
                const keys = objectKeys[index];
                object = createObjectStructure(object, keys, 0)
            };
            isHeader = false;
        } else {
            //Putting data in skeleton object
            var objectValues = line.split(",");
            objectValues = objectValues.map((head) => { return head.trim() })
            for (var index = 0; index < objectValues.length; index++) {
                const keys = objectKeys[index];
                const value = objectValues[index];
                object = addValueToObject(object, keys, 0, value);
            };
            await addDataToDatabase(db, object);
        }
    }

    const ageDistribution = await db.readUserAgeDistribution();
    console.log("ageDistribution", ageDistribution);

}

const addDataToDatabase = async (db, object) => {
    //Making a copy of data so that reference is not modified
    const data = JSON.parse(JSON.stringify(object));
    const dbdata = {};
    dbdata['name'] = data['name']['firstName'] + " " + data['name']['lastName'];
    dbdata['age'] = Number(data['age'])
    dbdata['address'] = data['address']
    delete data['name'];
    delete data['age'];
    delete data['address'];
    //putting rest dbdata in additional_info
    dbdata['additional_info'] = data;
    //Pushing data to DB
    await db.addUserToDB(dbdata);
}

const createObjectStructure = (object, keys, index) => {
    const currentkey = keys[index];
    object[currentkey] = object[currentkey] || {};
    index++;
    if (index < keys.length)
        object[currentkey] = createObjectStructure(object[currentkey], keys, index)
    return object
}

const addValueToObject = (object, keys, index, value) => {
    const currentkey = keys[index];
    index++;
    if (index < keys.length)
        addValueToObject(object[currentkey], keys, index, value);
    else
        object[currentkey] = value;
    return object
}

