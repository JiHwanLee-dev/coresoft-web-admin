<template>

 <v-app id="inspire">
        <Header/>
  
    
      <v-container 
        fluid>
        <!-- column 수직 -->

        <BoardRegister
            :propsdata="subject"/>

      </v-container>

   

    <v-footer
      color="indigo"
      app
    >
    <Footer/>
    
    </v-footer>
  </v-app>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";


export default {
  components : {
        Header,
        Footer,
    },

    data(){
        return { 
             subject : "notice",
        }
    },

    async created(){
      
    },

        
    mounted(){
        window.scrollTo(0,0)  // 스크롤 위치 최상단으로 
        //console.log(this.$route.params.title)
        window.onpopstate = function(event){
        //alert('뒤로가기')
        }

    },

  


}
</script>

<style>

</style>