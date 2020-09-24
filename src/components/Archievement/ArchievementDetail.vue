<template>

 <v-app id="inspire">
        <Header/>
  
    
      <v-container 
        fluid>
        <!-- column 수직 -->
        <v-layout 
          column
          align-center
        >   
        <!-- style="padding-right: 190px; padding-left: 190px; padding-top: 80px" -->
          <h2> 국내외 개발실적 </h2>
          <br>
          <hr>
          <br>
              <v-col 
              sm="8"
              cols="12" >
              <v-text-field
                :value="title"
                label="제목"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <!-- {{ getParams }} -->
            <v-col 
              cols="12" 
              sm="8"
              >

              <v-textarea
                outlined
                name="input-7-4"
                label="내용"
                readonly
                :value="content"
              ></v-textarea>
              
              <v-layout
              ml-3
              mr-3>
               <v-row>
                <v-btn
                color="primary"
                @click="getList">
              목록
                 </v-btn>
              </v-row>

               <v-row
              justify="end">
                <v-btn
                style="margin-right: 5px;"
                color="error"
                >
              수정
                 </v-btn>
                 <v-btn
                color="warning">
              삭제
                 </v-btn>
              </v-row>
              </v-layout>
             

              
            </v-col>

            

            
            


        
          <!-- <v-col cols="12">
            <v-text-field
              value="John Doe"
              label="제목"
              outlined
              readonly
            ></v-text-field>
          </v-col> -->

        </v-layout>
      
      </v-container>

   

    <v-footer
      color="indigo"
      app
    >
    <Footer/>
      
    </v-footer>
  </v-app>

   <!-- <v-main>
      <v-container>
         <h1> DevResultDetails </h1>
      {{ getParams }}
      </v-container>

    </v-main> -->


  
</template>

<script>
import Header from "../header.vue";
import Footer from "../footer.vue";
import axios from "axios";

export default {
  components : {
        Header,
        Footer,
    },

  data() {
    return {
      setIndex : '',
      title : '',
      content : ''
    }
  },

  computed : {
    getParams(){
      //setIndex = this.$route.query.index;
      return this.$route.query.index
    }
  },

  async created(){
    
    const data2 = await axios.get(`http://api.coresoft.co.kr/api/v1/archievements/${this.$route.query.index}`)  // 국내외 개발실적 전체보기
    .then(res => {
      console.log('res_detail : ', res)
      console.log(res.data.title)
      console.log(res.data.content)

      this.title = res.data.title
      this.content = res.data.content
     
    })
    .catch(err => {
      console.log('err : ', err)
    })
    
    
  },

  mounted(){
    window.scrollTo(0,0)  // 스크롤 위치 최상단으로 
  },

  methods : {
    // 목록으로 돌아가기
    getList(){
      console.log('index : ', this.$route.query.index)
      this.$router.push(
        {
          name : 'Archievement'
        }
      )
    }
  }
}
</script>

<style>

</style>