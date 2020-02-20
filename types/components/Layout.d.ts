/// <reference types="react" />
declare const Layout: ({
  children,
  white,
  getSize,
  heightVariances
}: {
  children: any;
  white?: boolean | undefined;
  getSize?: boolean | undefined;
  heightVariances?:
    | {
        upper: number;
        lower: number;
      }
    | undefined;
}) => JSX.Element;
export default Layout;
//# sourceMappingURL=Layout.d.ts.map
