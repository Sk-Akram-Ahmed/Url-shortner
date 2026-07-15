const crypto = require("crypto");

function generateShortCode() {
    return crypto.randomBytes(4).toString("hex");
}

module.exports = {
    generateShortCode
};