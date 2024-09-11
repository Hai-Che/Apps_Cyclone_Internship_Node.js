import { CREATED } from "../core/success.response";
import AccessService from "../services/access.service";
class AccessController {
  register = async (req, res, next) => {
    new CREATED({
      message: "Registered Success",
      metadata: await AccessService.register(req.body),
    }).send(res);
  };
}

export default new AccessController();
