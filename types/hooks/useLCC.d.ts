declare const useLCC: (messageFunction?: ((message: any) => PromiseLike<{
    type: string;
    payload: any;
}>) | undefined) => ((message: any, returnMessageType?: any) => Promise<unknown>)[];
export default useLCC;
//# sourceMappingURL=useLCC.d.ts.map