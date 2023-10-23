import axios from "axios"

class APIError {
    constructor(code, message){
        this.code = code
        this.message = message
    }
}

const settings_api = {
    async getSettings() {
        let res = await axios.get("/api/settings/getSettings")
        return res.data
    },
    async setSettings(Settings) {
        let res = await axios.post("/api/settings/setSettings", Settings);
        return res.data
    }
}

const auth_api = {
    async login(login, password, rememberMe) {
        let bodyFormData = new FormData();
        bodyFormData.set("username", login);
        bodyFormData.set("password", password);
        bodyFormData.set("remember_me", rememberMe);
        let res = await axios.post("/api/auth/login", bodyFormData, {
            headers: { "Content-Type": "multipart/form-data" },
            validateStatus: false
        });
        return res
    },
    async registration(login, password, repeatPassword) {
        let bodyFormData = new FormData();
        bodyFormData.set("username", login);
        bodyFormData.set("password", password);
        bodyFormData.set("password_again", repeatPassword);
        let res = await axios.post(
            "/api/auth/registration",
            bodyFormData,
            { headers: { "Content-Type": "multipart/form-data" }, validateStatus: false }
        );
        return res
    },
    logout() {
        return axios.post("/api/auth/logout")
    }
}

const balance_api = {
    async calcBalance(balance) {
        let res = await axios.post(
            "/api/balance/calcBalance",
            balance
        );
        return res.data
    },
    async getBalances() {
        let res = await axios.get("/api/balance/getBalances");
        return res.data
    }
}

const workspace_api = {
    setWorkspace(workspaceID) {
        return axios.put("/api/workspace/setWorkspace/" + workspaceID)
    },
    getWorkspace(workspaceID) { },
    async getWorkspaces() {
        let res = await axios.get("/api/workspace/getWorkspaces")
        return res.data
    },
    createWorkspace(name, settings) { },
    activateInviteCode(code) { },
    getInviteCodeInfo(code) { }
}

const customs_api = {
    async getCustoms(playerID) {
        let res = await axios.get("/api/customs/getCustoms/" + playerID)
        return res.data
    },
    async createCustom(playerID) {
        console.log(playerID)
        let res = await axios.post("/api/customs/createCustom", {
            id: playerID,
        })
        return res.data;
    },
    changeRoleSr(customID, role, sr) {
        return axios.put("/api/customs/changeRoleSr/" + customID, {
            role: role,
            sr: sr,
        });
    },
    deleteCustom(customID) {
        return axios.delete("/api/customs/deleteCustom/" + customID)
    }
}

const profile_api = {
    settings_api,
    auth_api,
    balance_api,
    workspace_api,
    async getCurrentUserInfo() {
        let res = await axios.get("/api/profile/getCurrentUserInfo")
        return res.data
    },
    async getPermissions() {
        try {
            let res = await axios.get("/api/profile/getPermissions")
        return res.data
        } catch (error) {
            return []
        }
    }
}

const players_api = {
    async getPlayers(searchStr = "") {
        let res = await axios.get("/api/players/getPlayers/")
        return res.data
    },
    setRoles(playerID, roles) {
        return axios.put("/api/players/setRoles/" + playerID, {
            roles: roles,
        });
    },
    setFlex(playerID, isFlex) {
        return axios.put("/api/players/setFlex/" + playerID, {
            status: isFlex,
        });
    },
    createPlayer(nickname) {
        return axios.post("/api/players/createPlayer", {
            Username: nickname,
        });
    },
    deletePlayer(playerId) {
        return axios.delete("/api/players/deletePlayer/" + playerId);
    },
    changeNickname(playerId, newNickname) {
        return axios.put("/api/players/changeNickname/" + playerId, { Username: newNickname });
    }
}

const lobby_api = {
    async getLobby() {
        try {
            let res = await axios.get("/api/lobby/getLobby")
            return res.data
        } catch (error) {
            throw new APIError(error.response.status, error.response.data);
        }
    },
    async addToLobby(customID) {
        try {
            let res = await axios.post("/api/lobby/addToLobby/" + customID)
            return res.data
        } catch (error) {
            throw new APIError(error.response.status, error.response.data);
        }
    },
    async deleteFromLobby(customID) {
        try {
            let res = await axios.delete("/api/lobby/deleteFromLobby/" + customID)
            return res.data
        } catch (error) {
            throw new APIError(error.response.status, error.response.data);
        }
    },
    async clearLobby() {
        try {
            let res = await axios.delete("/api/lobby/clearLobby")
            return res.data
        } catch (error) {
            throw new APIError(error.response.status, error.response.data);
        }
    }
}

export default {
    profile_api,
    customs_api,
    players_api,
    lobby_api
}
