import { SMTPServer } from "smtp-server"
import { simpleParser } from "mailparser"
const server = new SMTPServer({
  authOptional: true,
  onData(stream, session, callback) {
    simpleParser(stream)
      .then(mail => {
        if (!mail.from || !mail.to || !mail.subject || !mail.text) return
        console.log("📩 New mail received:");
        console.log("From:", mail.from.text);
        console.log("To:", mail.to);
        console.log("Subject:", mail.subject);
        console.log("Text:", mail.text);
        callback(null)
      })
      .catch(error => callback(error))
  }
})

server.listen(2525, () => console.log("Mail server is running on port 2525"))
