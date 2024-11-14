import pkg from "jsonwebtoken";
const { verify } = pkg;
import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  try {
    // Check if the Authorization header exists and is correctly formatted
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    // Extract the token from the header
    const token = authHeader.split(" ")[1]; // Expected format: "Bearer <token>"

    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user info to the request object

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
export default auth;
