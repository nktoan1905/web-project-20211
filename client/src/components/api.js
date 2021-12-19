export const getComments = async () => {
  return [
    {
      id: "1",
      body: "Hay",
      username: "Trường",
      userId: "1",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "2",
      body: "KO hayt",
      username: "Trường",
      userId: "2",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "3",
      body: "Bao giờ ra tập mới",
      username: "Toàn",
      userId: "2",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "4",
      body: "ad ơi em hỏi",
      username: "Đức",
      userId: "2",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
  ];
};

export const createComment = async (username,text, parentId = null) => {
  return {
    id: Math.random().toString(36).substring(2, 9),
    body: text,
    parentId,
    userId: "1",
    username,
    createdAt: new Date().toISOString(),
  };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};
