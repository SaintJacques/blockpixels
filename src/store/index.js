import * as NEAR from 'near-api-js'

export const state = () => ({
  nearConn: null,
  wallet: null,
  contracts: null,
})

export const getters = {
  getWallet: (state) => state.wallet,
  getNearConn: (state) => state.nearConn,
  isSignedIn: (state) => state.wallet.isSignedIn(),
  getAccountId: (state) => state.wallet.getAccountId(),
  getContracts: (state) => state.contracts,
}

export const mutations = {
  successLogin(state, newWallet) {
    state.wallet = newWallet
    state.accountId = newWallet.getAccountId()
  },
  setNearConn(state, newNearConn) {
    state.nearConn = newNearConn
  },
  setWallet(state, newWallet) {
    state.wallet = newWallet
  },
  setContracts(state, newContracts) {
    state.contracts = newContracts
  },
  setPixels(state, newPixels) {
    state.pixels = newPixels
  },
  async logout(state) {
    state.accountId = ''
    await state.wallet.signOut()
    window.location.replace('/')
  },
}

export const actions = {
  async nuxtClientInit({ commit }) {
    const { keyStores } = NEAR
    const config = {
      contractName: 'blockpixels.testnet',
      networkId: 'testnet',
      nodeUrl: 'https://rpc.testnet.near.org',
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
      explorerUrl: 'https://explorer.testnet.near.org',
    }
    const near = await NEAR.connect({
      deps: {
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      },
      ...config,
    })
    const wallet = await new NEAR.WalletConnection(near)
    const contracts = await new NEAR.Contract(
      wallet.account(),
      config.contractName,
      {
        viewMethods: ['get_pixels'],
        changeMethods: ['update_pixel'],
        sender: wallet.getAccountId(),
      }
    )
    const pixels = await contracts.get_pixels()

    commit('setNearConn', near)
    commit('setWallet', wallet)
    commit('setContracts', contracts)
    commit('setPixels', pixels)
  },
  async nearLogin({ commit, getters }) {
    let wallet = getters['getWallet']
    await wallet.requestSignIn('blockpixels.testnet', 'BLOCKPIXELS')
    commit('successLogin', wallet)
  },
  async nearLogout({ commit }) {
    await commit('logout')
  },
  async updatePixel({ getters, dispatch }, data) {
    const contracts = getters['getContracts']

    $nuxt.$emit('loading-enable', true)

    try {
      await contracts.update_pixel({
        ...data,
      })

      dispatch('getPixels')
    } catch (err) {
      $nuxt.$emit('loading-enable', false)
      $nuxt.$emit(
        'new_error',
        'Oops, something went wrong when updating the data 😌'
      )
    }
  },

  async getPixels({ getters }) {
    const contracts = getters['getContracts']
    $nuxt.$emit('loading-enable', true)

    try {
      const updatedPixels = await contracts.get_pixels()

      $nuxt.$emit('keep_the_updated_pixels', updatedPixels)
      $nuxt.$emit('loading-enable', false)
    } catch (err) {
      $nuxt.$emit('loading-enable', false)
      $nuxt.$emit(
        'new_error',
        'Oops, something went wrong when receiving the data 😌'
      )
    }
  },
}
