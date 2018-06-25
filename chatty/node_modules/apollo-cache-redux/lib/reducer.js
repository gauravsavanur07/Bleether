"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var constants_1 = require("./constants");
var initialState = {};
function apolloReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case constants_1.APOLLO_RESET:
            return initialState;
        case constants_1.APOLLO_OVERWRITE:
            return action.data;
        case constants_1.APOLLO_WRITE:
            var newObj = lodash_1.cloneDeep(state);
            return lodash_1.merge(newObj, action.data);
        default:
            return state;
    }
}
exports.apolloReducer = apolloReducer;
//# sourceMappingURL=reducer.js.map