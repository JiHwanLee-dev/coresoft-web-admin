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
          <h2> 공지사항 </h2>
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

              <!-- 글 작성자만 수정,삭제를 할 수 있게 v-if속성 적용 -->
               <v-row
              v-if="this.userInfo[0].admin_id === this.writer"
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
import { mapState } from 'vuex';

export default {
  components : {
        Header,
        Footer,
    },

  data() {
    return {
      setIndex : '',
      title : '',
      content : '',
      index: null,
      writer : null,
    }
  },

  computed : {
    getParams(){
      //setIndex = this.$route.query.index;
      return this.$route.query.index
    },
     
    ...mapState(["userInfo"]),
  },

  async created(){
    
    // const data2 = await axios.get(`http://api.coresoft.co.kr/api/v1/notice/${this.$route.query.index}`)  // 국내외 개발실적 전체보기
    // .then(res => {
    //   console.log('res_detail : ', res)
    //   console.log(res.data.title)
    //   console.log(res.data.content)

    //   this.title = res.data.title
    //   this.content = res.data.content
     
    // })
    // .catch(err => {
    //   console.log('err : ', err)
    // })

      // 서버통신으로 notice 특정 데이터를 불러옴
     console.log('index : ', this.$route.query.index);
     const noticeData = await axios.get(`http://localhost:4000/notice/noticeDetail/${this.$route.query.index}`, {
       //index : this.$route.query.index
     })
      .then(res => {
          console.log('res_notice_detail_datas : ', res)
          //console.log('items : ', res.data.recordset)
          //this.desserts = res.data.recordset;
          console.log(res.data.recordset[0].title)
          this.title = res.data.recordset[0].title;
          this.content = res.data.recordset[0].content;
          this.writer = res.data.recordset[0].rgst_id;
      }).catch(err => {
          console.log('err : ', err)
      })

    
    
  },

  mounted(){
    window.scrollTo(0,0)  // 스크롤 위치 최상단으로 
    

    window.onpopstate = function(event){
      //alert('뒤로가기')
    }
  },

  methods : {
    // 목록으로 돌아가기
    getList(){
      console.log('index : ', this.$route.query.index)
      this.$router.push(
        {
          name : 'Notice'
       
        }
      )
    },
   
  }
}
</script>

<style>

</style>