import crypto from "crypto";

export const generateJWT = (payload, secret, expiresIn) => {

    let header = {
        alg: "HS256",
        typ: "JWT"
    }

    if (expiresIn) {
        const encoadedHeader = Buffer.from(JSON.stringify(header)).toString("base64url");

        const expireTime = parseInt(expiresIn, 10);
        payload.exp = Math.floor(Date.now() / 1000) + expireTime

        const encoadedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");

        let tokens = `${encoadedHeader}.${encoadedPayload}`;
        let signature = crypto.createHmac("sha256", secret).update(tokens).digest("base64url");

        return `${tokens}.${signature}`;
    } else {
        console.error("Missing Expiresin")
    }
}

export const verifyJWT = (token, secret) => {

    let [encodedHeader, encodedPayload, oldSignatur] = token.split(".");

    let tokens = `${encodedHeader}.${encodedPayload}`;

    let newSignature = crypto.createHmac('sha256', secret).update(tokens).digest("base64url");

    if (newSignature === oldSignatur) {

        let decodedPayload = Buffer.from(encodedPayload, "base64url").toString("utf-8");
        let payload;

        try {
            payload = JSON.parse(decodedPayload);
        } catch (error) {
            return false;
        }

        if (payload.exp) {
            let currentTimeStamp = Math.floor(Date.now() / 1000);

            if (payload.exp > currentTimeStamp) {
                return payload;
            } else {
                return false;
            }
        } else {
            return false;
        }


    } else {
        return false;
    }
}