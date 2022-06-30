<template>
    <div class="playerMenu" v-show="opened">
        <div class="editForm">
            <div class="playerControl">
                <input
                    type="text"
                    class="playerNickname custom_input"
                    @change="change"
                    v-model="player.Username"
                />
                <button class="deleteButton btn" v-show="!deleted" @click="del">
                    Delete
                </button>
                <button class="cancelButton btn" v-show="deleted" @click="cancelDel">
                    Cancel delete
                </button>
            </div>
            <div class="customsControl">
                <Scrollbar class="lobby_list">
                    <template v-for="custom in customs" :key="custom.ID">
                        <EditMenuCustom :custom="custom" />
                    </template>
                </Scrollbar>

            </div>
            <div class="formControl">
                <button class="cancelButton btn" @click="close">Cancel</button>
                <button
                    :class="{
                        saveButton: true,
                        btn: true,
                        submitGreenUnactive: !edited,
                    }"
                    @click="save"
                >
                    Save
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import EditMenuCustom from "./EditMenuCustom.vue"
import Scrollbar from "vue3-smooth-scrollbar";
import axios from "axios";

export default {
    components: {
        Scrollbar,
        EditMenuCustom
    },
    data() {
        return {
            opened: false,
            deleted: false,
            changed: false,
            player: {
                Username: "",
                ID: 0,
                Creator: {
                    ID: 0,
                    Username: ""
                },
            },
            customs: []
        };
    },
    computed: {
        edited(){
            return this.changed || this.deleted
        }
    }, 
    methods: {
        async open(player) {
            this.player = player;
            this.deleted = false;
            this.changed = false;
            await this.loadCustoms()
            this.opened = true;
        },
        close() {
            this.opened = false;
        },
        save() {
            if (!this.changed) return;
            this.close();
        },
        del() {
            this.deleted = true;
        },
        cancelDel() {
            this.deleted = false;
        },
        change() {
            this.changed = true;
        },
        async loadCustoms(){
            const res = await axios.get("/api/customs/getCustoms/" + this.player.ID);
            this.customs = res.data;
        }
    },
    created() {
        this.emitter.on("openPlayerEditMenu", this.open);
    },
    unmounted() {
        this.emitter.off("openPlayerEditMenu", this.open);
    },
};
</script>

<style lang="scss" scoped>
@import "/src/assets/css/var.scss";

.playerMenu {
    z-index: 100;
    position: absolute;
    top: 52px;
    width: 100vw;
    height: calc(100vh - 52px);
    background: rgba(0, 0, 0, 0.75);
    
    display: flex;
    justify-content: center;
    align-items: center;

    .editForm {
        width: 600px;
        height: 400px;
        background: $back2;
        box-shadow: 0 1px 0 #3a4b68a8;
        border-radius: 6px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .playerControl {
            display: flex;
            justify-content: space-between;
            .playerNickname {
                width: 200px;
                font-size: 18px;
                box-shadow: 0 1px 0 #3a4b68a8;
            }
            .deleteButton {
                background-color: $errorRed;
                box-shadow: none;
                width: 160px;
                padding: 4px 0;
                &:hover {
                    background-color: $errorRedHover;
                }
            }
            .cancelButton {
                width: 160px;
                padding: 4px 0;
                box-shadow: none;
                background-color: #6b1414;
                &:hover {
                    background-color: #921a1a;
                }
            }
        }

        .customsControl {
            display: flex;
            flex: 1;
            background-color: $back1;
            border-radius: 6px;
            padding: 16px;
        }
        .formControl {
            display: flex;
            justify-content: flex-end;
            gap: 20px;

            .saveButton {
                background-color: $submitGreen;
                box-shadow: none;
                padding: 8px 30px;
                &:hover {
                    background-color: $submitGreenHover;
                }
                &.submitGreenUnactive {
                    cursor: default;
                    background-color: $submitGreenUnactive;
                    &:hover {
                        background-color: $submitGreenUnactive;
                    }
                }
            }
            .cancelButton {
                padding: 8px 30px;
                background-color: $back3;
                &:hover {
                    background-color: $back4;
                }
            }
            
        }
    }
}
</style>
