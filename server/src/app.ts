import express from "express";
import { dummyData } from "./dummyData";
const app = express();
const PORT = 3000;

app.use(express.json());

const fetchPostsWithCategory = async (category: string) => {
  try {
    console.log(`Fetching category: ${category}`);
    const data = dummyData.filter((i) => i.category === category);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
        console.log(`Data for ${category}:`, data);
      }, 2000); // Database query cost example
    });
  } catch (error) {
    console.log(error);
    throw new Error("fetchPostsWithCategory failed");
  }
};

const fetchPostsSequentially = async (categories) => {
  try {
    const responseData = [];
    for (const category of categories) {
      const data = await fetchPostsWithCategory(category);
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
      fetchPostsWithCategory(category)
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
    const data = await fetchPostsSequentially(categories);
    // const data = await fetchPostsInParallel(categories);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get posts" });
  }
});

app.listen(PORT, () => {
  return console.log(`Express is listening at ${PORT}`);
});
