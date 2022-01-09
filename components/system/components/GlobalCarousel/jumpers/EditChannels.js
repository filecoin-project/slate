import * as React from "react";
import * as Styles from "~/common/styles";
import * as System from "~/components/system";
import * as Jumper from "~/components/system/components/fragments/Jumper";
import * as SVG from "~/common/svg";
import * as Actions from "~/common/actions";
import * as UserBehaviors from "~/common/user-behaviors";
import * as Constants from "~/common/constants";
import * as MobileJumper from "~/components/system/components/fragments/MobileJumper";
import * as Strings from "~/common/strings";
import * as Validations from "~/common/validations";
import * as Events from "~/common/custom-events";
import * as RovingTabIndex from "~/components/core/RovingTabIndex";

import { Show } from "~/components/utility/Show";
import { css } from "@emotion/react";
import { AnimateSharedLayout, motion } from "framer-motion";
import { v4 as uuid } from "uuid";
import { useEventListener } from "~/common/hooks";

const STYLES_CHANNEL_BUTTON = (theme) => css`
  position: relative;
  padding: 5px 12px 7px;
  border: 1px solid ${theme.semantic.borderGrayLight4};
  border-radius: 12px;
  color: ${theme.semantic.textBlack};
  background-color: transparent;
  transition: background-color 0.3 ease-in-out;
`;

const STYLES_CHANNEL_BUTTON_SELECTED = (theme) => css`
  background-color: ${theme.semantic.bgGrayLight4};
`;

const ChannelButton = React.forwardRef(({ children, isSelected, css, ...props }, ref) => {
  return (
    <System.ButtonPrimitive
      {...props}
      ref={ref}
      css={[STYLES_CHANNEL_BUTTON, isSelected && STYLES_CHANNEL_BUTTON_SELECTED, css]}
    >
      <System.P2 nbrOflines={1} as="span">
        {children}
      </System.P2>
    </System.ButtonPrimitive>
  );
});

/* -----------------------------------------------------------------------------------------------*/

const STYLES_RETURN_KEY = (theme) => css`
  padding: 0px 2px;
  border-radius: 6px;
  background-color: ${theme.semantic.bgGrayLight};
`;

function ChannelKeyboardShortcut({ searchResults, searchQuery, onAddFileToChannel }) {
  const [isFileAdded, setIsFileAdded] = React.useState(false);
  React.useLayoutEffect(() => {
    if (isFileAdded) {
      setIsFileAdded(false);
    }
  }, [searchQuery]);

  const { publicChannels, privateChannels } = searchResults;
  const selectedChannel = [...publicChannels, ...privateChannels][0];

  useEventListener({
    type: "keydown",
    handler: (e) => {
      if (e.key === "Enter") {
        onAddFileToChannel(selectedChannel, selectedChannel.doesContainFile);
        setIsFileAdded(true);
      }
    },
  });

  // NOTE(amine): don't show the 'select channel ⏎' hint when the channel is created optimistically
  if (isFileAdded || !selectedChannel?.ownerId) return null;

  return (
    <div css={Styles.HORIZONTAL_CONTAINER_CENTERED}>
      <System.P3 color="textGray" style={{ display: "inline-flex" }}>
        Select {selectedChannel.isPublic ? "public" : "private"} tag "
        <System.P3 nbrOflines={1} as="span" style={{ maxWidth: 100 }}>
          {selectedChannel.slatename}
        </System.P3>
        "
      </System.P3>
      <System.P3 css={STYLES_RETURN_KEY} style={{ marginLeft: 4 }}>
        ⏎
      </System.P3>
    </div>
  );
}

const STYLES_SEARCH_TAGS_INPUT = (theme) => css`
  background-color: transparent;
  ${theme.semantic.textGray};
  box-shadow: none;
  height: 52px;
  padding: 0px;
  ::placeholder {
    color: ${theme.semantic.textGray};
  }
`;

const STYLES_SEARCH_TAGS_INPUT_WRAPPER = (theme) => css`
  color: ${theme.semantic.textGray};
  width: 100%;
  margin: 1px;
`;

