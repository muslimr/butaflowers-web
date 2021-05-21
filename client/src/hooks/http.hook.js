import {useState, useCallback} from 'react';


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


export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method= 'GET', params) => {
        setLoading(true);
        try {
            // if (body) {
            //     body = JSON.stringify(body);
            //     headers['Content-Type'] = 'application/json';
            // }
            const response = await fetch(
                `${url}?${serialize(params)}`,
                {
                    method,
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {Accept: "application/json"},
                    redirect: "follow",
                    referrerPolicy: "no-referrer",
                    body: method !== "GET" ? JSON.stringify(params) : null,
                });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так');
            }

            setLoading(false);
            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);



    const clearError = useCallback(() => setError(null),[]);

    return {loading, request, error, clearError}
}
