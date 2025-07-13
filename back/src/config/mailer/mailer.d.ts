export type EmailInfo = {
  from?:   string, // Gmailによって上書きされる
  to:      string,
  subject: string,
  text:    string,
  html:    string,
  cc?:     string[],
  bcc?:    string[],
}
