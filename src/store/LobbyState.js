import { reactive, toRefs } from "vue";
import api from "@/api"

const state = reactive({
    customs: []
})


export default function useLobbyState() {
    const updateLobbyState = async () => {
        state.loading = true;

        let updatedCustoms = await api.lobby_api.getLobby()
        for (let i = 0; i < updatedCustoms.length; i++) {
            const element = updatedCustoms[i];
            let prevCustom = state.customs.find((el) => el.ID == element.ID)
            if (prevCustom) {
                element.checkmark = prevCustom.checkmark
            } else {
                element.checkmark = false;
            }
        }
        state.customs = updatedCustoms
        state.loading = false;
    }

    const deleteFromLobby = async (customID) => {
        state.customs.splice(state.customs.findIndex((el) => el.ID == customID), 1)
        await api.lobby_api.deleteFromLobby(customID)
        await updateLobbyState()
    }

    const clearLobby = async () => {
        state.customs = []
        await api.lobby_api.clearLobby()
        await updateLobbyState()
    }

    return {
        ...toRefs(state), // convert to refs when returning
        updateLobbyState,
        deleteFromLobby,
        clearLobby
    }
}