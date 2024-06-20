"use strict";
(() => {
  // src/version.ts
  var VERSION = "0.1.0";

  // src/page/home.ts
  var HomePage = class {
    constructor() {
    }
    setup() {
    }
    exec() {
    }
  };

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

  // src/engine/routeDispatcher.ts
  var RouteDispatcher = class {
    constructor() {
    }
    matchRoute(path) {
      for (const route in this.routes) {
        if (route.endsWith("*")) {
          const baseRoute = route.slice(0, -1);
          if (path.startsWith(baseRoute)) {
            return this.routes[route];
          }
        } else if (route === path) {
          return this.routes[route];
        }
      }
      return null;
    }
    setupRoute() {
      new Site().setup();
      const path = window.location.pathname;
      const HandlerClass = this.matchRoute(path);
      if (HandlerClass) {
        const handlerInstance = new HandlerClass();
        handlerInstance.setup();
      } else {
      }
    }
    execRoute() {
      new Site().exec();
      const path = window.location.pathname;
      const HandlerClass = this.matchRoute(path);
      if (HandlerClass) {
        const handlerInstance = new HandlerClass();
        handlerInstance.exec();
      } else {
      }
    }
  };

  // src/page/redir.ts
  var RedirPage = class {
    constructor() {
    }
    setup() {
      window.sa5 = window.sa5 || [];
      window.sa5.push([
        "userInfoChanged",
        (user) => {
          if (user.user_data_loaded.custom_fields) {
            location.href = `/account/${user.data["userid"]}`;
            return;
          }
        }
      ]);
    }
    exec() {
    }
  };

  // src/routes.ts
  var routeDispatcher = () => {
    var routeDispatcher2 = new RouteDispatcher();
    routeDispatcher2.routes = {
      "/": HomePage,
      "/redir": RedirPage
    };
    return routeDispatcher2;
  };

  // src/index.ts
  var SITE_NAME = "Site";
  var setup = () => {
    console.log(`${SITE_NAME} package init v${VERSION}`);
    routeDispatcher().setupRoute();
  };
  var exec = () => {
    routeDispatcher().execRoute();
  };
  setup();
  if (document.readyState !== "loading") {
    exec();
  } else {
    document.addEventListener("DOMContentLoaded", exec);
  }
})();
//# sourceMappingURL=index.js.map
