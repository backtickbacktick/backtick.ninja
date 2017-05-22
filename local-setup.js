require(["jquery", "app", "hotkey"], function($, App) {
  var LocalSetup;
  LocalSetup = (function() {
    function LocalSetup() {
      this.loadCommands();
      App.on("execute.commands", this.executeCommand.bind(this));
    }

    LocalSetup.prototype.loadCommands = function() {
      return $.getJSON("https://backtickio.s3.amazonaws.com/commands.json?t=" + (Date.now())).success((function(_this) {
        return function(response) {
          return App.trigger("load.commands", response);
        };
      })(this)).error(console.log.bind(console, "Error fetching commands"));
    };

    LocalSetup.prototype.executeCommand = function(command) {
      return $.getScript(command.src).success(App.trigger.bind(App, "executed.commands", command)).error(App.trigger.bind(App, "executionError.commands", command));
    };

    return LocalSetup;

  })();
  return new LocalSetup;
});

//# sourceMappingURL=local-setup.js.map
