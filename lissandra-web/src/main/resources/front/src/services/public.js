import TyAPI from '../utils/TyAPI'
import TyHistory from "../utils/TyHistory";

export default {

    currentUser : null,

    componentDidMount() {
        TyAPI.post('lissandra/public/find/user.json')
            .then(json => {
                this.setState({
                    userName: json.data.userName
                });
                this.currentUser = {
                    userId : json.data.userId,
                    userName : json.data.userName
                };

            });
    },
    loginUser({
            userId,
            userName,
        } = {}) {
        return TyAPI.post('lissandra/public/find/user', {
            userId: userId || '',
            userName: userName || '',
        })
    },

}