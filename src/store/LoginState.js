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
        state.UserInfo = await api.profile_api.getCurrentUserInfo()
        if (state.UserInfo.auth) state.Settings = await api.profile_api.settings_api.getSettings()
        if (state.UserInfo.auth && state.UserInfo.profile.workspace) state.perms = await api.profile_api.getPermissions()
        state.loading = false;
    }

    return {
        ...toRefs(state), // convert to refs when returning
        updateLoginState
    }
}