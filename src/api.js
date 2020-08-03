const basicAuth = 'Basic ' + btoa('ahmed:@Ahmed20');
const headers = new Headers({
    'Authorization' : basicAuth,
    'Content-type': 'application/json',
    Accept: 'application/json',
});

class Api {
    config = {
        baseUrl: '',
    };

    setConfig = config => {
        this.config = config;
    };

    getDashboards= () => {
        return fetch(`${this.config.baseUrl}/indicators.json?paging=false&fields=*`, {
            method: 'GET',
            credentials: 'include',
            headers,
        })
            .catch(error => error)
            .then(response => response.json());
    };
}

   
export default new Api();
