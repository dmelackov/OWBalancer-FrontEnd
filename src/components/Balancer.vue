<template>
    <div id="balance">
        <div class="balanceInfo">
            <p class="leftTeamName">{{ USettings.TeamNames[1] }}</p>
            <div class="evaluation">
                <div class="stat">
                    <p class="infoStat">Evaluation:</p>
                    <p class="statValue">{{ Balance.active.result }}</p>
                </div>
            </div>
            <p class="rightTeamName">{{ USettings.TeamNames[2] }}</p>
        </div>
        <div class="players">
            <div class="playerColumnLeft">
                <div class="stat" v-if="USettings.ExpandedResult">
                    <p class="infoStat" >Fairness:</p>
                    <p class="statValue">
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
                        :USettings="USettings"
                        :PlayerRole="item.roleMask"
                        :PlayerTeam="1"
                        :StaticID="item.staticId"
                    />
                </div>
            </div>

            <p class="vs">VS</p>
            <div class="playerColumnRight">
                <div class="stat" v-if="USettings.ExpandedResult">
                    <p class="infoStat">Uniformity:</p>
                    <p class="statValue">{{ Balance.active.vqUniformity }}</p>
                </div>
                <div class="rightPlayers">
                    <BalancePlayer
                        v-for="item in sTeam"
                        :key="item.staticId"
                        :PlayerStatic="Balance.static[item.staticId]"
                        :USettings="USettings"
                        :PlayerRole="item.roleMask"
                        :PlayerTeam="2"
                        :StaticID="item.staticId"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BalancePlayer from "./BalancePlayer.vue";

export default {
    components: { BalancePlayer },
    props: ["Balance", "USettings"],
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
};
</script>

<style>
@font-face {
    font-family: "TeamFont";
    src: url("/TeamFont.ttf");
}

@font-face {
    font-family: "VSFont";
    src: url("/VS_Font.otf");
}

p {
    margin: 0;
}
#balance {
    width: 1920px;
    background-color: #090c10;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    zoom: 60%;
}

.players {
    flex-grow: 3;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    align-items: center;
    margin: 10px 20px 20px 20px;
}
.leftPlayers,
.rightPlayers {
    background-color: #161b22;
    width: 100%;
    padding: 10px;
}
.playerColumnRight,
.playerColumnLeft {
    width: 45%;
    height: max-content;
    display: flex;
    flex-direction: column;
}

.playerColumnRight {
    align-items: flex-start;
}
.playerColumnLeft {
    align-items: flex-end;
}

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

.balanceInfo {
    display: flex;
    justify-content: space-between;
    justify-content: center;
}

.infoStat,
.statValue {
    font-size: 48px;
    font-family: TeamFont;
    color: #46494d;
}

.vs {
    font-size: 84px;
    font-family: VSFont;
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
.evaluation {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
