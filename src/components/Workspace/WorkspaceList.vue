<template>
    <div class="workspaceListComponent">
        <p class="title">My Workspaces</p>
        <hr />
        <div class="workspaceList">
            <Scrollbar class="scroll">
                <div class="listContainer">
                    <template v-for="workspace in Workspaces" :key="workspace.ID">
                        <WorkspaceCard :workspace="workspace"></WorkspaceCard>
                    </template>
                </div>
            </Scrollbar>
        </div>
    </div>
</template>

<script>
import api from "/src/api";
import Scrollbar from "vue3-smooth-scrollbar";
import WorkspaceCard from "./WorkspaceCard.vue";

export default {
    components: {
        Scrollbar,
        WorkspaceCard,
    },
    data() {
        return {
            Workspaces: [],
        };
    },
    methods: {
        async getWorkspaceList() {
            this.Workspaces = await api.profile_api.workspace_api.getWorkspaces();
        },
    },
    created() {
        this.getWorkspaceList();
    },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/css/var.scss";
.workspaceListComponent {
    background-color: $back2;
    border-radius: 6px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .workspaceList {
        width: 100%;
        height: 100%;
        .scroll {
            height: 100%;
            .listContainer {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
        }
    }
}
</style>
