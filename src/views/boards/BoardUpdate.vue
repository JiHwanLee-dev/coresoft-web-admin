<template>
    <v-app id="inspire">
        <Header/>
  
    
      <v-container 
        fluid>

        <BoardUpdate
            :propsdata="subject"/>
      </v-container>


    <v-footer
      color="indigo"
    >
    <Footer/>
      
    </v-footer>
  </v-app>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import { mapState } from 'vuex';

export default {
     components : {
        Header,
        Footer,
    },

    mounted(){
            window.scrollTo(0,0)  // 스크롤 위치 최상단으로 
            window.onpopstate = function(event){
            //alert('뒤로가기')
            }
    },

    data(){
        return {
            subject : "",
        }
    },

        created(){
        this.subject = this.$store.state.boardName
        console.log('subject : ', this.subject)
    },

    computed : {
            ...mapState(["userInfo"]),
            ...mapState(["years"]),
            ...mapState(["month"]),
        },

    


}

</script>

<style>

</style>