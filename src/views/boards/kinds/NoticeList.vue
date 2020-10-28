<template>
    <v-app id="inspire">
        <Header/>
    
    <v-main>
      <v-container>
        <BoardList
          :propsdata="datas"/>
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


    created(){
      console.log('Notice_Created')
      this.$store.commit('currentBoardName', this.datas.subject)


      if(this.$route.params.page != null){
        console.log('params_page : ', this.$route.params.page);
        this.datas.pageNum = this.$route.params.page;
      }

    },

    data(){
      return {
        ///testData : null  

        datas : {
          subject : "notice",
          pageNum : null
        }
      

        
      }
    },

    computed : {
      testData(){
          return this.$store.state
      },

      ...mapState(['isLogin']),
    }

   
}
</script>

<style>

</style>