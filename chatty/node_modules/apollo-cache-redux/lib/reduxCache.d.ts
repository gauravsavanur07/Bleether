import { Cache } from 'apollo-cache';
import { ApolloReducerConfig, InMemoryCache } from 'apollo-cache-inmemory';
import { ReduxNormalizedCacheConfig } from './reduxNormalizedCache';
export declare type ReduxCacheConfig = ApolloReducerConfig & ReduxNormalizedCacheConfig;
export declare class ReduxCache extends InMemoryCache {
    constructor(config: ReduxCacheConfig);
    write(write: Cache.WriteOptions): void;
}
