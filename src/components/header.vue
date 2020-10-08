<template>
    <div>
        <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link
        router :to="{name : 'Notice'}" exact>
          <v-list-item-action>
            <v-icon>mdi-note</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>공지사항</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link
         router :to="{name : 'Archievement'}" exact>
          <v-list-item-action>
            <v-icon>mdi-note</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>국내외 개발실적</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link
         router :to="{name : 'CompanyHistory'}" exact>
          <v-list-item-action>
            <v-icon>mdi-note</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>회사 연혁</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <!-- <v-list-item link
         router :to="{name : 'About'}" exact>
          <v-list-item-action>
            <v-icon>mdi-note</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>TEST</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
      </v-list>
      
    </v-navigation-drawer>

    <v-app-bar
      app
      dark
      shrink-on-scroll
      src="https://picsum.photos/1920/1080?random"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>CoreSoft</v-toolbar-title>
      <v-spacer></v-spacer>
    
      <!-- 로그인이 되어 있으면 로그아웃 버튼 생성 -->
      <v-menu offset-y
        v-if="isLogin">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>
           mdi-dots-vertical
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
         @click="logout">    <!-- store안에 actions에 접근할려면 dispatch()함수를 써야 접근이 됨. -->
          <v-list-item-title> Log Out </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </v-app-bar>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    computed : {
        ...mapState(["isLogin"])
    },

    methods : {
      logout() {
        this.$store.commit('logout')

        // Main화면으로//
        this.$router.push(
          {
             name : 'Main'
          }
         )
      }
    }
}
</script>

<style>

</style>