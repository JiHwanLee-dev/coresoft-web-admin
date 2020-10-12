<template>
    <v-app id="inspire">
        <Header/>
    
    <v-main>
      <v-container>
        <!-- <NoticeList/> -->
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
import NoticeList from "@/components/Notice/NoticeList.vue";
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
        subject : "notice"
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