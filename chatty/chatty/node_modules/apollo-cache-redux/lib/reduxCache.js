"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
var reduxNormalizedCache_1 = require("./reduxNormalizedCache");
var lodash_1 = require("lodash");
var ReduxCache = (function (_super) {
    __extends(ReduxCache, _super);
    function ReduxCache(config) {
        var _this = _super.call(this, config) || this;
        _this.data = reduxNormalizedCache_1.reduxNormalizedCacheFactory(config);
        return _this;
    }
    ReduxCache.prototype.write = function (write) {
        var data = this.config.storeFactory(lodash_1.cloneDeep(this.data.toObject()));
        apollo_cache_inmemory_1.writeResultToStore({
            dataId: write.dataId,
            result: write.result,
            variables: write.variables,
            document: this.transformDocument(write.query),
            store: data,
            dataIdFromObject: this.config.dataIdFromObject,
            fragmentMatcherFunction: this.config.fragmentMatcher.match,
        });
        this.data.replace(data.toObject());
        this.broadcastWatches();
    };
    return ReduxCache;
}(apollo_cache_inmemory_1.InMemoryCache));
exports.ReduxCache = ReduxCache;
//# sourceMappingURL=reduxCache.js.map