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
          <h2
          v-if="subject === 'notice'"> 공지사항 
          </h2>

          <h2
          v-else-if="subject === 'archievement'"> 국내외 개발실적 
          </h2>

          <h2
          v-else-if="subject === 'companyHistory'"> 회사 연혁
          </h2>
          <br>
          <hr>
          <br>
           <v-row
            v-if="subject === 'archievement' || subject === 'companyHistory'">
                <v-col
                    class="d-flex"
                    cols="12"
                    sm="6"
                >
                    <v-select
                    :items="this.years"
                    label="년"
                    v-model="boardInfo.year"
                    ></v-select>
                </v-col>

                 <v-col
                    class="d-flex"
                    cols="12"
                    sm="6"
                >
                    <v-select
                    :items="this.month"
                    label="월"
                    v-model="boardInfo.month"
                    ></v-select>
                </v-col>

            </v-row>
              <v-col 
              sm="8"
              cols="12" >
              <v-text-field
                label="제목"
                outlined   
                :value="boardInfo.title" 
                v-model="boardInfo.title"
                
                
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
                :value="boardInfo.content"
                v-model="boardInfo.content"
              
                
              ></v-textarea>
              
              <v-layout
              ml-3
              mr-3>
               <v-row>
                <v-btn
                color="primary"
                >
              목록
                 </v-btn>
              </v-row>

                <v-row
              justify="end">

        
                 <v-btn
                color="warning"
                @click="getUpdate"
              >
                수정하기
                 </v-btn>
              </v-row>
             
              

              </v-layout>        
            </v-col>

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
import { mapState } from 'vuex';
import axios from 'axios'

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
          subject : null,
          basicTitle : null,
          basicContent : null,
          basicYear : null,
          basicMonth : null,
    

          boardInfo : {
                index : null,
                subject : null,
                title : null,
                content : null,
                userId : null,
                mdfy_dt : null,
                mdfy_tm : null,
                hit : 0,
                year : null,
                month : null,
            }
      }
  },

    created(){

        console.log(this.$route.params)
        this.subject = this.$route.params.subject
      
        this.boardInfo.subject = this.subject
        this.boardInfo.title = this.$route.params.title
        this.boardInfo.content = this.$route.params.content
        this.boardInfo.index = this.$route.params.index
        this.boardInfo.year = this.$route.params.year
        this.boardInfo.month = this.$route.params.month
       

        console.log(this.boardInfo.title)
        console.log(this.boardInfo.content)

        this.boardInfo.userId = this.userInfo[0].admin_id

  },



  methods : {
      // 수정하기 클릭 함수
    async getUpdate(){
        // alert('aa');

        var dt = new Date();

            var year = dt.getFullYear();
            var month = dt.getMonth() + 1;
            var date = dt.getDate();
            var hours = dt.getHours();
            var minutes = dt.getMinutes();
            var seconds = dt.getSeconds();

            // 한자리 수이면 앞에 0을 붙여 공백을 없앰

            if(month.toString().length < 2){
                month = "0" + month;
            }

            if(date.toString().length < 2){
                date = "0" + date;     // read-only error. why? const를 썻기 때문. var를 쓰면 에러 안남.
            }

            if(hours.toString().length < 2){
                hours = "0" + hours;
            }

            if(minutes.toString().length < 2){
                minutes = "0" + minutes;
            }

            if(seconds.toString().length < 2){
                seconds = "0" + seconds;
            }
            const mdfy_dt = year + '' + month + '' + date;
            const mdfy_tm = hours + '' + minutes + '' + seconds;

            this.boardInfo.mdfy_dt = mdfy_dt;
            this.boardInfo.mdfy_tm = mdfy_tm;


            
        console.log('info : ', this.boardInfo)

         // 문자열로 변환해서 서버에 보내줌.
        const boardInfos = JSON.stringify(this.boardInfo)

        

        // 서버통신으로 notice데이터를 불러옴
            const noticeData = await axios.get(`http://localhost:4000/update/${boardInfos}`)
            .then(res => {
                console.log('res_update_status : ', res.data)

                // 글작성이 완료 되었으므로, 목록화면으로 가야 됨
                if(res.data === 'notice'){
                    this.$router.push(
                        {
                            name : 'Notice'
                        }
                    )
                }else if(res.data === 'archievement'){
                    this.$router.push(
                        {
                            name : 'Archievement'
                        }
                    )
                }else if(res.data === 'companyHistory'){
                    this.$router.push(
                        {
                            name : 'CompanyHistory'
                        }
                    )
                }
            }).catch(err => {
                console.log('err : ', err)
            })


            

    }
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