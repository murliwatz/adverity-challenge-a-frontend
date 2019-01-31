import axios from 'axios';

export default class TrendsApiService {

    host = "http://localhost";
    port = "5000";

    getInterestOverTime = (keywords) => {
        const urlTemplate = `${this.host}:${this.port}/trends/iot?keywords=${keywords}`;
        return axios.get(urlTemplate);
    }

}