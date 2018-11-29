const axios = require("axios");

class SuggestionBoxAPI {
  constructor(url) {
    this.url = url;
  }

  createBox(name) {
    return axios.post(`${this.url}/suggestionbox`, { name: name });
  }

  getBox(hash) {
    return axios.get(`${this.url}/suggestionbox/${hash}`);
  }

  postSuggestion(hash, suggestion) {
    return axios.post(`${this.url}/suggestionbox/${hash}`, {
      body: suggestion
    });
  }
}

export default SuggestionBoxAPI;
