import { FilecoinNumber, Converter } from "@glif/filecoin-number";

export const formatAsFilecoinConversion = (number) => {
  const filecoinNumber = new FilecoinNumber(`${number}`, "attofil");
  //const inAttoFil = filecoinNumber.toAttoFil();
  const inFil = filecoinNumber.toFil();
  return `${formatAsFilecoin(inFil)}`;
};

export const formatAsFilecoin = (number) => {
  return `${number} FIL`;
};
