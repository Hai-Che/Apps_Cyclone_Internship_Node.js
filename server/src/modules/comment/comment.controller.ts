import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParam,
  Req,
  UseBefore,
} from "routing-controllers";
import { CommentService } from "./comment.service";
import { Service } from "typedi";
import {
  AccessTokenMiddleware,
  RoleMiddleware,
} from "../../middleware/authMiddleware";
import { CreateCommentDto, UpdateCommentDto } from "./comment.dto";

@Service()
@JsonController("/comment")
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post("/")
  @UseBefore(AccessTokenMiddleware)
  createComment(@Body() body: CreateCommentDto, @Req() request: any) {
    return this.commentService.createComment(body, request.userId);
  }

  @Put("/:id")
  @UseBefore(AccessTokenMiddleware)
  updateComment(
    @Param("id") commentId: number,
    @Body() body: UpdateCommentDto,
    @Req() request: any
  ) {
    return this.commentService.updateComment(commentId, body, request.userId);
  }

  @Delete("/:id")
  @UseBefore(AccessTokenMiddleware)
  deleteComment(@Param("id") commentId: number, @Req() request: any) {
    return this.commentService.deleteComment(commentId, request.userId);
  }

  @Get("/user/")
  @UseBefore(AccessTokenMiddleware)
  getCommentsByUser(
    @QueryParam("page") page: number = 1,
    @QueryParam("limit") limit: number = 10,
    @Req() request: any
  ) {
    return this.commentService.getCommentsByUser(page, limit, request.userId);
  }

  @Get("/:id")
  getComment(@Param("id") commentId: number) {
    return this.commentService.getComment(commentId);
  }

  @Get("/post/:id")
  getCommentOfPost(
    @Param("id") postId: number,
    @QueryParam("sort") sort: "date" | "likes",
    @QueryParam("page") page: number = 1,
    @QueryParam("limit") limit: number = 10
  ) {
    return this.commentService.getCommentOfPost(postId, sort, page, limit);
  }

  @Get("/replies/:id")
  getRepliesOfComment(
    @Param("id") commentId: number,
    @QueryParam("page") page: number = 1,
    @QueryParam("limit") limit: number = 10
  ) {
    return this.commentService.getRepliesOfComment(commentId, page, limit);
  }

  @Put("/hide/:id")
  @UseBefore(AccessTokenMiddleware, RoleMiddleware)
  hideComment(@Param("id") commentId: number) {
    return this.commentService.hideComment(commentId);
  }

  @Post("/like/:id")
  @UseBefore(AccessTokenMiddleware)
  handleLikeComment(@Param("id") commentId: number, @Req() request: any) {
    return this.commentService.handleLikeComment(commentId, request.userId);
  }
}
