/*
 * SITE
 * Main entry point
 * 
 * https://engine.sygnal.com/
 * 
 * ENGINE MODE
 * ?engine.mode=dev
 * ?engine.mode=prod
 * 
 */

import { HomePage } from "./page/home";
import { RouteDispatcher } from "./engine/routeDispatcher";
import { RedirPage } from "./page/redir";

export const routeDispatcher = (): RouteDispatcher => {
    
    var routeDispatcher = new RouteDispatcher();
    routeDispatcher.routes = {

        // Site paes
        '/': HomePage,
        
        '/redir': RedirPage, 
        // TEST Pages

    };

    return routeDispatcher;
}

