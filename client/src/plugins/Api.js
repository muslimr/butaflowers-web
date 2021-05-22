
const serialize = (obj, prefix) => {
    let str = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let keyName = prefix ? `${prefix}[${key}]` : key;
            let value = obj[key];
            str.push(
                typeof value === "object"
                    ? serialize(value, keyName)
                    : `${encodeURIComponent(keyName)}=${encodeURIComponent(value)}`
            );
        }
    }
    return str.join("&");
};


export class Api {

    static async request(url, method = "GET", params) {
        return await fetch(
            method === "POST" ? `${url}?${serialize(params)}` : `${url}?${serialize(params)}`,
            {
                method,
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {Accept: "application/json"},
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: method !== "GET" ? JSON.stringify(params) : null,
            }
        )
            .then(async (res) => {
                let response = await res.json();
                if (response.status === 'error') {
                    //   Auth.logOut();
                    return;
                }
                return response;
            })
            .catch((err) => {
                // throw new Error(err);
            });
    }

    static async get(url, params) {
        return await this.request(url, "GET", params);
    }

    static async post(url, params) {
        return await this.request(url, "POST", params);
    }

    static async put(url, params) {
        return await this.request(url, "PUT", params);
    }

    static async del(url, params) {
        return await this.request(url, "DELETE", params);
    }
}

