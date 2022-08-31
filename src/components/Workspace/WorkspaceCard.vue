<template>
        <div :class="{workspace: true, selected: (UserInfo.Workspace != null && workspace.ID == UserInfo.Workspace.ID)}" @click="select">
            <p class="workspaceName">{{ workspace.Name }}</p>
        </div>
</template>

<script>
import api from "/src/api"
import useLoginState from "/src/store/LoginState"
export default {
    setup() {
        const {UserInfo, Settings, updateLoginState} = useLoginState()
        return {
            UserInfo,
            Settings,
            updateLoginState
        }
    },
    props: ["workspace"],
    methods: {
        async select(){
            await api.profile_api.workspace_api.setWorkspace(this.workspace.ID)
            await this.updateLoginState()
        }
    }
}
</script>

<style lang="scss" scoped>
@import "/src/assets/css/var.scss";
.workspace {
    background-color: $back3;
    border-radius: 6px;
    box-shadow: 0 1px 0 #3a4b68a8;
    box-sizing: border-box;
    width: 100%;
    height: 45px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    &:hover {
        cursor: pointer;
        background-color: #242e3b;
    }
    &.selected {
        background-color: #242e3b;
    }
}

</style>