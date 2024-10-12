import redisClient from "../../dbs/init.redis";

export const saveViewedPosts = async (userId: number, postId: number) => {
  const key = `user:${userId}:viewedPosts`;
  await redisClient.sadd(key, postId);
  await redisClient.expire(key, 30 * 24 * 60 * 60);
};

export const getViewedPosts = async (userId: number) => {
  const key = `user:${userId}:viewedPosts`;
  return await redisClient.smembers(key);
};

export const saveSavedPosts = async (userId: number, postId: number) => {
  const key = `user:${userId}:savedPosts`;
  await redisClient.sadd(key, postId);
  await redisClient.expire(key, 30 * 24 * 60 * 60);
};

export const getSavedPosts = async (userId: number) => {
  const key = `user:${userId}:savedPosts`;
  return await redisClient.smembers(key);
};
