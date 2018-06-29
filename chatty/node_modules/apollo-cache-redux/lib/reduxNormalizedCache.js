"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var ReduxNormalizedCache = (function () {
    function ReduxNormalizedCache(reduxCacheConfig) {
        this.reduxRootSelector = reduxCacheConfig.reduxRootSelector || 'apollo';
        this.store = reduxCacheConfig.store;
    }
    ReduxNormalizedCache.prototype.toObject = function () {
        return this.getReducer();
    };
    ReduxNormalizedCache.prototype.get = function (dataId) {
        return this.getReducer()[dataId];
    };
    ReduxNormalizedCache.prototype.set = function (dataId, value) {
        this.store.dispatch({
            type: constants_1.APOLLO_WRITE,
            data: (_a = {}, _a[dataId] = value, _a)
        });
        var _a;
    };
    ReduxNormalizedCache.prototype.delete = function (dataId) {
        this.store.dispatch({
            type: constants_1.APOLLO_WRITE,
            data: (_a = {}, _a[dataId] = undefined, _a)
        });
        var _a;
    };
    ReduxNormalizedCache.prototype.clear = function () {
        this.store.dispatch({
            type: constants_1.APOLLO_RESET,
        });
    };
    ReduxNormalizedCache.prototype.replace = function (newData) {
        var data = newData || {};
        this.store.dispatch({
            type: constants_1.APOLLO_OVERWRITE,
            data: data
        });
    };
    ReduxNormalizedCache.prototype.getReducer = function () {
        return this.store.getState()[this.reduxRootSelector];
    };
    return ReduxNormalizedCache;
}());
exports.ReduxNormalizedCache = ReduxNormalizedCache;
function reduxNormalizedCacheFactory(reduxCacheConfig) {
    return new ReduxNormalizedCache(reduxCacheConfig);
}
exports.reduxNormalizedCacheFactory = reduxNormalizedCacheFactory;
//# sourceMappingURL=reduxNormalizedCache.js.map