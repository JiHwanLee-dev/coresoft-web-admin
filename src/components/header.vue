<template>
    <div>
       <!-- xxxxx 안되는 속성

       hide-overlay 
       disable-resize-watcher
       

       temporary : navigation-drawer 숨김
        -->
        <v-navigation-drawer
          disable-route-watcher
          v-model="drawer"
          app
          temporary
     
     
    >
      <v-list dense>
        <v-list-item link
        router :to="{name : 'Notice', params : {'page' : 1}}" exact>
          <v-list-item-action>
            <v-icon>mdi-note</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>공지사항</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link
         router :to="{name : 'Archievement', params : {'page' : 1}}" exact>
          <v-list-item-action>
            <v-icon>mdi-note</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>국내외 개발실적</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link
         router :to="{name : 'CompanyHistory', params : {'page' : 1}}" exact>
          <v-list-item-action>
            <v-icon>mdi-note</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>회사 연혁</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

    
      <!-- <v-list-item link
         router :to="{name : 'Test', params : {'page' : 1}}" exact>
          <v-list-item-action>
            <v-icon>mdi-note</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Test</v-list-item-title>
          </v-list-item-content>
        </v-list-item> 
      </v-list> -->
        <!-- 
      <v-list-item link
         router :to="{name : 'Test2', params : {'page' : 1}}" exact>
          <v-list-item-action>
            <v-icon>mdi-note</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Test2</v-list-item-title>
          </v-list-item-content>
        </v-list-item> 
          -->

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      dark
      elevate-on-scroll
      color="indigo darken-2"
      
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