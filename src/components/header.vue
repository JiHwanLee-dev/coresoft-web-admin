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
         <v-list-item link
         router :to="{name : 'About'}" exact>
          <v-list-item-action>
            <v-icon>mdi-note</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>TEST</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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
    </v-app-bar>
    </div>
</template>

<script>
export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
}
</script>

<style>

</style>