(function() {
  "use strict";
  var tags = /%([\w$]+(?:\.[\w$]+)*)%/,
    getDeepProperty = function(ident, obj) {
      var ret = null,
        list,
        recurse = function(propList, obj) {
          var curident;
          if (propList.length > 1) {
            if (obj.hasOwnProperty(propList[0])) {
              recurse(propList, obj[list.shift()]);
            } else {
              curident = propList.reduce(function(a, b, i) {
                return a + (i > 0 ? "." : "") + b;
              });
              throw new Error("Invalid property, no such child \"" + curident + "\" (IDENT: " + ident + ") from data " + JSON.stringify(obj));
            }
          } else {
            if (obj.hasOwnProperty(propList[0])) {
              ret = obj[propList[0]];
            } else {
              throw new Error("Invalid property, missing expected data \"" + propList[0] + "\" (IDENT: " + ident + ") from data " + JSON.stringify(obj));
            }
          }
        };

      if (!ident.push && !ident.map) {
        list = ident.split(".").map(function(e) {
          return e.trim();
        });
      } else {
        list = ident;
      }

      recurse(list, obj);
      return ret;
    },
    render = function render(template, data, options) {
      var output = "",
        index = 0,
        capture,
        chunk = template,
        match = function matchTags() {
          return ((capture = tags.exec(chunk)) !== null);
        };

      if (!options) {
        options = {};
      }

      while (index < template.length) {
        chunk = template.substr(index);
        if (match()) {
          if (capture.index > 0) {
            output += chunk.substr(0, capture.index);
            index += capture.index;
          }
          output += getDeepProperty(capture[1], data);
          index += capture[0].length;
        } else {
          output += chunk;
          index += chunk.length;
        }
      }

      return output;
    };

  if (typeof module !== "undefined") {
    module.exports = render;
  } else {
    window.lineup = render;
  }
}());
