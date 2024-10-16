import {
  JsonController,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Req,
  UseBefore,
} from "routing-controllers";
import { UpdateUserDto } from "./user.dto";
import { UserService } from "./user.service";
import { AccessTokenMiddleware } from "../../middleware/authMiddleware";
import { Service } from "typedi";
import { uploadDisk } from "../../middleware/fileUploadMiddleware";

@Service()
@UseBefore(AccessTokenMiddleware)
@JsonController("/user")
export class UserController {
  constructor(private userService: UserService) {}
  @Get("/:id")
  getUser(@Param("id") id: number, @Req() request: any) {
    return this.userService.getUser(id, request.userId);
  }

  @Put("/")
  updateUser(@Body() body: UpdateUserDto, @Req() request: any) {
    return this.userService.updateUser(body, request.userId);
  }

  @Delete("/:id")
  deleteUser(@Param("id") id: number, @Req() request: any) {
    return this.userService.deleteUser(id, request.userId);
  }

  @Put("/profile-picture")
  @UseBefore(AccessTokenMiddleware, uploadDisk.single("file"))
  async updateProfilePicture(@Req() request: any) {
    const filePath = request.file.path;
    return this.userService.updateProfilePicture(request.userId, filePath);
  }
}
