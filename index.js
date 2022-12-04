const http = require("http");
const app = require("./app");
const jwt = require("jsonwebtoken");
const server = http.createServer(app);

// const { API_PORT } = process.env;
const port = 5000;
const tokenKey = process.env.TOKEN_KEY;
const refreshTokenKey = "dinhhuudat-refreshToken";
const refreshTokenLife = "5m";

var refreshTokens = {}; // tao mot object chua nhung refreshTokens

const user = {
  id: 1,
  name: "dinhhuudat",
};

const createJWT = () => {
  const token = jwt.sign({ user_id: user.id, user_name: user.name }, tokenKey, {
    expiresIn: "1m",
  });
  const refreshToken = jwt.sign(user, refreshTokenKey, {
    expiresIn: refreshTokenLife,
  });

  return { token, refreshToken };
};

const refreshToken=(req,res,next)=>{
  // const refreshToken = req;
  console.log(1,req.body)
  let newRefreshToken;
  // if(refreshToken){
    newRefreshToken = createJWT()
    // res.json(res)
  // }
    return next();
}

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, tokenKey);
    res.json(decoded);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

app.get("/getToken", (req, res) => {
  const token = createJWT();
  res.status(200).json(token);
});

app.get("/sendToken", verifyToken, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

app.post("/refreshToken", refreshToken, (req, res) => {
    res.status(200).send("refresh token 🙌 ");
  });

app.get("*", (req, res) => {
  res.json("Hello");
});

// server listening
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
