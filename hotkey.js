var Hotkey;

Hotkey = (function() {
  Hotkey.prototype.defaultChars = ["`"];

  function Hotkey() {
    var ref;
    this.hotkey = this.defaultChars[0];
    if ((ref = chrome.storage) != null) {
      ref.sync.get("hotkey", (function(_this) {
        return function(storage) {
          if (storage.hotkey) {
            return _this.hotkey = storage.hotkey;
          }
        };
      })(this));
    }
    document.addEventListener("keypress", this.onKeyPress.bind(this), true);
  }

  Hotkey.prototype.onKeyPress = function(e) {
    if (this.hotkey !== String.fromCharCode(e.which)) {
      return;
    }
    if (this.isInput(document.activeElement) && !window._BACKTICK_OPEN) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    return this.toggleApp();
  };

  Hotkey.prototype.toggleApp = function() {
    if (typeof chrome !== "undefined" && chrome !== null ? chrome.runtime : void 0) {
      return chrome.runtime.sendMessage({
        event: "toggle.app",
        data: {
          loaded: window._BACKTICK_LOADED,
          action: 'Hotkey',
          hotkey: this.hotkey
        }
      });
    } else {
      return require(["app"], function(App) {
        return App.trigger("toggle.app");
      });
    }
  };

  Hotkey.prototype.isInput = function(element) {
    if (element.isContentEditable) {
      return true;
    }
    return ["input", "textarea", "select"].indexOf(element.nodeName.toLowerCase()) > -1;
  };

  return Hotkey;

})();

new Hotkey;

//# sourceMappingURL=hotkey.js.map
