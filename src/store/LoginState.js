import { reactive, toRefs } from "vue";
import api from "@/api"

const state = reactive({
    UserInfo: {},
    perms: [],
    Settings: {}
})


export default function useLoginState() {
    const updateLoginState = async () => {
        state.loading = true;
        state.perms = await api.profile_api.getPermissions()
        state.UserInfo = await api.profile_api.getCurrentUserInfo()
        if (state.UserInfo.Auth) state.Settings = await api.profile_api.settings_api.getSettings()
        state.loading = false;
    }

    return {
        ...toRefs(state), // convert to refs when returning
        updateLoginState
    }
}