function ChannelInput({ value, searchResults, onChange, onAddFileToChannel, ...props }) {
  const { publicChannels, privateChannels } = searchResults;
  const [isShortcutVisible, setShortcutVisibility] = React.useState();

  React.useEffect(() => {
    if (value && publicChannels.length + privateChannels.length === 1) {
      setShortcutVisibility(true);
    } else {
      setShortcutVisibility(false);
    }
  }, [value]);

  return (
    <div css={[STYLES_SEARCH_TAGS_INPUT_WRAPPER, Styles.CONTAINER_CENTERED]}>
      <SVG.Hash width={16} />
      <div style={{ position: "relative", width: "100%" }}>
        <System.Input
          full
          value={value}
          onChange={onChange}
          name="search"
          placeholder="Search or create a new tag"
          inputCss={STYLES_SEARCH_TAGS_INPUT}
          {...props}
        />
        <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", right: 20 }}>
          {isShortcutVisible ? (
            <ChannelKeyboardShortcut
              searchQuery={value}
              searchResults={searchResults}
              onAddFileToChannel={onAddFileToChannel}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------------------------------*/
const STYLES_TAG = (theme) => css`
  padding: 7px 12px 9px;
  border-radius: 12px;
  background-color: ${theme.semantic.bgGrayLight4};
`;

function ChannelsEmpty() {
  return (
    <div css={Styles.VERTICAL_CONTAINER_CENTERED}>
      <System.P2 color="textGrayDark" style={{ textAlign: "center" }}>
        You don’t have any tags yet. <br /> Start typing above to create one.
      </System.P2>
      <div css={STYLES_TAG} style={{ marginTop: 19 }}>
        <SVG.Hash width={16} height={16} style={{ display: "block" }} />
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------------------------------*/

const STYLES_CHANNEL_BUTTONS_WRAPPER = css`
  display: flex;
  flex-wrap: wrap;
  margin: calc(-8px + 6px) 0 0 -8px;
  width: calc(100% + 8px);

  & > * {
    margin: 8px 0 0 8px !important;
  }
`;

function Channels({
  header,
  isPublic,

  searchQuery,

  channels,
  isCreatingChannel,

  onAddFileToChannel,
  onCreateChannel,
}) {
  const showChannel = !isCreatingChannel && channels.length === 0;

  return !showChannel ? (
    <div>
      <System.H6 as="h2" color="textGray">
        {isCreatingChannel ? `Create ${header.toLowerCase()} tag` : header}
      </System.H6>

      <Show when={isCreatingChannel && isPublic}>
        <System.P3 color="textGray" style={{ marginTop: 2 }}>
          Objects with a public tag will show up on your public profile.
        </System.P3>
      </Show>

      <AnimateSharedLayout>
        <RovingTabIndex.Provider axis="horizontal">
          <RovingTabIndex.List css={STYLES_CHANNEL_BUTTONS_WRAPPER}>
            {channels.map((channel, index) => (
              <motion.div layoutId={`jumper-${channel.id}`} initial={false} key={channel.id}>
                <RovingTabIndex.Item index={index}>
                  <ChannelButton
                    isSelected={channel.doesContainFile}
                    onClick={() => onAddFileToChannel(channel, channel.doesContainFile)}
                    title={channel.slatename}
                    style={{ maxWidth: "48ch" }}
                  >
                    {channel.slatename}
                  </ChannelButton>
                </RovingTabIndex.Item>
              </motion.div>
            ))}

            <Show when={isCreatingChannel}>
              <motion.div initial={{ opacity: 0.5, y: 4 }} animate={{ opacity: 1, y: 0 }}>
                <RovingTabIndex.Item index={channels.length}>
                  <ChannelButton
                    css={Styles.HORIZONTAL_CONTAINER_CENTERED}
                    onClick={(e) => (e.stopPropagation(), onCreateChannel(searchQuery))}
                    title={searchQuery}
                  >
                    <SVG.Plus
                      width={16}
                      height={16}
                      style={{
                        position: "relative",
                        top: -1,
                        verticalAlign: "middle",
                        pointerEvents: "none",
                        display: "inline",
                      }}
                    />
                    <span style={{ marginLeft: 4 }}>{searchQuery}</span>
                  </ChannelButton>
                </RovingTabIndex.Item>
              </motion.div>
            </Show>
          </RovingTabIndex.List>
        </RovingTabIndex.Provider>
      </AnimateSharedLayout>
    </div>
  ) : null;
}

/* -----------------------------------------------------------------------------------------------*/

const useChannels = ({ viewer, file }) => {
  const [channels, setChannels] = React.useState(viewer.slates);

  const handleAddFileToChannel = async (slate, isSelected) => {
    const prevSlates = [...channels];
    const resetViewerSlates = () => setChannels(prevSlates);

    if (isSelected) {
      const newChannels = channels.map((item) => {
        if (slate.id === item.id) {
          return { ...item, objects: item.objects.filter((object) => object.id !== file.id) };
        }
        return item;
      });
      setChannels(newChannels);

      const response = await UserBehaviors.removeFromSlate({ slate, ids: [file.id] });
      if (!response) resetViewerSlates();
      return;
    }

    const newChannels = channels.map((item) => {
      if (slate.id === item.id) return { ...item, objects: [...item.objects, file] };
      return item;
    });
    setChannels(newChannels);

    const response = await UserBehaviors.saveCopy({ slate, files: [file], showAlerts: false });
    if (!response) resetViewerSlates();
  };

  const handleCreateChannel = (isPublic) => async (name) => {
    const generatedId = uuid();
    setChannels([...channels, { id: generatedId, slatename: name, isPublic, objects: [file] }]);

    const response = await Actions.createSlate({
      name: name,
      isPublic,
      hydrateViewer: false,
    });

    if (Events.hasError(response)) {
      setChannels(channels.filter((channel) => channel.id !== generatedId));
      return;
    }

    // NOTE(amine): replace generated id with response
    const prevChannels = channels.filter((channel) => channel.id !== generatedId);
    setChannels([...prevChannels, { ...response.slate, objects: [file] }]);

    const saveResponse = await UserBehaviors.saveCopy({
      slate: response.slate,
      files: [file],
      showAlerts: false,
    });

    if (Events.hasError(saveResponse)) {
      setChannels([prevChannels, ...response.slate]);
    }
  };
  return [channels, { handleCreateChannel, handleAddFileToChannel }];
};

const useGetPrivateAndPublicChannels = ({ slates, file }) =>
  React.useMemo(() => {
    const privateChannels = [];
    const publicChannels = [];

    slates.forEach((slate) => {
      const doesContainFile = slate.objects.some((item) => item.id === file.id);

      if (slate.isPublic) {
        publicChannels.push({ ...slate, doesContainFile });
        return;
      }
      privateChannels.push({ ...slate, doesContainFile });
    });

    privateChannels.sort((a, b) => a.createdAt - b.createdAt);
    publicChannels.sort((a, b) => a.createdAt - b.createdAt);

    return { privateChannels, publicChannels };
  }, [slates, file.id]);

const useChannelsSearch = ({ privateChannels, publicChannels }) => {
  const [query, setQuery] = React.useState("");

  const { results, channelAlreadyExists } = React.useMemo(() => {
    let channelAlreadyExists = false;

    const results = { privateChannels: [], publicChannels: [] };
    const searchRegex = new RegExp(query, "gi");

    results.privateChannels = privateChannels.filter((channel) => {
      if (channel.slatename === query) channelAlreadyExists = true;
      return searchRegex.test(channel.slatename);
    });

    results.publicChannels = publicChannels.filter((channel) => {
      if (channel.slatename === query) channelAlreadyExists = true;
      return searchRegex.test(channel.slatename);
    });

    return { results, channelAlreadyExists };
  }, [query, privateChannels, publicChannels]);

  const handleQueryChange = (e) => {
    const nextValue = e.target.value;
    //NOTE(amine): allow input's value to be empty but keep other validations
    if (Strings.isEmpty(nextValue) || Validations.slatename(nextValue)) {
      setQuery(Strings.createSlug(nextValue, ""));
    }
  };
  const clearQuery = () => setQuery("");

  return [
    { searchQuery: query, searchResults: results, channelAlreadyExists },
    { handleQueryChange, clearQuery },
  ];
};

export function EditChannels({ file, viewer, isOpen, onClose, ...props }) {
  const [channels, { handleAddFileToChannel, handleCreateChannel }] = useChannels({
    viewer,
    file,
  });

  const { privateChannels, publicChannels } = useGetPrivateAndPublicChannels({
    slates: channels,
    file,
  });

  const [{ searchQuery, searchResults, channelAlreadyExists }, { handleQueryChange, clearQuery }] =
    useChannelsSearch({
      privateChannels: privateChannels,
      publicChannels: publicChannels,
    });

  const isSearching = searchQuery.length > 0;

  const showEmptyState = !isSearching && channels.length === 0;

  return (
    <Jumper.AnimatePresence>
      {isOpen ? (
        <Jumper.Root onClose={() => (onClose(), clearQuery())} {...props}>
          <Jumper.Header style={{ paddingTop: 0, paddingBottom: 0 }}>
            <ChannelInput
              value={searchQuery}
              onChange={handleQueryChange}
              searchResults={searchResults}
              autoFocus
              onAddFileToChannel={handleAddFileToChannel}
            />
            <Jumper.Dismiss />
          </Jumper.Header>
          <Jumper.Divider />
          <Jumper.ObjectInfo file={file} />
          <Jumper.Divider />
          {showEmptyState ? (
            <Jumper.Item style={{ flexGrow: 1 }} css={Styles.CONTAINER_CENTERED}>
              <ChannelsEmpty />
            </Jumper.Item>
          ) : (
            <Jumper.Item style={{ overflowY: "auto", flex: "1 0 0" }}>
              <Channels
                header="Private"
                isCreatingChannel={isSearching && !channelAlreadyExists}
                channels={isSearching ? searchResults.privateChannels : privateChannels}
                searchQuery={searchQuery}
                onAddFileToChannel={handleAddFileToChannel}
                onCreateChannel={(query) => (handleCreateChannel(false)(query), clearQuery())}
                file={file}
                viewer={viewer}
              />
              <div style={{ marginTop: 20 }}>
                <Channels
                  header="Public"
                  isPublic
                  searchQuery={searchQuery}
                  isCreatingChannel={isSearching && !channelAlreadyExists}
                  channels={isSearching ? searchResults.publicChannels : publicChannels}
                  onAddFileToChannel={handleAddFileToChannel}
                  onCreateChannel={(query) => (handleCreateChannel(true)(query), clearQuery())}
                />
              </div>
            </Jumper.Item>
          )}
        </Jumper.Root>
      ) : null}
    </Jumper.AnimatePresence>
  );
}

export function EditChannelsMobile({ file, viewer, isOpen, onClose }) {
  const [channels, { handleAddFileToChannel, handleCreateChannel }] = useChannels({
    viewer,
    file,
  });

  const { privateChannels, publicChannels } = useGetPrivateAndPublicChannels({
    slates: channels,
    file,
  });

  const [{ searchQuery, searchResults, channelAlreadyExists }, { handleQueryChange, clearQuery }] =
    useChannelsSearch({
      privateChannels: privateChannels,
      publicChannels: publicChannels,
    });

  const isSearching = searchQuery.length > 0;

  return (
    <MobileJumper.AnimatePresence>
      {isOpen ? (
        <MobileJumper.Root onClose={onClose}>
          <System.Divider height={1} color="borderGrayLight" />
          <MobileJumper.ObjectInfo file={file} />
          <System.Divider height={1} color="borderGrayLight" />
          <MobileJumper.Header style={{ paddingTop: 0, paddingBottom: 0 }}>
            <ChannelInput
              value={searchQuery}
              onChange={handleQueryChange}
              searchResults={searchResults}
              onAddFileToChannel={handleAddFileToChannel}
              autoFocus
            />
          </MobileJumper.Header>
          <System.Divider height={1} color="borderGrayLight" />
          <MobileJumper.Content style={{ paddingBottom: 60 }}>
            <Channels
              header="Private"
              isCreatingChannel={isSearching && !channelAlreadyExists}
              channels={isSearching ? searchResults.privateChannels : privateChannels}
              searchQuery={searchQuery}
              onAddFileToChannel={handleAddFileToChannel}
              onCreateChannel={(query) => (handleCreateChannel(false)(query), clearQuery())}
            />
            <div style={{ marginTop: 20 }}>
              <Channels
                header="Public"
                isPublic
                searchQuery={searchQuery}
                isCreatingChannel={isSearching && !channelAlreadyExists}
                channels={isSearching ? searchResults.publicChannels : publicChannels}
                onAddFileToChannel={handleAddFileToChannel}
                onCreateChannel={(query) => (handleCreateChannel(true)(query), clearQuery())}
              />
            </div>
          </MobileJumper.Content>
          <MobileJumper.Footer css={Styles.HORIZONTAL_CONTAINER_CENTERED}>
            <System.ButtonPrimitive type="button" onClick={() => (onClose(), clearQuery())}>
              <SVG.Hash width={16} height={16} style={{ color: Constants.system.blue }} />
            </System.ButtonPrimitive>
          </MobileJumper.Footer>
        </MobileJumper.Root>
      ) : null}
    </MobileJumper.AnimatePresence>
  );
}
