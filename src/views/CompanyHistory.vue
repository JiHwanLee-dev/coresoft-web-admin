<template>
  <v-app id="inspire">
        <Header/>
    
    <v-main>
      <v-container>
         <CompanyHistoryList/>
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
import Header from "../components/header.vue";
import Footer from "../components/footer.vue";
import CompanyHistoryList from "../components/CompanyHistory/CompanyHistoryList.vue";

export default {
    components : {
        Header,
        Footer,
        CompanyHistoryList
     
    },

    props : {

    },
}
</script>

<style>

</style>