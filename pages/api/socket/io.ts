import {Server as NetServer} from "http";
import {NextApiRequest} from "next";
import {Server as ServerIO} from "socket.io";
import {NextApiResponseServerIO} from "@/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    res.socket.server.io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    });
  }

  res.end();
}

export default ioHandler;