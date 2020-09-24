<template>
  <v-app id="inspire">
        <Header/>
    
    <v-main>
      <v-container>
         <DevResult
         @child="boardState"/>
      </v-container>

      <!-- <v-container
       v-else-if="boardStates === 'showDetail'">
         <router-view/>
      </v-container> -->
      
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
import Header from "../components/header.vue";
import Footer from "../components/footer.vue";
import DevResult from "../components/Archievement/ArchievementList.vue";
import axios from 'axios';
//import DevResultDetail from "../components/DevResult/DevResultDetail.vue";



export default {
    components : {
        Header,
        Footer,
        DevResult,
        //DevResultDetail
     
    },

    props : {

    },
     data: () => ({
      boardStates : null
    }),


    async created(){
      console.log(this.boardStates)
   },
      
    

    methods : {
      boardState(getBoardDetail){
        console.log('부모 받은 값 : ', getBoardDetail)
        this.boardStates = getBoardDetail;

        // this.$router.push({name : "DevResultDetail"});
      

      }
    },

   
}
</script>

<style>

</style>