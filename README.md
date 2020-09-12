# The Friend Ship Chat App

A Vue + Go chat app inspired by [Ed Zynda's post on scotch.io](https://scotch.io/bar-talk/build-a-realtime-chat-server-with-go-and-websockets).

# Initial Setup

```
go mod init github.com/williamhaley/the-friend-ship
go mod tidy
```

# TODO

* [ ] Deployment
* [ ] Complex Vue app with cli, webpack
* [ ] Basic auth mechanism
  * [ ] Token set in header
  * [ ] One user (me for now) has a master password for creating chat rooms
  * [ ] Room admin can invite users (via link, optional password)
  * [ ] Users with links can join a room, get prompted for a username. Remember users by username
  * [ ] Local storage to store token and verify identity
  * [ ] How do identities sync between machines? "Set a password" to prove you own the account.
* [ ] See users in the chat
* [ ] Upload images
* [ ] Draw on images in chat
* [ ] Show notifications for new messages
* [ ] Works on mobile as web app
* [ ] Multiple channels
* [ ] Rename user, set user preferences (color, avatar)
* [ ] Align "my" messages to the right to differentiate

I'd like to avoid using a DB. Maybe just Sqlite for auth.
