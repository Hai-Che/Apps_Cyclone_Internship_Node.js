import {
  JsonController,
  Post,
  Body,
  Req,
  UseBefore,
} from "routing-controllers";
import { AccessService } from "./access.service";
import {
  AuthMiddleware,
  RefreshTokenMiddleware,
} from "../../middleware/authMiddleware";
import { RegisterUserDto } from "../user/user.dto";
import { Service } from "typedi";

@Service()
@JsonController("/access")
export class AccessController {
  constructor(private accessService: AccessService) {}
  @Post("/register")
  register(@Body() body: RegisterUserDto) {
    return this.accessService.register(body);
  }

  @Post("/login")
  login(@Body() body: any) {
    return this.accessService.login(body);
  }

  @Post("/logout")
  @UseBefore(AuthMiddleware)
  logout(@Req() request: any) {
    const { userId, sessionId } = request;
    return this.accessService.logout(userId, sessionId);
  }

  @Post("/handleRefreshToken")
  @UseBefore(RefreshTokenMiddleware)
  handleRefreshToken(@Req() request: any) {
    const { userId, sessionId } = request;
    return this.accessService.handleRefreshToken(userId, sessionId);
  }
}