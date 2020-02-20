/// <reference types="react" />
declare type OptionType = {
  label: string;
  value?: string;
  id?: string;
};
declare const DuelingPicklist: ({
  options,
  label
}: {
  label: string;
  options: (string | OptionType)[];
}) => JSX.Element;
export default DuelingPicklist;
//# sourceMappingURL=DuelingPicklist.d.ts.map
