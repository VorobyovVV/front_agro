import { PersistentStore } from "./storage";

class UserStore extends PersistentStore {
    data() {
        return {
            id: null,
            email: null,
            role: null,
            created_by: null,
            access_token: null,
            token_type: null,
            error: null,
        };
    }

    updateAll(object) {
        for (const key in object) {
            this.state[key] = object[key];
        }
    }
    updateState(key, value) {
        this.state[key] = value;
    }
    clearAll() {
        for (const key in this.state) {
            this.state[key] = null;
        }
    }
    isAuthorized() {
        if (this.state.access_token && this.state.token_type) {
            return true;
        } else return false;
    }
    setError(value) {
        this.state.error = value;
    }
    getError() {
        return this.state.error;
    }
}
export const userStore = new UserStore("USER_STORE");
