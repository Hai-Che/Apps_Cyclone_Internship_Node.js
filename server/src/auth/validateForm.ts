import { BadRequestError } from "../core/error.response";
import { asyncHandler } from "../helper/asyncHandler";

const validateForm = asyncHandler(async (req, res, next) => {
  const { username, password, fullName, dob, address } = req.body;
  const usernameRegex = /^[a-zA-Z0-9]{6,}$/;
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{4,}$/;
  const fullNameRegex = /^[a-zA-Z\s]{6,64}$/;
  const dobRegex =
    /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}$/;

  if (!username || !usernameRegex.test(username)) {
    throw new BadRequestError(
      "Missing or invalid username: Must be at least 6 characters and alphanumeric."
    );
  }
  if (!password || !passwordRegex.test(password)) {
    throw new BadRequestError(
      "Missing or invalid password: Must be at least 4 characters with a letter, number and special character."
    );
  }
  if (!fullName || !fullNameRegex.test(fullName)) {
    throw new BadRequestError(
      "Missing or invalid fullName: Must be 6-64 characters long with letters only."
    );
  }
  if (dob && !dobRegex.test(dob)) {
    throw new BadRequestError("Invalid dob: Must be in yyyy/mm/dd format.");
  }
  if (address && typeof address !== "string") {
    throw new BadRequestError("Invalid address: Must be a string.");
  }
  next();
});
export { validateForm };
