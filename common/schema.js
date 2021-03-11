//NOTE(martina): update this file anytime you add a new item to the user, file, or slate data blobs

export const userSchema = {
  id: true,
  username: true,
  data: {
    photo: true,
    body: true,
    name: true,
    tokens: true,
    settings: true,
    onboarding: true,
    status: true,
  },
};

export const coverImageSchema = {
  id: true,
  cid: true,
  date: true,
  data: {
    file: true,
    name: true,
    size: true,
    type: true,
    blurhash: true,
  },
};

export const fileSchema = {
  id: true,
  ownerId: true,
  cid: true,
  public: true,
  date: true,
  data: {
    file: true,
    name: true,
    size: true,
    type: true,
    blurhash: true,
    coverImage: coverImageSchema,
    body: true,
    source: true,
    author: true,
    unity: {
      config: true,
      loader: true,
    },
    downloads: true,
  },
};

export const slateSchema = {
  id: true,
  slatename: true,
  ownerId: true,
  data: {
    name: true,
    body: true,
    public: true,
    layouts: true,
    preview: true,
  },
};

/*
Users
[
  'body',
  'photo',
  'tokens',
  'library',
  'settings_deals_auto_approve',
  'allow_automatic_data_storage',
  'allow_encrypted_data_storage',
  'allow_filecoin_directory_listing',
  'name',
  'status',
  'onboarding',
  'description'
]
[
  'id',              'cid',
  'date',            'file',
  'icon',            'ipfs',
  'name',            'size',
  'type',            'decorator',
  'blurhash',        'unityGameConfig',
  'unityGameLoader', 'url',
  'public',          'previewImage',
  'coverImage',      'settings',
  'job',             'storage',
  'networks',        'retrieval'
]
[
  'id',       'cid',
  'url',      'date',
  'file',     'name',
  'size',     'type',
  'blurhash', 'decorator'
]

Slates
[
  'body',    'name',
  'public',  'objects',
  'ownerId', 'layouts',
  'preview'
]
[
  'id',              'url',
  'name',            'type',
  'title',           'ownerId',
  'cid',             'body',
  'author',          'source',
  'size',            'deeplink',
  'blurhash',        'unityGameConfig',
  'unityGameLoader', 'coverImage'
]
[
  'id',       'cid',
  'url',      'date',
  'file',     'name',
  'size',     'type',
  'blurhash', 'decorator'
]
*/
