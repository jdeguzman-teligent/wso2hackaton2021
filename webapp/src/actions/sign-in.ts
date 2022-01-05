
import axios from "axios";
import {decodeIdToken, initAuthenticatedSession} from "./session";
import {CONFIG} from "../../config";

/**
 * Sends an authorization request.
 */
export const sendAuthorizationRequest = () => {
    let authorizeRequest = `${ CONFIG.AUTHORIZE_ENDPOINT }?response_type=${ CONFIG.RESPONSE_TYPE }&scope=${ CONFIG.SCOPE }&redirect_uri=${ CONFIG.REDIRECT_URI }&client_id=${ CONFIG.CLIENT_ID }`;
        
    window.location.href = authorizeRequest;
};

/**
 * Sends a token request.
 *
 * @param code Authorization code
 * @return {Promise<AxiosResponse<T> | never>}
 */
export const sendTokenRequest = (code) => {
    const body = [];
    // body.push(`client_id=${ CONFIG.CLIENT_ID }`);
    // body.push(`client_secret=${ CONFIG.CLIENT_SECRET }`);
    // body.push(`code=${ code }`);
    // body.push(`grant_type=${ CONFIG.GRANT_TYPE }`);
    // body.push(`redirect_uri=${ CONFIG.REDIRECT_URI }`);

    body.push(`username=${CONFIG.WSO2_USER}`);
    body.push(`password=${CONFIG.WSO2_PW}`);
    body.push(`grant_type=${CONFIG.GRANT_TYPE}`);
    body.push(`scope=${CONFIG.SCOPE}`);
    body.push(`code=${ code }`);



    const _header = getTokenRequestHeaders();
    console.log(_header);
    

    return axios.post(`${ CONFIG.TOKEN_ENDPOINT }`, body.join("&"), _header)
        .then(response => {
            if (response.status !== 200) {
                return Promise.reject(new Error("Invalid status code received in the token response: "
                    + response.status));
            }

            // Store the response in the session storage
            initAuthenticatedSession(response.data);

            return [response.data, decodeIdToken(response.data.id_token)];

        }).catch((error) => {
            return Promise.reject(error);
        });
};

/**
 * Helper to set request headers.
 *
 * @return {{headers: {Accept: string, "Access-Control-Allow-Origin": string, "Content-Type": string}}}
 */
const getTokenRequestHeaders = () => {
    return {
        headers: {
            // "Accept": "application/json",
            // "Access-Control-Allow-Origin": `${ CONFIG.CLIENT_URL }`,
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${CONFIG.BASIC_AUTH}`,
        }
    };

    // headers: {
    //     "Accept": "application/json",
    //     "Access-Control-Allow-Origin": `${ CONFIG.CLIENT_URL }`,
    //     "Content-Type": "application/x-www-form-urlencoded"
    // }
};
