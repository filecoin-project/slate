export const Peers = [
  {
    key: "peer-avatar",
    hideLabel: true,
    width: "56px",
    type: "AVATAR",
  },
  {
    key: "chain-head",
    name: "Chain Head",
    tooltip: "What is a Chain Head?",
    width: "224px",
  },
  {
    key: "height",
    name: "Height",
    tooltip: "Height",
    width: "120px",
  },
  {
    key: "location",
    name: "Location",
    width: "100%",
    type: "LOCATION",
  },
  {
    key: "upload",
    name: "Upload",
    width: "120px",
    type: "BANDWIDTH_UPLOAD",
  },
  {
    key: "download",
    name: "Download",
    width: "120px",
    type: "BANDWIDTH_DOWNLOAD",
  },
];

export const Wallet = [
  {
    key: "category",
    name: "Category",
    type: "TRANSACTION_DIRECTION",
    width: "120px",
  },
  { key: "amount", name: "Amount", width: "100%" },
  { key: "source", name: "Source", width: "196px" },
  {
    key: "destination",
    name: "Destination",
    width: "196px",
  },
  { key: "date", name: "Date", width: "120px" },
  {
    key: "status",
    name: "Status",
    type: "TRANSACTION_STATUS",
    width: "100px",
  },
];

export const Transactions = [
  {
    key: "category",
    name: "Category",
    type: "TRANSACTION_DIRECTION",
    width: "120px",
  },
  { key: "amount", name: "Amount", width: "100%" },
  { key: "source", name: "Source", width: "196px" },
  {
    key: "destination",
    name: "Destination",
    width: "196px",
  },
  { key: "date", name: "Date", width: "120px" },
  {
    key: "status",
    name: "Status",
    type: "TRANSACTION_STATUS",
    width: "100px",
  },
];

export const DataTransfer = [
  {
    key: "data-cid",
    name: "Data CID",
    copyable: true,
    tooltip: "Data CID explainer.",
    width: "224px",
  },
  {
    key: "deal-cid",
    name: "Deal CID",
    copyable: true,
    tooltip: "Deal CID explainer.",
    width: "100%",
  },
  {
    key: "data-source",
    name: "Source",
    width: "120px",
  },
  {
    key: "data-destination",
    name: "Destination",
    width: "120px",
  },
  { key: "size", name: "Size", width: "140px" },
];

export const ActivePaymentChannel = [
  {
    key: "category",
    name: "Category",
    width: "120px",
    type: "TRANSACTION_DIRECTION",
  },
  { key: "channel-id", name: "Channel ID", width: "100%" },
  { key: "max-value", name: "Maximum Filecoin", width: "144px" },
  { key: "current-value", name: "Current Filecoin", width: "144px" },
  {
    key: "redeemable",
    hideLabel: true,
    type: "BUTTON",
    width: "144px",
    action: "SIDEBAR_REDEEM_PAYMENT_CHANNEL",
  },
];

export const RedeemedPaymentChannel = [
  {
    key: "category",
    name: "Category",
    width: "120px",
    type: "TRANSACTION_DIRECTION",
  },
  { key: "channel-id", name: "Channel ID", width: "100%" },
  { key: "max-value", name: "Maximum Filecoin", width: "144px" },
  { key: "redeemed-value", name: "Redeemed Filecoin", width: "144px" },
];

export const Deals = [
  {
    key: "deal-category",
    name: "Deal",
    width: "48px",
    type: "DEAL_CATEGORY",
  },
  {
    key: "deal-cid",
    name: "Deal CID",
    copyable: true,
    tooltip: "CID Deal Explainer",
    width: "160px",
  },
  {
    key: "data-cid",
    name: "Data CID",
    copyable: true,
    tooltip: "Data CID Explainer",
    width: "100%",
  },
  { key: "miner", name: "Miner", width: "96px" },
  { key: "price", name: "Price", width: "96px" },
  {
    key: "auto-renew",
    name: "Auto renew",
    tooltip: "Auto renew explainer",
    type: "DEAL_AUTO_RENEW",
  },
  { key: "remaining", name: "Remaining", width: "96px" },
  { key: "status", name: "Status", type: "DEAL_STATUS" },
];
