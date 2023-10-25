<template>
    <div class="content">
        <WorkspaceList class="workspaceList" />
        <div class="vGroup">
            <WorkspaceInfo class="workspaceInfo" />
            <div class="hGroup">
                <MemberColumn class="memberColumn" />
                <InviteColumn class="inviteColumn" v-if="UserInfo.Role == 'Administrator'"/>
            </div>
        </div>
    </div>
</template>

<script>

import WorkspaceList from '@/components/Workspace/WorkspaceList.vue';
import WorkspaceInfo from '@/components/Workspace/WorkspaceInfo.vue';
import MemberColumn from '@/components/Workspace/MemberColumn.vue';
import InviteColumn from '@/components/Workspace/InviteColumn.vue';
import useLoginState from "@/store/LoginState";

export default {
    setup() {
        const { UserInfo, Settings, updateLoginState } = useLoginState();
        return {
            UserInfo,
            Settings
        };
    },
    components: {
        WorkspaceList,
        WorkspaceInfo,
        MemberColumn,
        InviteColumn
    },
    data() {
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
    gap: 8px;
    .workspaceList {
        width: 20vw;
        height: 100%;
        box-sizing: border-box;
    }

    .vGroup {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
        .workspaceInfo {
            display: flex;
            flex-grow: 1;
        }
        .hGroup {
            display: flex;
            flex-grow: 1;
            flex-direction: row;
            gap: 8px;
            .memberColumn, .inviteColumn {
                flex-grow: 1;
                max-width: 40%;
            }
        }
    }

}
</style>