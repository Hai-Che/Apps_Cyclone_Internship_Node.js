import {
  JsonController,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseBefore,
  QueryParam,
  Req,
} from "routing-controllers";
import { Service } from "typedi";
import {
  RoleMiddleware,
  AccessTokenMiddleware,
  GuestCheckMiddleware,
} from "../../middleware/authMiddleware";
import { PostService } from "./post.service";
import { CreatePostDto, UpdatePostDto } from "./post.dto";

@Service()
@JsonController("/posts")
export class PostController {
  constructor(private postService: PostService) {}

  @Post("/")
  @UseBefore(AccessTokenMiddleware, RoleMiddleware)
  createPost(@Body() body: CreatePostDto, @Req() request: any) {
    return this.postService.createPost(body, request.userId);
  }

  @Put("/:id")
  @UseBefore(AccessTokenMiddleware, RoleMiddleware)
  updatePost(
    @Param("id") postId: number,
    @Body() body: UpdatePostDto,
    @Req() request: any
  ) {
    return this.postService.updatePost(postId, body, request.userId);
  }

  @Get("/detail/:id")
  @UseBefore(GuestCheckMiddleware)
  getPost(@Param("id") postId: number, @Req() request: any) {
    const userId = request.userId ? request.userId : null;
    return this.postService.getPost(postId, userId);
  }

  @Get("/category/:category")
  @UseBefore(GuestCheckMiddleware)
  getPostsByCategory(
    @Param("category") category: string,
    @QueryParam("page") page: number = 1,
    @QueryParam("limit") limit: number = 10,
    @Req() request: any
  ) {
    return this.postService.getPostsByCategory(
      category,
      page,
      limit,
      request.userId
    );
  }

  @Get("/viewed-post")
  @UseBefore(AccessTokenMiddleware)
  getViewedPost(
    @Req() request: any,
    @QueryParam("page") page: number = 1,
    @QueryParam("limit") limit: number = 10
  ) {
    return this.postService.getViewedPost(request.userId, page, limit);
  }

  @Get("/saved-post")
  @UseBefore(AccessTokenMiddleware)
  getSavedPost(
    @Req() request: any,
    @QueryParam("page") page: number = 1,
    @QueryParam("limit") limit: number = 10
  ) {
    return this.postService.getSavedPost(request.userId, page, limit);
  }

  @Post("/saved-post/:id")
  @UseBefore(AccessTokenMiddleware)
  savedPost(@Param("id") postId: number, @Req() request: any) {
    return this.postService.savedPost(postId, request.userId);
  }

  @Post("/published/:id")
  @UseBefore(AccessTokenMiddleware, RoleMiddleware)
  publishedPost(@Param("id") postId: number) {
    return this.postService.publishedPost(postId);
  }

  @Post("/deleted/:id")
  @UseBefore(AccessTokenMiddleware, RoleMiddleware)
  deletedPost(@Param("id") postId: number) {
    return this.postService.deletedPost(postId);
  }

  @Get("/search")
  searchPosts(
    @QueryParam("keyword") keyword: string,
    @QueryParam("page") page: number = 1,
    @QueryParam("limit") limit: number = 10
  ) {
    return this.postService.searchPosts(keyword, page, limit);
  }

  @Get("/stats")
  getPostStats() {
    return this.postService.getPostStats();
  }
}
