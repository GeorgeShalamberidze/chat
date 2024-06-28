## Built with: 
 - React (TS)
 - Node/Express (TS)
 - Socket.IO
 - MongoDB

### Getting Started
1. Clone the repo
   ```sh
   git clone https://github.com/GeorgeShalamberidze/chat.git
   ```
2. Install packages
   ```sh
   code.
   cd server
   npm install & npm start (make sure to have ts-node installed globally: npm install -g ts-node
   cd..
   cd client
   npm install & npm run dev
   ```

Functionality: 
 - User Autorization/Authentication with JWT
 - Messaging service with registered user
 - Realtime chat update
 - Can see when and who sent last message
 - Can throw a link into input and will be reflected as a link (needs server for real link)
