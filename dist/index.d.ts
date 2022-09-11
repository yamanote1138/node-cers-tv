declare type Protocol = 'http' | 'https';
declare class CersTVClient {
    protected readonly _protocol: Protocol;
    protected readonly _host: string;
    protected readonly _port: number;
    protected readonly _macAddress: string;
    protected readonly _name: string;
    constructor(host: string, macAddress: string, name: string, port?: number, protocol?: Protocol);
    protected _validate: () => void;
    protected _send: (method: string, path: string, data?: string) => Promise<import("node-fetch").Response>;
    register: () => Promise<import("node-fetch").Response>;
    getRemoteCommandList: () => Promise<import("node-fetch").Response>;
    sendIrCommand: (cmdCode: string) => Promise<import("node-fetch").Response>;
}
export { CersTVClient };
