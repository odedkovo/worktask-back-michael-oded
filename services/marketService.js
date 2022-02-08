const DBService = require('./DBService')


function query() {
    let query = `SELECT * FROM market`;

    return DBService.runSQL(query)
}

async function getById(userId) {
    let query = `SELECT * FROM market WHERE market._id = ${userId}`;
    let users = await DBService.runSQL(query);
    if (users.length === 1) return users[0];
    throw new Error(`market id ${userId} not found or more then one selected`);
}


async function add(user) {
    let sqlCmd = `INSERT INTO market (firstName, lastName, email, website, linkedin, experience, biggestCampaign) 
    VALUES ("${user.firstName}",
    "${user.lastName}",
    "${user.email}",
    "${user.website}",
    "${user.linkedin}",
    "${user.experience}",
    "${user.biggestCampaign}")`;
    const okPacket = await DBService.runSQL(sqlCmd)
    return okPacket.insertId
}


async function update(user) {
    let query = `UPDATE market set firstName = "${user.firstName}",
    lastName = "${user.lastName}",
    email = "${user.email}",
    website = "${user.website}",
    linkedin = "${user.linkedin}",
    experience = "${user.experience}",
    biggestCampaign = "${user.biggestCampaign}",
    WHERE market._id = ${user._id}`;
    let okPacket = await DBService.runSQL(query);
    if (okPacket.affectedRows !== 0) return okPacket;
    throw new Error(`No market updated - market id ${user._id}`);
}


function remove(userId) {
    let query = `DELETE FROM market WHERE market._id = ${userId}`;

    return DBService.runSQL(query)
        .then(okPacket => okPacket.affectedRows === 1
            ? okPacket
            : Promise.reject(new Error(`No market deleted - market id ${userId}`)));
}


module.exports = {
    query,
    getById,
    add,
    update,
    remove
}