import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { web3 } from '../plugins/web3'
import shipping from '../plugins/shipping'

export const state = () => ({
    accounts: [] as string[],
    numUpdates: 0,
    shipStatus: '',
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    accounts: (state) => state.accounts,
    numUpdates: (state) => state.numUpdates,
    shipStatus: (state) => state.shipStatus,
}

export const mutations: MutationTree<RootState> = {
    'SET_ACCOUNTS': (state, accounts: string[]) => {
        state.accounts = accounts;
    },
    'SET_NUM_UPDATES': (state, numUpdates: number) => {
        state.numUpdates = numUpdates;
    },
    'SET_SHIP_STATUS': (state, shipStatus: string) => {
        state.shipStatus = shipStatus;
    }
}

export const actions: ActionTree<RootState, RootState> = {
    async getAccounts(vuexContext) {
        try {
            const accounts = await web3.eth.getAccounts()
            vuexContext.commit('SET_ACCOUNTS', accounts)
        } catch (e) {
            console.error(e)
        }
    },
    async runMethod(vuexContext, methodName) {
        try {
            const accounts = vuexContext.state.accounts
            try {
                await shipping.methods[methodName]().send({
                    from: accounts[0]
                })
                vuexContext.dispatch('getShipStatus')
                vuexContext.dispatch('getNumUpdates')
            } catch (e) {
                console.error(e)
            }
        } catch (e) {
            console.error(e)
        }
    },
    async getNumUpdates(vuexContext) {
        try {
            const numUpdates = await shipping.methods.numupdates().call(
                {
                    from: vuexContext.state.accounts[0]
                }
            )
            vuexContext.commit('SET_NUM_UPDATES', numUpdates)
        } catch (e) {
            console.error(e)
        }
    },
    async getShipStatus(vuexContext) {
        try {
            const shipStatus = await shipping.methods.Status().call({
                from: vuexContext.state.accounts[0]
            })
            vuexContext.commit('SET_SHIP_STATUS', shipStatus)
        } catch (e) {
            console.error(e)
        }
    }
}