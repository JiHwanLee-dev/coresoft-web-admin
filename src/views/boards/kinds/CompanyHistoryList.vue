<template>
    <v-app id="inspire">
        <Header/>
    
    <v-main>
      <v-container>
        <BoardList
          :propsdata="subject"/>
      </v-container>
    </v-main>
    
    <v-footer
      color="indigo"
      app
    >
  
    <Footer/>
      
    </v-footer>
  </v-app>

</template>

<script>
/* eslint-disable */
// @/ => src경로부터 시작
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import { mapState } from 'vuex';

export default {
    components : {
        Header,
        Footer,
    },

    props : {

    },

    created(){
      console.log('Notice_Created')
      this.$store.commit('currentBoardName', this.subject)
    },

    data(){
      return {
        subject : "companyHistory"
      }
    },

    computed : {
      ...mapState(['isLogin'])
    }

   
}
</script>

<style>

</style>