import axios from 'axios';

export default class UserTypeService {

    getAllUserTypes() {
        return axios.get("http://localhost:8000/usertypes?action=getAll")
            .then(response => response.data)
            .catch(error => console.log(error));
    }
}