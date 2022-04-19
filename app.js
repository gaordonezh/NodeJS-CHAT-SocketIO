const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
const helmet = require("helmet");
const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment-timezone");
const morgan = require("morgan");
const AuthRoutes = require("./routes/auth.routes");
const UserRoutes = require("./routes/user.routes");
const MessageRoutes = require("./routes/message.routes");
const RoomRoutes = require("./routes/room.routes");
const { getUsers } = require("./socket.controllers/user.socket.controllers");

dotenv.config();

class Server {
  constructor() {
    this.puerto = process.env.PORT || 4000;
    this.app = express();
    this.socketServer = http.createServer(this.app);
    this.io = require("socket.io")(this.socketServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        // allowedHeaders: [ 'my-custom-header' ],
        // credentials: true,
      },
    });

    moment.locale("es");
    moment.tz.setDefault("America/Lima");

    this.configurarMiddlewares();
    this.rutas();
    this.conectarBD();
    this.socketControllers();
  }

  socketControllers() {
    this.io.on("connection", (socket) => {
      socket.on("register", (general) => {
        socket.join(general);
      });

      socket.on("get_users", async (userId) => {
        const allUsers = await getUsers(userId);
        this.io.to(userId).emit("users_data", allUsers);
      });
    });
  }

  iniciarServidor() {
    this.socketServer.listen(this.puerto, () => {
      console.log(`Server running on PORT ${this.puerto}`);
    });
  }

  configurarMiddlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  rutas() {
    this.app.get("/", (req, res) => {
      res.json({ message: "Chat SOCKET-IO API Runing" });
    });

    this.app.use("/api/auth", AuthRoutes);
    this.app.use("/api/user", UserRoutes);
    this.app.use("/api/message", MessageRoutes);
    this.app.use("/api/room", RoomRoutes);
  }

  conectarBD() {
    console.log("Db is connecting...");
    mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
      })
      .then((db) => {
        console.log("Db is connect");
      })
      .catch((error) => console.log(error));
  }
}

module.exports = { Server };
