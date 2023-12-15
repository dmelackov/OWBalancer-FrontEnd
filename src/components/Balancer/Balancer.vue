<template>
    <svg
        id="svgBalance"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        :viewBox="viewbox"
    >
        <foreignObject class="node" x="0" y="0" width="1920px" height="100%">
            <body xmlns="http://www.w3.org/1999/xhtml" width="100%">
                <div id="balance">
                    <div class="balanceInfo">
                        <p class="leftTeamName">{{ Settings.TeamNames.t1 }}</p>
                        <div class="evaluation">
                            <div class="stat">
                                <p class="infoStat">Evaluation:</p>
                                <p class="statValue">{{ Balance.active.result }}</p>
                            </div>
                        </div>
                        <p class="rightTeamName">{{ Settings.TeamNames.t2 }}</p>
                    </div>
                    <div class="players">
                        <div class="playerColumnLeft">
                            <div class="stat" v-if="Settings.ExpandedResult">
                                <p class="infoStat extStat">Fairness:</p>
                                <p class="statValue extStat">
                                    {{
                                        Math.round(
                                            (Balance.active.dpFairness +
                                                Balance.active.rgRolesFairness) *
                                                100
                                        ) / 100
                                    }}
                                </p>
                            </div>
                            <div class="leftPlayers">
                                <BalancePlayer
                                    v-for="item in fTeam"
                                    :key="item.staticId"
                                    :PlayerStatic="Balance.static[item.staticId]"
                                    :PlayerRole="item.roleMask"
                                    :PlayerTeam="1"
                                    :StaticID="item.staticId"
                                />
                            </div>
                        </div>

                        <p class="vs">VS</p>
                        <div class="playerColumnRight">
                            <div class="stat" v-if="Settings.ExpandedResult">
                                <p class="infoStat extStat">Uniformity:</p>
                                <p class="statValue extStat">
                                    {{ Balance.active.vqUniformity }}
                                </p>
                            </div>
                            <div class="rightPlayers">
                                <BalancePlayer
                                    v-for="item in sTeam"
                                    :key="item.staticId"
                                    :PlayerStatic="Balance.static[item.staticId]"
                                    :PlayerRole="item.roleMask"
                                    :PlayerTeam="2"
                                    :StaticID="item.staticId"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </foreignObject>
    </svg>
</template>

<script>
import BalancePlayer from "./BalancePlayer.vue";
import useLoginState from "@/store/LoginState";
export default {
    setup() {
        const { UserInfo, Settings, updateLoginState } = useLoginState();
        return {
            UserInfo,
            Settings,
            updateLoginState,
        };
    },
    components: { BalancePlayer },
    props: ["Balance"],
    data() {
        return {
            viewbox: "0 0 1920 1080",
        };
    },
    computed: {
        fTeam: {
            get() {
                let team = [];
                let fInd = 0;
                for (let i = 0; i < this.Balance.active.TeamMask.length; i++) {
                    const el = this.Balance.active.TeamMask[i];
                    if (el === "0") {
                        team.push({
                            roleMask: this.Balance.active.fMask[fInd],
                            staticId: i,
                        });
                        fInd++;
                    }
                }
                team.sort(function (row1, row2) {
                    var k1 = row1["roleMask"],
                        k2 = row2["roleMask"];
                    return k1 > k2 ? 1 : k2 > k1 ? -1 : 0;
                });
                return team;
            },
        },
        sTeam: {
            get() {
                let team = [];
                let sInd = 0;
                for (let i = 0; i < this.Balance.active.TeamMask.length; i++) {
                    const el = this.Balance.active.TeamMask[i];
                    if (el === "1") {
                        team.push({
                            roleMask: this.Balance.active.sMask[sInd],
                            staticId: i,
                        });
                        sInd++;
                    }
                }
                team.sort(function (row1, row2) {
                    var k1 = row1["roleMask"],
                        k2 = row2["roleMask"];
                    return k1 > k2 ? 1 : k2 > k1 ? -1 : 0;
                });
                return team;
            },
        },
    },
    mounted() {
        this.viewbox = "0 0 1920 ";
        this.viewbox += document.getElementById("balance").offsetHeight;
    },
};
</script>

<style scoped lang="scss">
@font-face {
    font-family: "TeamFont";
    src: url("/TeamFont.ttf");
}

@font-face {
    font-family: "VSFont";
    src: url("/VSfont.otf");
}

p {
    margin: 0;
}

#svgBalance {
    body {
        margin: 0;
        width: 1920px;
    }
    #balance {
        width: 1920px;
        background-color: #090c10;
        color: #ffffff;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        border: solid transparent 16px;
        .balanceInfo {
            display: flex;
            justify-content: space-between;
            justify-content: center;
            .leftTeamName,
            .rightTeamName {
                font-size: 96px;
                font-family: TeamFont;
                width: 45%;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .rightTeamName {
                text-align: right;
            }
            .evaluation {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding-bottom: 40px;
            }
        }
        .players {
            flex-grow: 3;
            display: flex;
            justify-content: space-between;
            flex-wrap: nowrap;
            align-items: center;
            margin: 10px 5px 20px 5px;
            .playerColumnRight,
            .playerColumnLeft {
                width: 45%;
                height: max-content;
                display: flex;
                flex-direction: column;
                
                .leftPlayers,
                .rightPlayers {
                    background-color: #161b22;
                    width: 100%;
                    padding: 10px;
                    box-sizing: border-box;
                }
            }

            .playerColumnRight {
                align-items: flex-start;
            }
            .playerColumnLeft {
                align-items: flex-end;
            }
            .vs {
                font-size: 84px;
                font-family: VSFont;
            }
        }
    }
}

.infoStat,
.statValue {
    font-size: 48px;
    font-family: TeamFont;
    color: #46494d;
}

.infoStat {
    margin-right: 8px;
}
.stat {
    display: flex;
}
.extendedInfo {
    margin-top: 40px;
    display: flex;
    gap: 250px;
}

.extStat {
    margin-top: -60px;
}
</style>
