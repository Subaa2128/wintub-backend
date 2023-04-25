import userSchema from "../schema/user.schema";
import jwt from "jsonwebtoken";

export const middlerwareUser = async (req, res, next) => {
  // const tokenHeaderKey = req.headers.autherisation;
  // try {
  //   const token = req.header(tokenHeaderKey);

  //   const isUser = await userSchema.findOne({ token });

  //   if (!isUser) return;

  //   if (isUser.role !== "admin") {
  //     return res.status(403).message("you are not an admin");
  //   }

  //   next();
  // } catch (error) {
  //   res.status(500).json({ error: { message: "something went wrong" } });
  // }

  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};
