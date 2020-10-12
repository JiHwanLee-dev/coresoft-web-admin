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
                    v-model="boardInfo.select_year"
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
                    v-model="boardInfo.select_month"
                    ></v-select>
                </v-col>

            </v-row>
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
           
            
            // 디비에 보내는 객체
            boardInfo : {
                subject : null,
                title : null,
                content : null,
                use_yn : 'Y',              // 테스트로 N 
                userId : null,
                rgst_dt : null,
                rgst_tm : null,
                hit : 0,
                select_year : null,   // year 과 month 는 국내외 개발실적, 회사 연혁 테이블 칼럼에 있어서 추가
                select_month : null,
                       
                
            }
        }
    },

    async created(){
        console.log('params.subject : ',this.$route.params.subject)
        console.log(this.year)

        this.subject = this.$route.params.subject
        this.boardInfo.subject = this.subject
        this.boardInfo.userId = this.userInfo[0].admin_id

        console.log('userInfo : ',this.boardInfo)
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
        ...mapState(["isLogin"]),
        ...mapState(["years"]),
        ...mapState(["month"]),


    },

    methods : {
        // 목록으로 돌아가기
        getList(){

        },

        // 글 등록
        async getRegister(){
            //console.log('title : ', this.boardInfo.title, '  content : ', this.boardInfo.content, '  subject : ', this.boardInfo.subject)

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

            console.log('today : ', dt)
            console.log('year : ', year)
            console.log('month : ', month)
            console.log('date : ', date)
            console.log('hours : ', hours)
            console.log('minutes : ', minutes)
            console.log('seconds : ', seconds)

            const rgst_dt = year + '' + month + '' + date;
            const rgst_tm = hours + '' + minutes + '' + seconds;

            console.log('rgst_dt : ', rgst_dt)
            console.log('rgst_tm : ', rgst_tm)

            this.boardInfo.rgst_dt = rgst_dt;
            this.boardInfo.rgst_tm = rgst_tm;


            console.log('select_year : ', this.boardInfo.select_year)
            console.log('select_month : ', this.boardInfo.select_month)
         
            console.log('boardInfo : ', this.boardInfo)
            
            // 문자열로 변환해서 서버에 보내줌.
            const boardInfos = JSON.stringify(this.boardInfo)

            // 서버통신으로 notice데이터를 불러옴
            const noticeData = await axios.get(`http://localhost:4000/register/${boardInfos}`)
            .then(res => {
                console.log('res_register_status : ', res)
                console.log('res_register_status : ', res.data)

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
    }
}
</script>

<style>

</style>