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
exports.myQueue = void 0;
const bullmq_1 = require("bullmq");
const myQueue = new bullmq_1.Queue("userQueue", {
    connection: {
        host: "localhost",
        port: 6379,
    },
});
exports.myQueue = myQueue;
const worker = new bullmq_1.Worker("userQueue", (job) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Processing job ${job.id} with data:`, job.data);
}), {
    connection: {
        host: "localhost",
        port: 6379,
    },
});
//# sourceMappingURL=userQueue.js.map