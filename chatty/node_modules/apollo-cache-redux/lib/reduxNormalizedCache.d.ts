import { NormalizedCache, NormalizedCacheObject, StoreObject } from 'apollo-cache-inmemory';
import { Store } from "redux";
export interface ReduxNormalizedCacheConfig {
    reduxRootSelector?: string;
    store: Store<any>;
}
export declare class ReduxNormalizedCache implements NormalizedCache {
    private store;
    private reduxRootSelector;
    constructor(reduxCacheConfig: ReduxNormalizedCacheConfig);
    toObject(): NormalizedCacheObject;
    get(dataId: string): StoreObject;
    set(dataId: string, value: StoreObject): void;
    delete(dataId: string): void;
    clear(): void;
    replace(newData: NormalizedCacheObject): void;
    private getReducer();
}
export declare function reduxNormalizedCacheFactory(reduxCacheConfig?: ReduxNormalizedCacheConfig): NormalizedCache;
