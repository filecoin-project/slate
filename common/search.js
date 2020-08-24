createUserSearchResult = (user) => {
  return {
    id: user.id,
    type: "user",
    name: user.data.name,
    username: user.username,
    url: user.data.photo,
  };
};

createSlateSearchResult = (slate) => {
  let files;
  if (slate.data.objects.length > 3) {
    files = slate.data.objects.slice(0, 3);
  } else {
    files = slate.data.objects;
  }
  return {
    id: slate.id,
    type: "slate",
    name: slate.slatename,
    username: slate.user.username,
    url: files.map((file) => {
      return {
        type: file.type
          ? file.type.includes("image")
            ? "image"
            : "file"
          : "file",
        name: file.name,
        url: file.url,
      };
    }),
  };
};

createFileSearchResult = (file) => {
  return {
    id: file.id,
    type: file.type ? (file.type.includes("image") ? "image" : "file") : "file",
    name: file.name,
    username: file.user.username,
    url: file.url,
  };
};
