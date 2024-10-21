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
  async checkPostExisted(postId: number) {
    const post = await this.postRepository.findOne({ where: { postId } });
    if (!post) {
      throw new BadRequestError("Post not existed!");
    }
    return post;
  }
  async createPost(body, currentUserId) {
    body.userId = currentUserId;
    body.postImages = [];
    const newPost = await this.postRepository.save(body);
    await redisClient.set(`post:${newPost.postId}`, JSON.stringify(newPost));
    return newPost;
  }
  async updatePost(postId, body, currentUserId) {
    const post = await this.checkPostExisted(postId);
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
  async getPost(postId: number, currentUserId?: number) {
    const cacheKey = `post:${postId}`;
    let post;

    const cachedPost = await redisClient.get(cacheKey);
    if (cachedPost) {
      post = JSON.parse(cachedPost);
    } else {
      post = await this.postRepository.findOne({ where: { postId } });
      if (!post) {
        throw new BadRequestError("This post not available right now");
      }
    }

    if (post.status !== PostStatus.Published) {
      throw new BadRequestError("This post not available right now");
    }

    post.views++;

    await Promise.all([
      this.postRepository.increment({ postId }, "views", 1),
      redisClient.set(cacheKey, JSON.stringify(post)),
      currentUserId && saveViewedPosts(currentUserId, postId),
    ]);

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
        postId: true,
        views: true,
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
        post.views++;
        redisClient.set(`post:${post.postId}`, JSON.stringify(post));
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
    const checkPost = await this.checkPostExisted(postId);
    if (checkPost.status === PostStatus.Published) {
      throw new BadRequestError("This post is already published");
    }
    const cacheKey = `post:${postId}`;
    const cachedPost = await redisClient.get(cacheKey);
    if (cachedPost) {
      const post = JSON.parse(cachedPost);
      if (post.status === PostStatus.Published) {
        throw new BadRequestError("This post is already published");
      }
      post.status = PostStatus.Published;
      await redisClient.set(cacheKey, JSON.stringify(post));
    }

    return await this.postRepository.update(postId, {
      status: PostStatus.Published,
    });
  }

  async deletedPost(postId: number) {
    return await this.postRepository.update(postId, {
      status: PostStatus.Deleted,
    });
  }

  async searchPosts(keyword, page, limit) {
    const skip = (page - 1) * limit;
    const posts = await this.postRepository
      .createQueryBuilder("post")
      .where("post.title LIKE :keyword", { keyword: `%${keyword}%` })
      .orWhere("post.tags LIKE :keyword", { keyword: `%${keyword}%` })
      .orderBy("post.createdDate", "DESC")
      .skip(skip)
      .take(limit)
      .getMany();
    if (!posts) {
      throw new BadRequestError("Posts not found with your keyword");
    }
    return posts;
  }

  async getPostStats() {
    const postViewStats = await this.postRepository.find({
      where: { status: PostStatus.Published },
      order: {
        views: "DESC",
      },
    });
    const postCommentStats = await this.postRepository.find({
      where: { status: PostStatus.Published },
      order: {
        totalComments: "DESC",
      },
    });
    return {
      postViewStats,
      postCommentStats,
    };
  }

  async uploadPostPicture(postId, currentUserId, files) {
    const post = await this.checkPostExisted(postId);
    if (post.userId !== currentUserId) {
      throw new ForbiddenError("Action denied!");
    }
    if (!files.length) {
      throw new BadRequestError("File missing!");
    }
    for (const file of files) {
      post.postImages = [...post.postImages, file.path];
    }
    await this.postRepository.save(post);
    return { message: "Upload load successfully!" };
  }
}
