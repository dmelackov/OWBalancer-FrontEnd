<template>
        <div :class="{workspace: true, selected: (status.UserInfo.Workspace != null && workspace.ID == status.UserInfo.Workspace.ID)}" @click="select">
            <p class="workspaceName">{{ workspace.Name }}</p>
        </div>
</template>

<script>
import axios from 'axios'
export default {
    props: ["workspace"],
    methods: {
        async select(){
            await axios.post("/api/profile/workspace/setWorkspace", {"ID": this.workspace.ID})
            this.status.UserInfo = (await axios.get("/api/profile/getCurrentUserInfo")).data
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