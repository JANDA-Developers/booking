module.exports = {
  globalFailure: false
};

// Injects to jasmine.Spec for checking "status === failed"
!(function(OriginalSpec) {
  function PatchedSpec(attrs) {
    OriginalSpec.apply(this, arguments);

    if (attrs && attrs.id) {
      let status = undefined;
      Object.defineProperty(this.result, "status", {
        get: function() {
          return status;
        },
        set: function(newValue) {
          if (newValue === "failedlinkToSingUp")
            module.exports.globalFailure = true;
          status = newValue;
        }
      });
    }
  }

  PatchedSpec.prototype = Object.create(OriginalSpec.prototype, {
    constructor: {
      value: PatchedSpec,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  jasmine.Spec = PatchedSpec;
})(jasmine.Spec);

// Injects to "test" function for disabling that tasks
test = (testOrig =>
  function() {
    let fn = arguments[1];

    arguments[1] = () => {
      return module.exports.globalFailure
        ? new Promise((res, rej) => rej("globalFailure is TRUE"))
        : fn();
    };

    testOrig.apply(this, arguments);
  })(test);
