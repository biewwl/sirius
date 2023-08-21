const chats = [
  {
    message: "Hi, i'm Paul",
    date: "2023-07-05 17:18:36",
    sender: {
      avatarUrl:
        "https://us.123rf.com/450wm/deagreez/deagreez2107/deagreez210700195/171115142-photo-of-young-weirdo-man-look-staring-empty-space-eyewear-wear-sweater-isolated-on-blue-color.jpg?ver=6",
      nick: "paul",
      name: "Paul Davies",
    },
    recipient: {
      avatarUrl:
        "https://i.ibb.co/kxcGJnb/C4-D7-BB6-A-C7-FE-4-D18-8627-B24-DA5-C77297.jpg",
      nick: "biel",
      name: "Gabriel Dias",
    },
    seen: true,
    excludeBySender: false,
    excludeByRecipient: false,
    respondingMessage: "no responding",
    id: 0,
    chat: {
      chatName: false,
      chatId: 0
    }
  },
  {
    message: "How are u?",
    date: "2023-07-05 17:18:50",
    sender: {
      avatarUrl:
        "https://us.123rf.com/450wm/deagreez/deagreez2107/deagreez210700195/171115142-photo-of-young-weirdo-man-look-staring-empty-space-eyewear-wear-sweater-isolated-on-blue-color.jpg?ver=6",
      nick: "paul",
      name: "Paul Davies",
    },
    recipient: {
      avatarUrl:
        "https://i.ibb.co/kxcGJnb/C4-D7-BB6-A-C7-FE-4-D18-8627-B24-DA5-C77297.jpg",
      nick: "biel",
      name: "Gabriel Dias",
    },
    seen: true,
    excludeBySender: false,
    excludeByRecipient: false,
    respondingMessage: "no responding",
    id: 1,
    chat: {
      chatName: "*",
      chatId: 0
    }
  },
  {
    message: "I'm Gabriel",
    date: "2023-07-05 17:19:10",
    sender: {
      avatarUrl:
        "https://i.ibb.co/kxcGJnb/C4-D7-BB6-A-C7-FE-4-D18-8627-B24-DA5-C77297.jpg",
      nick: "biel",
      name: "Gabriel Dias",
    },
    recipient: {
      avatarUrl:
        "https://us.123rf.com/450wm/deagreez/deagreez2107/deagreez210700195/171115142-photo-of-young-weirdo-man-look-staring-empty-space-eyewear-wear-sweater-isolated-on-blue-color.jpg?ver=6",
      nick: "paul",
      name: "Paul Davies",
    },
    seen: true,
    excludeBySender: false,
    excludeByRecipient: false,
    respondingMessage: "no responding",
    id: 2,
    chat: {
      chatName: "*",
      chatId: 0
    }
  },
  {
    message: "fine, and u?",
    date: "2023-07-05 17:19:20",
    sender: {
      avatarUrl:
        "https://i.ibb.co/kxcGJnb/C4-D7-BB6-A-C7-FE-4-D18-8627-B24-DA5-C77297.jpg",
      nick: "biel",
      name: "Gabriel Dias",
    },
    recipient: {
      avatarUrl:
        "https://us.123rf.com/450wm/deagreez/deagreez2107/deagreez210700195/171115142-photo-of-young-weirdo-man-look-staring-empty-space-eyewear-wear-sweater-isolated-on-blue-color.jpg?ver=6",
      nick: "paul",
      name: "Paul Davies",
    },
    seen: true,
    excludeBySender: false,
    excludeByRecipient: false,
    respondingMessage: 1,
    id: 3,
    chat: {
      chatName: "*",
      chatId: 0
    }
  },
  {
    message: "fine, and u?",
    date: "2023-07-05 17:19:20",
    sender: {
      avatarUrl:
        "https://i.ibb.co/kxcGJnb/C4-D7-BB6-A-C7-FE-4-D18-8627-B24-DA5-C77297.jpg",
      nick: "biel",
      name: "Gabriel Dias",
    },
    recipient: {
      avatarUrl:
        "https://us.123rf.com/450wm/deagreez/deagreez2107/deagreez210700195/171115142-photo-of-young-weirdo-man-look-staring-empty-space-eyewear-wear-sweater-isolated-on-blue-color.jpg?ver=6",
      nick: "paul",
      name: "Paul Davies",
    },
    seen: true,
    excludeBySender: false,
    excludeByRecipient: false,
    respondingMessage: 1,
    id: 4,
    chat: {
      chatName: "*",
      chatId: 0
    }
  },
  {
    message: "HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH",
    date: "2023-07-05 17:18:36",
    sender: {
      avatarUrl:
        "https://us.123rf.com/450wm/deagreez/deagreez2107/deagreez210700195/171115142-photo-of-young-weirdo-man-look-staring-empty-space-eyewear-wear-sweater-isolated-on-blue-color.jpg?ver=6",
      nick: "paul",
      name: "Paul Davies",
    },
    recipient: {
      avatarUrl:
        "https://i.ibb.co/kxcGJnb/C4-D7-BB6-A-C7-FE-4-D18-8627-B24-DA5-C77297.jpg",
      nick: "biel",
      name: "Gabriel Dias",
    },
    seen: true,
    excludeBySender: false,
    excludeByRecipient: false,
    respondingMessage: "no responding",
    id: 5,
    chat: {
      chatName: "*",
      chatId: 0
    }
  },
  {
    message: "Hi, i'm PaulHi, i'm PaulHi, i'm PaulHi, i'm PaulHi, i'm PaulHi, i'm PaulHi, i'm PaulHi, i'm PaulHi, i'm PaulHi, i'm PaulHi, i'm PaulHi, i'm PaulHi, i'm PaulHi, i'm PaulHi, i'm PaulHi, i'm PaulHi, i'm PaulHi, i'm PaulHi, i'm PaulHi, i'm PaulHi, i'm PaulHi, i'm PaulHi, i'm PaulHi, i'm PaulHi, i'm PaulHi, i'm PaulHi, i'm Paul",
    date: "2023-07-05 17:18:36",
    sender: {
      avatarUrl:
        "https://us.123rf.com/450wm/deagreez/deagreez2107/deagreez210700195/171115142-photo-of-young-weirdo-man-look-staring-empty-space-eyewear-wear-sweater-isolated-on-blue-color.jpg?ver=6",
      nick: "paul",
      name: "Paul Davies",
    },
    recipient: {
      avatarUrl:
        "https://i.ibb.co/kxcGJnb/C4-D7-BB6-A-C7-FE-4-D18-8627-B24-DA5-C77297.jpg",
      nick: "biel",
      name: "Gabriel Dias",
    },
    seen: true,
    excludeBySender: false,
    excludeByRecipient: false,
    respondingMessage: 2,
    id: 6,
    chat: {
      chatName: "*",
      chatId: 0
    }
  },
  {
    message: "fine, and u?",
    date: "2023-07-05 17:19:20",
    sender: {
      avatarUrl:
        "https://i.ibb.co/kxcGJnb/C4-D7-BB6-A-C7-FE-4-D18-8627-B24-DA5-C77297.jpg",
      nick: "biel",
      name: "Gabriel Dias",
    },
    recipient: {
      avatarUrl:
        "https://us.123rf.com/450wm/deagreez/deagreez2107/deagreez210700195/171115142-photo-of-young-weirdo-man-look-staring-empty-space-eyewear-wear-sweater-isolated-on-blue-color.jpg?ver=6",
      nick: "paul",
      name: "Paul Davies",
    },
    seen: true,
    excludeBySender: false,
    excludeByRecipient: false,
    respondingMessage: 6,
    id: 7,
    chat: {
      chatName: "*",
      chatId: 0
    }
  },
];

export default chats;
