import * as Constants from "~/common/constants";

// NOTE(martina): Actions
import { dispatchCustomEvent } from "~/common/custom-events";

// NOTE(jim): Modules
/*
import { CreateToken } from "~/components/system/modules/CreateToken";
import { PeersList } from "~/components/system/modules/PeersList";
import { FriendsList } from "~/components/system/modules/FriendsList";
import { CreateFilecoinAddress } from "~/components/system/modules/CreateFilecoinAddress";
import { CreateFilecoinStorageDeal } from "~/components/system/modules/CreateFilecoinStorageDeal";
import { SendAddressFilecoin } from "~/components/system/modules/SendAddressFilecoin";
import { FilecoinBalancesList } from "~/components/system/modules/FilecoinBalancesList";
import {
  FilecoinStorageDealsList,
  FilecoinRetrievalDealsList,
} from "~/components/system/modules/FilecoinDealsList";
import { FilecoinSettings } from "~/components/system/modules/FilecoinSettings";
*/

// NOTE(jim): Global components
// import { GlobalModal } from "~/components/system/components/GlobalModal";
// import { GlobalCarousel } from "~/components/system/components/GlobalCarousel";
import { GlobalNotification } from "~/components/system/components/GlobalNotification";

// NOTE(jim): Components
import {
  ButtonPrimary,
  ButtonPrimaryFull,
  ButtonSecondary,
  ButtonSecondaryFull,
  ButtonTertiary,
  ButtonTertiaryFull,
  ButtonDisabled,
  ButtonDisabledFull,
  ButtonWarning,
} from "~/components/system/components/Buttons";
import { CardTabGroup } from "~/components/system/components/CardTabGroup";
import { Card3D } from "~/components/system/components/Card3D";
import { CheckBox } from "~/components/system/components/CheckBox";
import { CodeTextarea } from "~/components/system/components/CodeTextarea";
// import { DatePicker } from "~/components/system/components/DatePicker";
import { Input } from "~/components/system/components/Input";
import { ListEditor } from "~/components/system/components/ListEditor";
import { HoverTile } from "~/components/system/components/HoverTile";
import { HoverTileColorful } from "~/components/system/components/HoverTileColorful";
import { PopoverNavigation } from "~/components/system/components/PopoverNavigation";
import { RadioGroup } from "~/components/system/components/RadioGroup";
import {
  LoaderCircles,
  LoaderDiamonds,
  LoaderMoon,
  LoaderRotate,
  LoaderProgress,
  LoaderSpinner,
} from "~/components/system/components/Loaders";
import { Slider } from "~/components/system/components/Slider";
import { SelectCountryMenu, SelectMenu } from "~/components/system/components/SelectMenus";
import { StatUpload, StatDownload } from "~/components/system/components/Stat";
import { TabGroup } from "~/components/system/components/TabGroup";
import { Table } from "~/components/system/components/Table";
import { Textarea } from "~/components/system/components/Textarea";
import { Toggle } from "~/components/system/components/Toggle";
import { H1, H2, H3, H4, P, UL, OL, LI } from "~/components/system/components/Typography";

// NOTE(jim): Fragments
import { Boundary } from "~/components/system/components/fragments/Boundary";
import { CodeText } from "~/components/system/components/fragments/CodeText";
import {
  GlobalTooltip,
  TooltipAnchor,
  TooltipWrapper,
} from "~/components/system/components/fragments/GlobalTooltip";
import { DescriptionGroup } from "~/components/system/components/fragments/DescriptionGroup";
import {
  TableContent,
  TableColumn,
} from "~/components/system/components/fragments/TableComponents";

import { AvatarGroup } from "~/components/system/components/AvatarGroup";

import * as SVG from "~/common/svg";

import ViewSourceLink from "~/components/system/ViewSourceLink";

// NOTE(jim): Export everything.
export {
  // NOTE(martina): Actions
  dispatchCustomEvent,
  // NOTE(jim): Modules
  /*
  CreateToken,
  PeersList,
  CreateFilecoinAddress,
  CreateFilecoinStorageDeal,
  SendAddressFilecoin,
  FilecoinBalancesList,
  FilecoinRetrievalDealsList,
  FilecoinStorageDealsList,
  FilecoinSettings,
  FriendsList,
  */
  // NOTE(jim): Global
  // GlobalModal,
  // GlobalCarousel,
  GlobalNotification,
  // NOTE(jim): Components
  ButtonPrimary,
  ButtonPrimaryFull,
  ButtonSecondary,
  ButtonSecondaryFull,
  ButtonTertiary,
  ButtonTertiaryFull,
  ButtonDisabled,
  ButtonDisabledFull,
  ButtonWarning,
  CardTabGroup,
  Card3D,
  CheckBox,
  CodeText,
  CodeTextarea,
  // DatePicker,
  Input,
  HoverTile,
  HoverTileColorful,
  ListEditor,
  PopoverNavigation,
  RadioGroup,
  SelectCountryMenu,
  SelectMenu,
  Slider,
  StatUpload,
  StatDownload,
  TabGroup,
  Table,
  Textarea,
  Toggle,
  H1,
  H2,
  H3,
  H4,
  P,
  UL,
  OL,
  LI,
  ViewSourceLink,
  // NOTE(jim): Fragments, not meant to be used.
  Boundary,
  DescriptionGroup,
  GlobalTooltip,
  TableContent,
  TableColumn,
  TooltipAnchor,
  TooltipWrapper,
  // NOTE(jim): System values
  Constants,
  SVG,
  LoaderCircles,
  LoaderDiamonds,
  LoaderMoon,
  LoaderRotate,
  LoaderProgress,
  LoaderSpinner,
  AvatarGroup,
};
