"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
require("dotenv/config");
const PORT = process.env.PORT || 8080;
const server = app_1.default.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
process.on("SIGINT", () => {
    server.close(() => console.log("Terminate server"));
    process.exit(0);
});
//# sourceMappingURL=server.js.map