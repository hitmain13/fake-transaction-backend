"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTransferHash = generateTransferHash;
const crypto_1 = require("crypto");
const uuid_1 = require("uuid");
function generateTransferHash(data, length = 12) {
    const baseString = JSON.stringify(data) + (0, uuid_1.v4)();
    const hash = (0, crypto_1.createHash)('sha256').update(baseString).digest('base64');
    return hash.substring(0, length);
}
//# sourceMappingURL=hash.helper.js.map