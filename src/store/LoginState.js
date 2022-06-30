import { reactive, toRefs } from "vue";
import axios from "axios";


const state = reactive({
    UserInfo: {},
    perms: [],
    Settings: {}
})


export default function useLoginState() {
    const updateLoginState = async () => {
        state.loading = true;
        state.perms = (await axios.get("/api/profile/getPermissions")).data
        state.UserInfo = (await axios.get("/api/profile/getCurrentUserInfo")).data
        if(state.UserInfo.Auth) state.Settings = (await axios.get("/api/profile/settings/getSettings")).data
        state.loading = false;
    }

    return {
        ...toRefs(state), // convert to refs when returning
        updateLoginState
    }
}