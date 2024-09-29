import jwt from "jsonwebtoken";
export const createTokenPair = async (payload, accessKey, refreshKey) => {
  try {
    const accessToken = await jwt.sign(payload, accessKey, {
      expiresIn: "30s",
    });
    const refreshToken = await jwt.sign(payload, refreshKey, {
      expiresIn: "300s",
    });
    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

export const createAccessToken = async (payload, accessKey) => {
  try {
    const accessToken = await jwt.sign(payload, accessKey, {
      expiresIn: "30s",
    });
    return accessToken;
  } catch (error) {
    throw error;
  }
};
