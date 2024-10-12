import { Inject, Service } from "typedi";
import { Repository } from "typeorm";
import { Post, PostStatus } from "../../entities/post.entity";
import redisClient from "../../dbs/init.redis";
import { BadRequestError, ForbiddenError } from "routing-controllers";
import {
  getSavedPosts,
  getViewedPosts,
  saveSavedPosts,
  saveViewedPosts,
} from "./post.repo";

@Service()
export class PostService {
  constructor(
    @Inject("PostRepository") private postRepository: Repository<Post>
  ) {}
  async createPost(body, currentUserId) {
    body.userId = currentUserId;
    const newPost = await this.postRepository.save(body);
    await redisClient.set(`post:${newPost.postId}`, JSON.stringify(newPost));
    return newPost;
  }
  async updatePost(postId, body, currentUserId) {
    const post = await this.postRepository.findOne({ where: { postId } });
    if (!post) {
      throw new BadRequestError("Post not existed!");
    }
    if (post.userId !== currentUserId) {
      throw new ForbiddenError("Action denied!");
    }
    await this.postRepository.update(postId, body);
    const updatedPost = await this.postRepository.findOne({
      where: { postId },
    });
    await redisClient.set(`post:${postId}`, JSON.stringify(updatedPost));
    return updatedPost;
  }
  async getPost(postId, currentUserId) {
    const cachedPost = await redisClient.get(`post:${postId}`);
    if (cachedPost) {
      const post = JSON.parse(cachedPost);
      if (post.status !== PostStatus.Published) {
        throw new BadRequestError("This post not available right now");
      }
      return post;
    }
    const post = await this.postRepository.findOne({ where: { postId } });
    if (!post || post.status !== PostStatus.Published) {
      throw new BadRequestError("This post not available right now");
    }
    await this.postRepository.increment({ postId }, "views", 1);
    await redisClient.set(`post:${postId}`, JSON.stringify(post));
    if (currentUserId) {
      await saveViewedPosts(currentUserId, postId);
    }
    return post;
  }

  async getPostsByCategory(category, page, limit, currentUserId: number) {
    const skip = (page - 1) * limit;
    const posts = await this.postRepository.find({
      where: { category, status: PostStatus.Published },
      select: {
        title: true,
        description: true,
        thumbnail: true,
        author: true,
        totalComments: true,
        // views: true,
        postId: true,
      },
      skip,
      take: limit,
    });
    await Promise.all(
      posts.map(async (post) => {
        await this.postRepository.increment(
          { postId: post.postId },
          "views",
          1
        );
        if (currentUserId) await saveViewedPosts(currentUserId, post.postId);
      })
    );
    return posts;
  }
  async getViewedPost(userId: number, page, limit) {
    const viewedPosts = await getViewedPosts(userId);
    const posts = [];
    const skip = (page - 1) * limit;
    await Promise.all(
      viewedPosts.map(async (viewedPost) => {
        const cachePost = await redisClient.get(`post:${viewedPost}`);
        posts.push(JSON.parse(cachePost));
      })
    );
    return posts.slice(skip, skip + limit);
  }

  async savedPost(postId: number, currentUserId: number) {
    await saveSavedPosts(currentUserId, postId);
    return { message: "Saved post successfully" };
  }

  async getSavedPost(userId: number, page, limit) {
    const savedPosts = await getSavedPosts(userId);
    const posts = [];
    const skip = (page - 1) * limit;
    await Promise.all(
      savedPosts.map(async (savedPost) => {
        const cachePost = await redisClient.get(`post:${savedPost}`);
        posts.push(JSON.parse(cachePost));
      })
    );
    return posts.slice(skip, skip + limit);
  }

  async publishedPost(postId: number) {
    return await this.postRepository.update(postId, {
      status: PostStatus.Published,
    });
  }

  async deletedPost(postId: number) {
    return await this.postRepository.update(postId, {
      status: PostStatus.Deleted,
    });
  }
}
