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
const dummyData_1 = require("./dummyData");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
const fetchPostWithCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Fetching category: ${category}`);
        const data = dummyData_1.rawData.filter((i) => i.category === category);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data);
                console.log(`Data for ${category}:`, data);
            }, 2000); // Database query cost example
        });
    }
    catch (error) {
        console.log(error);
        throw new Error("fetchPostWithCategory failed");
    }
});
const fetchPostsSequentially = (categories) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseData = [];
        for (const category of categories) {
            const data = yield fetchPostWithCategory(category);
            responseData.push(data);
        }
        console.log("All categories fetched.");
        return responseData;
    }
    catch (error) {
        console.log(error);
        throw new Error("fetchPostsSequentially failed");
    }
});
const fetchPostsInParallel = (categories) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchPromises = categories.map((category) => fetchPostWithCategory(category));
        const results = yield Promise.all(fetchPromises);
        return results;
    }
    catch (error) {
        console.log(error);
        throw new Error("fetchPostsSequentially failed");
    }
});
app.get("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = req.query.category
        ? Array.isArray(req.query.category)
            ? req.query.category
            : [req.query.category]
        : ["news", "economy", "social"];
    try {
        // const data = await fetchPostsSequentially(categories);
        const data = yield fetchPostsInParallel(categories);
        return res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get posts" });
    }
}));
app.listen(PORT, () => {
    return console.log(`Express is listening at ${PORT}`);
});
//# sourceMappingURL=app.js.map