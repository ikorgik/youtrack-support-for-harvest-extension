(function() {
  (function() {

    /*
      To toggle which environment is used, edit local storage for the extension
      and set the "environment" key.
    
      To open Dev Tools for the extension, go to chrome://extensions (enable
      developer mode if not already enabled) and you'll see a link to launch dev
      tools.
     */
    var badge, environment, environments, lastCharacter;
    environments = {
      production: {
        subdomain: "platform",
        protocol: "https",
        domain: ".harvestapp.com"
      },
      development: {
        subdomain: "platform",
        protocol: "http",
        domain: ".harvestapp.dev"
      }
    };
    if (!(environment = localStorage.getItem("environment"))) {
      environment = "production";
      localStorage.setItem("environment", environment);
    }
    this.config = environments[environment] || {
      subdomain: environment,
      protocol: "https",
      domain: ".harvestapp.com"
    };
    this.config.url = "" + this.config.protocol + "://" + this.config.subdomain + this.config.domain;
    this.config.environment = environment;
    chrome.runtime.onMessage.addListener(function(message, sender, respond) {
      if (message === "retrieveConfig") {
        return respond(this.config);
      }
    });
    badge = "";
    if (this.config.environment !== "production") {
      lastCharacter = this.config.environment.substr(-1);
      if (this.config.environment.length <= 3) {
        badge = this.config.environment;
      } else if (("" + (parseInt(lastCharacter))) === lastCharacter) {
        badge = this.config.environment.substr(0, 2) + lastCharacter;
      } else {
        badge = this.config.environment.substr(0, 3);
      }
    }
    return chrome.browserAction.setBadgeText({
      text: badge
    });
  })();

}).call(this);
