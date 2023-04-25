import userSchema from "../schema/user.schema";
import jwt from "jsonwebtoken";

export const middlerwareUser = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(req.headers);

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    console.log(decoded);
    const isUser = await userSchema.findOne({ email: decoded.email });

    if (!isUser) return res.status(403).send("Invalid User Authentication");

    if (isUser.role !== "admin")
      return res.status(403).send("Invalid User Authentication");

    next();
  } catch (err) {
    console.log(err);
    return res.status(403).send("Invalid User Authentication");
  }
};
