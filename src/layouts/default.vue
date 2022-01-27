<template>
  <v-app dark>
    <v-app-bar color="black" app>
      <v-toolbar-title class="white--text"> [BLOCKPIXELS] </v-toolbar-title>
      <v-spacer />

      <v-btn
        v-if="!this.$store.getters['isSignedIn']"
        outlined
        class="white--text"
        @click="login"
      >
        Login With NEAR Testnet Wallet
      </v-btn>
      <v-btn v-else class="white--text" outlined @click="logout"
        >Logout ({{ this.$store.getters['getAccountId'] }})</v-btn
      >
    </v-app-bar>
    <v-main>
      <Loader />
      <v-container>
        <Nuxt />
        <Errors />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Errors from '~/components/Errors.vue'
import Loader from '~/components/Loader.vue'

export default {
  name: 'DefaultLayout',
  components: {
    Errors,
    Loader,
  },
  methods: {
    async login() {
      await this.$store.dispatch('nearLogin')
    },
    async logout() {
      await this.$store.dispatch('nearLogout')
    },
  },
}
</script>
