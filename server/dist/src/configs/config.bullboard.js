"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@bull-board/api");
const bullMQAdapter_1 = require("@bull-board/api/bullMQAdapter");
const express_1 = require("@bull-board/express");
const emailQueue_1 = require("../queues/emailQueue");
const serverAdapter = new express_1.ExpressAdapter();
serverAdapter.setBasePath("/api/admin/queues");
(0, api_1.createBullBoard)({
    queues: [new bullMQAdapter_1.BullMQAdapter(emailQueue_1.emailQueue)],
    serverAdapter: serverAdapter,
});
exports.default = serverAdapter;
//# sourceMappingURL=config.bullboard.js.map