import config from './config';

export default class APICalls {

    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;
  
        const options = {
          method,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        };

        if (body !== null) {
          options.body = JSON.stringify(body);
        }

        if (requiresAuth){
          const encodedCredentials = btoa(`${credentials.name}:${credentials.password}`)
          options.headers['Authorization'] = `Basic ${encodedCredentials} `

        }

      return fetch(url, options);
  }

    
    async getUser(name, password) {
        const response = await this.api(`/users`, 'GET', null, true, { name, password });

        if (response.status === 200) {
          return response.json().then(data => data);
        }
        else if (response.status === 401) {
          return null;
        }
        else {
          throw new Error();
        }
    }
    
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        console.log("Response from API: " + response.status)
        if (response.status === 201) {
          return [];
        }
        else if (response.status === 400) {
          return response.json().then(data => {
            return data.errors;
        });
        }
        else {
          throw new Error();
        }
    }
}