import axios from 'axios';

const instance=axios.create({
    baseURL:'https://burger-builder-a98ca.firebaseio.com/'
});

export default instance;