import jwt from "jsonwebtoken";

export const getUserDataFromToken = async (req) => {
  try {
    const token = req.cookies?.get("token")?.value || ""; // Ensure `req.cookies` exists before accessing

    if (!token) {
      console.log("Token not found in request cookies");
      return null;
    }

    if (!process.env.JWT_KEY) {
      console.error("JWT_KEY is missing in environment variables");
      return null;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    return decodedToken.id;
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return null; // Return null to indicate failure
  }
};
