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
        vuex userInfo : {{ userInfo }}
        login : {{ isLogin }}
          <h2
          v-if="subject === 'notice'"> 공지사항 
          </h2>

          <h2
          v-else-if="subject === 'archievement'"> 국내외 개발실적 
          </h2>



          <br>
          <hr>
          <br>
              <v-col 
              sm="8"
              cols="12" >
              <v-text-field
                v-model="boardInfo.title"
                label="제목"
                outlined
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
                v-model="boardInfo.content"
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
                color="warning"
                @click="getRegister">
                등록
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
import Header from "./header.vue";
import Footer from "./footer.vue";
import axios from 'axios'
import { mapState } from 'vuex';

export default {
  components : {
        Header,
        Footer,
    },

    data(){
        return {
            //subject : null,
            //title : null,
            //content : null,

            boardInfo : {
                subject : null,
                title : null,
                content : null
            }
        }
    },

    created(){
        console.log(this.$route.params.subject)
        this.subject = this.$route.params.subject
        
        this.boardInfo.subject = this.subject

        localStorage.getItem('LoginStatus')

    },

        
    mounted(){
        window.scrollTo(0,0)  // 스크롤 위치 최상단으로 
        
        //console.log(this.$route.params.title)
        window.onpopstate = function(event){
        //alert('뒤로가기')
        }

    },

    computed : {
        ...mapState(["userInfo"]),
        ...mapState(["isLogin"])
    },

    methods : {
        // 목록으로 돌아가기
        getList(){

        },

        // 글 등록
        async getRegister(){
            //console.log('title : ', this.boardInfo.title, '  content : ', this.boardInfo.content, '  subject : ', this.boardInfo.subject)
            console.log('info : ', this.boardInfo)

            const boardInfos = JSON.stringify(this.boardInfo)



            
            
            // 서버통신으로 notice데이터를 불러옴
            const noticeData = await axios.get(`http://localhost:4000/register/${boardInfos}`)
            .then(res => {
                console.log('res_notice_datas : ', res)
                //console.log('items : ', res.data.recordset)
                //this.desserts = res.data.recordset;
            }).catch(err => {
                console.log('err : ', err)
            })
            
            
        }
    }
}
</script>

<style>

</style>