<template>
        <v-layout 
          column
          align-center
        >   
        <!-- style="padding-right: 190px; padding-left: 190px; padding-top: 80px" -->
          <h2
          v-if="propsdata === 'notice'"> 공지사항 
          </h2>

          <h2
          v-else-if="propsdata === 'archievements'"> 국내외 개발실적 
          </h2>

          <h2
          v-else-if="propsdata === 'companyHistory'"> 회사 연혁
          </h2>
          <br>
          <hr>
          <br>
           <v-row
            v-if="propsdata === 'archievements' || propsdata === 'companyHistory'">
                <v-col
                    class="d-flex"
                    cols="12"
                    sm="6"
                >
                    <v-select
                    :items="this.years"
                    label="년"
                    v-model="boardInfo.Year"
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
                    v-model="boardInfo.Month"
                    ></v-select>
                </v-col>

            </v-row>
              <v-col 
              sm="8"
              cols="12" >
              <v-text-field
                label="제목"
                outlined   
                :value="boardInfo.Title" 
                v-model="boardInfo.Title"
                
                
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
                :value="boardInfo.Content"
                v-model="boardInfo.Content"
              
                
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

    props : ['propsdata'],

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
                    Idx : 0,
                    subject : null,
                    Title : null,
                    Content : null,
                    AdminId : null,
                    mdfy_dt : null,
                    mdfy_tm : null,
                    hit : 0,
                    Year : null,
                    Month : null,
                }
        }
    },

        created(){
            
            console.log(this.$route.params)
            this.subject = this.propsdata

            this.boardInfo.subject = this.subject
            this.boardInfo.Title = this.$route.params.title
            this.boardInfo.Content = this.$route.params.content
            this.boardInfo.Idx = Number(this.$route.params.index)                 // idx값이 문자열이어서 request보낼 때 에러가 남. 정수형으로 바꿔줘야지 에러가 안남. (DB에서는 IDX가 정수로 설정되어잇음)
            this.boardInfo.Year = this.$route.params.year
            this.boardInfo.Month = this.$route.params.month
        

            console.log(this.boardInfo.Title)
            console.log(this.boardInfo.Content)
            console.log(this.subject)
            console.log(this.$route.params.index)

            //this.boardInfo.userId = this.userInfo[0].admin_id
            this.boardInfo.AdminId = this.userInfo

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

//"{"Idx":"1032","subject":"companyHistory","Title":"test444_qq_00","Content":"test444_qq_00","AdminId":"zephome","mdfy_dt":"20201028","mdfy_tm":"190515","hit":0,"Year":"2018","Month":"03"}"
                
                

            // 문자열로 변환해서 서버에 보내줌.
            const boardInfos = JSON.stringify(this.boardInfo)
            console.log('this.info : ', this.boardInfo)
            console.log('info : ', boardInfos)

            // 서버통신으로 notice데이터를 불러옴  http://api.coresoft.co.kr/api/v1/companyhistory/1027
                // const noticeData = await axios.get(`http://localhost:4000/update/${boardInfos}`)
                axios({   
                    url: `http://api.coresoft.co.kr/api/v1/${this.propsdata}/${this.boardInfo.Idx}`,
                    method: "put",
                    data: this.boardInfo,
                    headers: {
                        'content-type': 'application/json',
                    }
                })
                .then(res => {
                    console.log('res_update_status : ', res.data)

                    // 글작성이 완료 되었으므로, 목록화면으로 가야 됨
                    if(res.data.ok === true){

                        if(this.propsdata === 'notice'){
                            this.$router.push(
                                {
                                    name : 'Notice'
                                }
                            )
                        }else if(this.propsdata === 'archievements'){
                            this.$router.push(
                                {
                                    name : 'Archievement'
                                }
                            )
                        }else if(this.propsdata === 'companyHistory'){
                            this.$router.push(
                                {
                                    name : 'CompanyHistory'
                                }
                            )
                        }  
                    }
                    
                }).catch(err => {
                    console.log('err1 : ', err.response)
                    console.log('err2 : ', err.request)
                    console.log('err3 : ', err.message)
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
