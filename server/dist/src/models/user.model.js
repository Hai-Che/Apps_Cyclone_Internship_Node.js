"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    dob: {
        type: Date,
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});
exports.default = mongoose_1.default.model(DOCUMENT_NAME, userSchema);
//# sourceMappingURL=user.model.js.map