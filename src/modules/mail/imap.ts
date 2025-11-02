import { createServer } from "http";
import net from "net"

class Connection {
  constructor(socket: net.Socket, handler: (req: IMAPRequest, res: IMAPResponse) => void) {

  }
}

type IMAPSession = {
  username?: string;
  authenticated: boolean;
};

export type IMAPRequest = {
  tag: string
  command: string
  args: string[]
  raw: string
  socket: net.Socket
  session: Record<string, any>
}

export type IMAPResponse = {
  ok: (msg?: string) => void;
  no: (msg?: string) => void;
  bad: (msg?: string) => void;
  bye: (msg?: string) => void;
  write: (msg: string) => void;
};

export default function createIMAP(handler: (req: IMAPRequest, res: IMAPResponse) => void) {
  const server = net.createServer(socket => {
    socket.write("* OK IMAP4rev1 Service Ready\r\n")

  })

  return server
}

createServer