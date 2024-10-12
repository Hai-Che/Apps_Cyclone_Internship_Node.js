import { Comment } from "../../entities/comment.entity";
import { Inject, Service } from "typedi";
import { IsNull, Repository } from "typeorm";
import { BadRequestError, ForbiddenError } from "routing-controllers";
import { Post } from "../../entities/post.entity";

@Service()
export class CommentService {
  constructor(
    @Inject("CommentRepository") private commentRepository: Repository<Comment>,
    @Inject("PostRepository") private postRepository: Repository<Post>
  ) {}

  async createComment(body, currentUserId) {
    const commentBefore = await this.commentRepository.findOne({
      where: {
        postId: body.postId,
        userId: currentUserId,
        parentCommentId: IsNull(),
      },
    });
    if (commentBefore) {
      throw new BadRequestError("You had comment this post before!");
    }
    body.userId = currentUserId;
    body.replies = [];
    const comment = await this.commentRepository.save(body);
    if (body.parentCommentId) {
      const parentComment = await this.commentRepository.findOne({
        where: { id: body.parentCommentId },
      });
      if (!parentComment) {
        throw new BadRequestError("Parent comment not existed!");
      }
      if (parentComment.parentCommentId) {
        const rootComment = await this.commentRepository.findOne({
          where: { id: parentComment.parentCommentId },
        });
        rootComment.replies = [...rootComment.replies, comment.id.toString()];
        await this.commentRepository.save(rootComment);
        await this.commentRepository.update(comment.id, {
          parentCommentId: rootComment.id,
        });
      } else {
        parentComment.replies = [
          ...parentComment.replies,
          comment.id.toString(),
        ];
        await this.commentRepository.save(parentComment);
      }
    }
    await this.postRepository.increment(
      { postId: body.postId },
      "totalComments",
      1
    );
    return comment;
  }

  async updateComment(commentId, { content }, currentUserId) {
    const checkComment = await this.commentRepository.findOne({
      where: { id: commentId },
    });
    if (!checkComment) {
      throw new BadRequestError("Comment not found");
    }
    if (checkComment.userId !== currentUserId) {
      throw new ForbiddenError("Action denied!");
    }
    await this.commentRepository.update({ id: commentId }, { content });
    return { message: "Update successfully!" };
  }

  async deleteComment(commentId, currentUserId) {
    const checkComment = await this.commentRepository.findOne({
      where: { id: commentId },
    });
    if (!checkComment) {
      throw new BadRequestError("Comment not found");
    }
    if (checkComment.userId !== currentUserId) {
      throw new ForbiddenError("Action denied!");
    }
    if (checkComment.parentCommentId) {
      const parentComment = await this.commentRepository.findOne({
        where: { id: checkComment.parentCommentId },
      });
      if (!parentComment) {
        throw new BadRequestError("Parent comment not existed!");
      }
      parentComment.replies = parentComment.replies.filter(
        (reply) => reply !== checkComment.id.toString()
      );
      await this.commentRepository.save(parentComment);
    }
    await this.postRepository.decrement(
      { postId: checkComment.postId },
      "totalComments",
      1
    );
    return await this.commentRepository.remove(checkComment);
  }

  async getComment(commentId) {
    const rootComment = await this.commentRepository.findOne({
      where: { id: commentId, isHidden: false },
    });
    const childComment = [];
    await Promise.all(
      rootComment.replies.map(async (cmt) => {
        const comment = await this.commentRepository.findOne({
          where: { id: Number(cmt), isHidden: false },
        });
        if (comment) childComment.push(comment);
      })
    );
    return { rootComment, childComment };
  }

  async hideComment(commentId) {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (!comment) {
      throw new BadRequestError("Comment not found");
    }

    return await this.commentRepository.update(
      { id: commentId },
      { isHidden: !comment.isHidden }
    );
  }
}