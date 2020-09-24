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
export default {
    components : {
        Header,
        Footer,
        NoticeList
    },

    props : {

    },

   
}
</script>

<style>

</style>