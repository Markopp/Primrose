(function () {
  "use strict";

  if (window.THREE) {
    pliny.method({
      parent: "THREE.Quaternion",
      name: "toString ",
      description: "A polyfill method for printing objects.",
      parameters: [{
        name: "digits",
        type: "Number",
        description: "the number of significant figures to print."
      }]
    });
    THREE.Quaternion.prototype.toString = function (digits) {
      var parts = this.toArray();
      if (digits !== undefined) {
        parts = parts.map((v) => v.toFixed(digits));
      }
      return "{" + parts.join(", ") + "}";
    };
  }
})();