import * as Constants from 'constants';

import FS from 'fs-extra';

export const resetFileSystem = async () => {
  console.log('[ prototype ] deleting old token and library data ');
  if (FS.existsSync(`./.data`)) {
    FS.removeSync('./.data', { recursive: true });
  }

  console.log('[ prototype ] deleting old avatar data ');
  if (FS.existsSync(Constants.AVATAR_STORAGE_URL)) {
    FS.removeSync(Constants.AVATAR_STORAGE_URL, { recursive: true });
  }

  console.log('[ prototype ] deleting old file data ');
  if (FS.existsSync(Constants.FILE_STORAGE_URL)) {
    FS.removeSync(Constants.FILE_STORAGE_URL, { recursive: true });
  }

  console.log('[ prototype ] creating new avatar folder ');
  FS.mkdirSync(Constants.AVATAR_STORAGE_URL, { recursive: true });
  FS.writeFileSync(`${Constants.AVATAR_STORAGE_URL}.gitkeep`, '');

  console.log('[ prototype ] creating new local file folder ');
  FS.mkdirSync(Constants.FILE_STORAGE_URL, { recursive: true });
  FS.writeFileSync(`${Constants.FILE_STORAGE_URL}.gitkeep`, '');

  return true;
};

// NOTE(jim): Data that does not require a Powergate token.
export const refresh = async ({ PG }) => {
  const Health = await PG.health.check();
  const status = Health.status ? Health.status : null;
  const messageList = Health.messageList ? Health.messageList : null;

  const Peers = await PG.net.peers();
  const peersList = Peers.peersList ? Peers.peersList : null;

  return { peersList, messageList, status };
};

// NOTE(jim): Data that does require a powergate token.
export const refreshWithToken = async ({ PG }) => {
  const Addresses = await PG.ffs.addrs();
  const addrsList = Addresses.addrsList ? Addresses.addrsList : null;

  const NetworkInfo = await PG.ffs.info();
  const info = NetworkInfo.info ? NetworkInfo.info : null;

  return { addrsList, info };
};

export const emitState = async ({ state, client, PG }) => {
  const { peersList, messageList, status } = await refresh({ PG });
  const { addrsList, info } = await refreshWithToken({ PG });

  const data = await updateStateData(state, {
    peersList,
    messageList,
    status,
    addrsList,
    info,
    state,
  });

  if (client) {
    client.send(JSON.stringify({ action: 'UPDATE_VIEWER', data }));
  }

  return data;
};

export const getFileName = (s) => {
  let target = s;
  if (target.endsWith('/')) {
    target = target.substring(0, target.length - 1);
  }

  return target.substr(target.lastIndexOf('/') + 1);
};

export const createFile = ({ id, data }) => {
  return {
    decorator: 'FILE',
    id: id,
    icon: 'PNG',
    file: getFileName(id),
    miner: null,
    job_id: null,
    cid: null,
    date: new Date(),
    size: data.size,
    amount: 0,
    remaining: null,
    deal_category: 1,
    retrieval_status: 0,
    storage_status: 0,
    errors: [],
  };
};

export const createFolder = ({ id }) => {
  return {
    decorator: 'FOLDER',
    id,
    folderId: id,
    icon: 'FOLDER',
    file: getFileName(id),
    name: getFileName(id),
    pageTitle: null,
    date: null,
    size: null,
    children: [],
  };
};

export const updateStateData = async (state, newState) => {
  return {
    ...state,
    ...newState,
  };
};

// TODO(jim): Refactor this so we repeat this less often.
export const refreshLibrary = async ({ state, PG, FFS }) => {
  let write = false;
  for (let i = 0; i < state.library.length; i++) {
    for (let j = 0; j < state.library[i].children.length; j++) {
      if (state.library[i].children[j].job_id) {
        if (state.library[i].children[j].storage_status === 1) {
          console.log(
            '[ prototype ] update file',
            state.library[i].children[j]
          );
          state.library[i].children[j].storage_status = 2;
          write = true;
          continue;
        }

        PG.ffs.watchJobs((job) => {
          console.log('[ prototype ] job status', job.status);
          if (job.status === FFS.JobStatus.JOB_STATUS_SUCCESS) {
            console.log(
              '[ prototype ] update file',
              state.library[i].children[j]
            );
            state.library[i].children[j].storage_status = 6;
            write = true;
          }
        }, state.library[i].children[j].job_id);
      }
    }
  }

  if (write) {
    FS.writeFileSync(
      './.data/library.json',
      JSON.stringify({ library: state.library })
    );
  }

  return { ...state };
};
