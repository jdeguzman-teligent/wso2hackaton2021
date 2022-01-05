
import {getSessionParameter, resetAuthenticatedSession} from "./session";
import {CONFIG} from "../../config";

/**
 * Logs out from the session.
 */
export const dispatchLogout = (payload) => {
    const token = getSessionParameter("ID_TOKEN");
    // Clear the session storage
    resetAuthenticatedSession();
    const uri = `${CONFIG.LOGOUT_URL}?id_token_hint=${payload}&post_logout_redirect_uri=${CONFIG.REDIRECT_URI}`;
    
    window.location.href = uri;
};


// https://server2-is:9443/oidc/logout?id_token_hint=&post_logout_redirect_uri=http://10.100.30.62:30010

