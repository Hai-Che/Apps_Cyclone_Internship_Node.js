import express from "express";
import { rawData } from "./dummyData";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const fetchPostWithCategory = async (category) => {
  try {
    console.log(`Fetching category: ${category}`);
    const data = rawData.filter((i) => i.category === category);
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(data);
        console.log(`Data for ${category}:`, data);
      }, 2000); // Database query cost example
    });
  } catch (error) {
    console.log(error);
    throw new Error("fetchPostWithCategory failed");
  }
};

const fetchPostsSequentially = async (categories) => {
  try {
    const responseData = [];
    for (const category of categories) {
      const data = await fetchPostWithCategory(category);
      responseData.push(data);
    }
    console.log("All categories fetched.");
    return responseData;
  } catch (error) {
    console.log(error);
    throw new Error("fetchPostsSequentially failed");
  }
};

const fetchPostsInParallel = async (categories) => {
  try {
    const fetchPromises = categories.map((category) =>
      fetchPostWithCategory(category)
    );
    const results = await Promise.all(fetchPromises);
    return results;
  } catch (error) {
    console.log(error);
    throw new Error("fetchPostsSequentially failed");
  }
};

app.get("/posts", async (req, res) => {
  const categories = req.query.category
    ? Array.isArray(req.query.category)
      ? req.query.category
      : [req.query.category]
    : ["news", "economy", "social"];
  try {
    // const data = await fetchPostsSequentially(categories);
    const data = await fetchPostsInParallel(categories);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get posts" });
  }
});

app.listen(PORT, () => {
  return console.log(`Express is listening at ${PORT}`);
});
