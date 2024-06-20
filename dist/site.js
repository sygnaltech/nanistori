"use strict";
(() => {
  // src/engine/core.ts
  function loadScriptHead(url, async = false) {
    const script = document.createElement("script");
    script.src = url;
    script.async = async;
    document.head.appendChild(script);
  }
  function loadCSS(url) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
  }
  function loadEngineCSS(cssFileName) {
    const currentScript = document.currentScript;
    if (currentScript) {
      const scriptURL = new URL(currentScript.src);
      const origin = scriptURL.origin;
      const path = scriptURL.pathname.substring(0, scriptURL.pathname.lastIndexOf("/"));
      const cssURL = `${origin}${path}/css/${cssFileName}`;
      loadCSS(cssURL);
    } else {
      console.error("Unable to determine the currently executing script.");
    }
  }

  // src/site.ts
  var Site = class {
    constructor() {
    }
    setup() {
      console.log("site setup");
      loadEngineCSS("site.css");
      loadCSS("https://cdn.jsdelivr.net/gh/sygnaltech/webflow-util@5.3.4/dist/css/webflow-membership.css");
      loadScriptHead(
        "https://cdn.jsdelivr.net/gh/sygnaltech/webflow-util@5.4.0/dist/nocode/webflow-membership.js",
        true
      );
      window.sa5 = window.sa5 || [];
      window.sa5.push([
        "getMembershipConfig",
        (config) => {
          return config;
        }
      ]);
      window.sa5 = window.sa5 || [];
      window.sa5.push([
        "getMembershipRoutingConfig",
        (config) => {
          config.routeAfterLogin = "/redir";
          return config;
        }
      ]);
    }
    exec() {
    }
  };
})();
//# sourceMappingURL=site.js.map
