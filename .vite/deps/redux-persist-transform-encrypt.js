import {
  require_aes,
  require_core
} from "./chunk-AGA7SJGG.js";
import {
  createTransform
} from "./chunk-2JZTLBT6.js";
import "./chunk-65JG2JFT.js";
import {
  __commonJS,
  __toESM
} from "./chunk-WGAPYIUP.js";

// node_modules/json-stringify-safe/stringify.js
var require_stringify = __commonJS({
  "node_modules/json-stringify-safe/stringify.js"(exports, module) {
    exports = module.exports = stringify2;
    exports.getSerialize = serializer;
    function stringify2(obj, replacer, spaces, cycleReplacer) {
      return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces);
    }
    function serializer(replacer, cycleReplacer) {
      var stack = [], keys = [];
      if (cycleReplacer == null)
        cycleReplacer = function(key, value) {
          if (stack[0] === value)
            return "[Circular ~]";
          return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]";
        };
      return function(key, value) {
        if (stack.length > 0) {
          var thisPos = stack.indexOf(this);
          ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
          ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
          if (~stack.indexOf(value))
            value = cycleReplacer.call(this, key, value);
        } else
          stack.push(value);
        return replacer == null ? value : replacer.call(this, key, value);
      };
    }
  }
});

// node_modules/redux-persist-transform-encrypt/lib/sync.js
var import_aes = __toESM(require_aes(), 1);
var import_core = __toESM(require_core(), 1);
var import_json_stringify_safe = __toESM(require_stringify(), 1);
var makeError = (message) => new Error(`redux-persist-transform-encrypt: ${message}`);
var encryptTransform = (config, transformConfig) => {
  if (typeof config === "undefined") {
    throw makeError("No configuration provided.");
  }
  const { secretKey } = config;
  if (!secretKey) {
    throw makeError("No secret key provided.");
  }
  const onError = typeof config.onError === "function" ? config.onError : console.warn;
  return createTransform((inboundState, _key) => import_aes.default.encrypt((0, import_json_stringify_safe.default)(inboundState), secretKey).toString(), (outboundState, _key) => {
    if (typeof outboundState !== "string") {
      return onError(makeError("Expected outbound state to be a string."));
    }
    try {
      const decryptedString = import_aes.default.decrypt(outboundState, secretKey).toString(import_core.default.enc.Utf8);
      if (!decryptedString) {
        throw new Error("Decrypted string is empty.");
      }
      try {
        return JSON.parse(decryptedString);
      } catch {
        return onError(makeError("Failed to parse state as JSON."));
      }
    } catch {
      return onError(makeError("Could not decrypt state. Please verify that you are using the correct secret key."));
    }
  }, transformConfig);
};
export {
  encryptTransform
};
//# sourceMappingURL=redux-persist-transform-encrypt.js.map
