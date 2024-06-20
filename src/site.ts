
/*
 * Site
 */

import { IRouteHandler } from "./engine/routeDispatcher";
import { loadCSS, loadEngineCSS, loadScriptBlockHead, loadScriptHead } from "./engine/core";

// Define the type for the config object
interface MembershipRoutingConfig {
  routeAfterFirstLogin: string;
  routeAfterLogin: string;
}

// // Ensure the window.sa5 array exists and has the correct type
// declare global {
//   interface Window {
//     sa5: Array<[string, (config: MembershipRoutingConfig) => MembershipRoutingConfig]>;
//   }
// }
// // Initialize window.sa5 if it doesn't exist
// window.sa5 = window.sa5 || [];

export class Site implements IRouteHandler {

  constructor() {
  }

  setup() {

    console.log("site setup"); 

    // Site-wide CSS
    loadEngineCSS("site.css"); 

    /**
     * SA5 User Accounts
     */

    loadCSS("https://cdn.jsdelivr.net/gh/sygnaltech/webflow-util@5.3.4/dist/css/webflow-membership.css")
    loadScriptHead(
      "https://cdn.jsdelivr.net/gh/sygnaltech/webflow-util@5.4.0/dist/nocode/webflow-membership.js", 
      true
    ); 

    // Memberships Config 
    window.sa5 = window.sa5 || [];
    window.sa5.push(['getMembershipConfig', 
      (config) => {

        // Apply any configuration settings here
        // such as access groups 
        return config;
      }]);

    // Routing Config
    window.sa5 = window.sa5 || [];
    window.sa5.push(['getMembershipRoutingConfig', 
      (config) => {

//        config.routeAfterFirstLogin = '/u/new';
        config.routeAfterLogin = '/redir';
        return config;
      }]); 

  }

  exec() {

  }

}
