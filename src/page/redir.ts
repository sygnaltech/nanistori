
/*
 * Page | Redir
 */

import { IRouteHandler } from "../engine/routeDispatcher";
 

export class RedirPage implements IRouteHandler {

  constructor() {
  }

  setup() {
       
        // Routing Config
        window.sa5 = window.sa5 || [];
        window.sa5.push(['userInfoChanged', 
          (user) => {
            if(user.user_data_loaded.custom_fields) {
              
              location.href= `/account/${user.data["userid"]}`; 

              return;
            }
          }]); 

  }

  exec() {


    
  }

}
