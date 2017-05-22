var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

require(["app"], function(App) {
  var Main;
  Main = (function() {
    function Main() {
      this.inputCommand = bind(this.inputCommand, this);
      this.onClickShare = bind(this.onClickShare, this);
      this.installApp = bind(this.installApp, this);
      this.toggleApp = bind(this.toggleApp, this);
      App.on("ready.app", function() {
        return $("#__backtick__ #console input").attr("placeholder", "Find a command (try fontBomb)");
      });
      $(document).on("click", "button.try", this.toggleApp).on("click", "button.install", this.installApp).on("click", ".share-links a", this.onClickShare);
    }

    Main.prototype.toggleApp = function() {
      _gaq.push(['_trackEvent', 'Click', 'Toggle App']);
      return App.trigger("toggle.app");
    };

    Main.prototype.installApp = function() {
      _gaq.push(['_trackEvent', 'Click', 'Install App']);
      return window.open("https://chrome.google.com/webstore/detail/backtick/daiejhinmmfgincamkeeobmpffhdljim", "_blank");
    };

    Main.prototype.onClickShare = function(e) {
      var command;
      e.preventDefault();
      command = $(e.target).data("command");
      if (App.open) {
        return this.inputCommand(command);
      } else {
        App.trigger("toggle.app");
        return setTimeout(this.inputCommand.bind(this, command), 250);
      }
    };

    Main.prototype.inputCommand = function(command) {
      return App.$console.find("input").val(command).keydown();
    };

    return Main;

  })();
  return new Main;
});

//# sourceMappingURL=main.js.map
