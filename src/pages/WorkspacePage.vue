<template>
    <div class="content">
        <WorkspaceList class="workspaceList"/>
        <WorkspaceInfo class="workspaceInfo"/>
    </div>
</template>

<script>

import WorkspaceList from '@/components/Workspace/WorkspaceList.vue';
import WorkspaceInfo from '@/components/Workspace/WorkspaceInfo.vue';

export default {
    components: {
        WorkspaceList,
        WorkspaceInfo
    },
    data(){
        return {
            SelectedWorkspace: null
        }
    }
};
</script>

<style lang="scss" scoped>

.content {
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 10px 8px;
    .workspaceList {
        width: 20vw;
        height: 100%;
        box-sizing: border-box;
    }
    .workspaceInfo {
        height: 50%;
        flex: 1;
        margin-left: 8px;
    }
}
</style>