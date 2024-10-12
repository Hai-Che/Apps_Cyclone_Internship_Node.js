import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
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
  async createComment(@Body() body: CreateCommentDto, @Req() request: any) {
    return this.commentService.createComment(body, request.userId);
  }

  @Put("/:id")
  @UseBefore(AccessTokenMiddleware)
  async updateComment(
    @Param("id") commentId: number,
    @Body() body: UpdateCommentDto,
    @Req() request: any
  ) {
    return this.commentService.updateComment(commentId, body, request.userId);
  }

  @Delete("/:id")
  @UseBefore(AccessTokenMiddleware)
  async deleteComment(@Param("id") commentId: number, @Req() request: any) {
    return this.commentService.deleteComment(commentId, request.userId);
  }

  @Get("/:id")
  async getComment(@Param("id") commentId: number) {
    return this.commentService.getComment(commentId);
  }

  @Put("/hide/:id")
  @UseBefore(AccessTokenMiddleware, RoleMiddleware)
  async hideComment(@Param("id") commentId: number) {
    return this.commentService.hideComment(commentId);
  }
}
