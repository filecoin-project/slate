export const user = (entity) => {
  return {
    type: "USER",
    id: entity.id,
    username: entity.username,
    data: {
      name: entity.data.name,
      photo: entity.data.photo,
      body: entity.data.body,
    },
  };
};

export const slate = (entity) => {
  return {
    type: "SLATE",
    id: entity.id,
    slatename: entity.slatename,
    data: {
      ownerId: entity.data.ownerId,
      name: entity.data.name,
      body: entity.data.body,
      objects: entity.data.objects,
    },
  };
};
