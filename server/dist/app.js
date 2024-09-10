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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
const createUser = (data) => {
    const { username, password, fullname, bod, address } = data;
    return new Promise((resolve) => {
        const data = {
            username,
            password,
            fullname,
            bod,
            address,
        };
        resolve(data);
    });
};
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqBody = req.body;
        const user = yield createUser(reqBody);
        return res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to create user" });
    }
}));
app.listen(PORT, () => {
    return console.log(`Express is listening at ${PORT}`);
});
//# sourceMappingURL=app.js.map