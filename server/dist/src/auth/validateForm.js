"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateForm = void 0;
const error_response_1 = require("../core/error.response");
const asyncHandler_1 = require("../helper/asyncHandler");
const validateForm = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, fullName, dob, address } = req.body;
    const usernameRegex = /^[a-zA-Z0-9]{6,}$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{4,}$/;
    const fullNameRegex = /^[a-zA-Z\s]{6,64}$/;
    const dobRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}$/;
    if (!username || !usernameRegex.test(username)) {
        throw new error_response_1.BadRequestError("Missing or invalid username: Must be at least 6 characters and alphanumeric.");
    }
    if (!password || !passwordRegex.test(password)) {
        throw new error_response_1.BadRequestError("Missing or invalid password: Must be at least 4 characters with a letter, number and special character.");
    }
    if (!fullName || !fullNameRegex.test(fullName)) {
        throw new error_response_1.BadRequestError("Missing or invalid fullName: Must be 6-64 characters long with letters only.");
    }
    if (dob && !dobRegex.test(dob)) {
        throw new error_response_1.BadRequestError("Invalid dob: Must be in yyyy/mm/dd format.");
    }
    if (address && typeof address !== "string") {
        throw new error_response_1.BadRequestError("Invalid address: Must be a string.");
    }
    next();
}));
exports.validateForm = validateForm;
//# sourceMappingURL=validateForm.js.map