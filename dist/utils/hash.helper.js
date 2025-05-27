"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTransferHash = generateTransferHash;
const uuid_1 = require("uuid");
const crypto_1 = require("crypto");
function generateTransferHash(data) {
    const baseString = JSON.stringify(data) + (0, uuid_1.v4)();
    return (0, crypto_1.createHash)('sha256').update(baseString).digest('base64');
}
//# sourceMappingURL=hash.helper.js.map