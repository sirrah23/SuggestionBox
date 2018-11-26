const axios = require("axios");

class SuggestionBoxAPI {
  constructor(url) {
    this.url = url;
  }

  createBox(name) {
    return axios.post(`${this.url}/suggestionbox`, { name: name });
  }
}

export default SuggestionBoxAPI;
