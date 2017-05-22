require ["app"], (App) ->
  class Main
    constructor: ->
      App.on "ready.app", ->
        $("#__backtick__ #console input").attr("placeholder", "Find a command (try fontBomb)");

      $(document)
        .on("click", "button.try", @toggleApp)
        .on("click", "button.install", @installApp)
        .on("click", ".share-links a", @onClickShare)

    toggleApp: =>
      _gaq.push(['_trackEvent', 'Click', 'Toggle App']);
      App.trigger "toggle.app"

    installApp: =>
      _gaq.push(['_trackEvent', 'Click', 'Install App']);
      window.open("https://chrome.google.com/webstore/detail/backtick/daiejhinmmfgincamkeeobmpffhdljim", "_blank");

    onClickShare: (e) =>
      e.preventDefault()
      command = $(e.target).data "command"

      if App.open
        @inputCommand command
      else
        App.trigger "toggle.app"
        setTimeout @inputCommand.bind(this, command), 250

    inputCommand: (command) =>
      App.$console.find("input").val(command).keydown()

  new Main