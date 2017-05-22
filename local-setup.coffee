require [
  "jquery"
  "app"
  "hotkey"
], (
  $
  App
) ->
  class LocalSetup
    constructor: ->

      @loadCommands()
      App.on "execute.commands", @executeCommand.bind(this)

    loadCommands: ->
      $.getJSON("https://backtickio.s3.amazonaws.com/commands.json?t=#{Date.now()}")
        .success((response) => App.trigger "load.commands", response)
        .error(console.log.bind(console, "Error fetching commands"))

    executeCommand: (command) ->
       $.getScript(command.src)
        .success(App.trigger.bind(App, "executed.commands", command))
        .error(App.trigger.bind(App, "executionError.commands", command))

  new LocalSetup