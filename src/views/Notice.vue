<template>
    <v-app id="inspire">
        <Header/>
    
    <v-main>
      <v-container>
        <NoticeList/>
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
import Header from "../components/header.vue";
import Footer from "../components/footer.vue";
import NoticeList from "../components/Notice/NoticeList.vue";
import { mapState } from 'vuex';

export default {
    components : {
        Header,
        Footer,
        NoticeList
    },

    props : {

    },

    created(){
      console.log('Notice_Created')
    },

    data(){
      return {
        ///testData : null  
      }
    },

    computed : {
      testData(){
          return this.$store.state
      },

      ...mapState(['isLogin'])
    }

   
}
</script>

<style>

</style>