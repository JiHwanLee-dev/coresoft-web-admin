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
          <h2> 회사 연혁 </h2>
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

               <v-row
               v-if="this.userInfo[0].admin_id === this.writer"
              justify="end">
                <v-btn
                style="margin-right: 5px;"
                color="error"
                @click="update"
                >
              수정
                 </v-btn>
                 <v-btn
                color="warning"
                @click="deletes">
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
      writer : null,
      year : null,
      month : null,

      boardInfo : {
        index : null,
        subject : 'companyHistory',
        userId : null,
        del_dt : null,
        del_tm : null,
        use_yn : 'N'
      }
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
    
    /*
    const data2 = await axios.get(`http://api.coresoft.co.kr/api/v1/companyhistory/${this.$route.query.index}`)  // 국내외 개발실적 전체보기
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
    */

    this.boardInfo.userId = this.userInfo[0].admin_id
    this.boardInfo.index = this.$route.query.index;
   
      // 서버통신으로 notice 특정 데이터를 불러옴
     console.log('index : ', this.$route.query.index);
     const noticeData = await axios.get(`http://localhost:4000/companyHistory/companyHistoryDetail/${this.$route.query.index}`, {
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
          this.year = res.data.recordset[0].year;
          this.month = res.data.recordset[0].month;
      }).catch(err => {
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
          name : 'CompanyHistory'
        }
      )
    },

    update() {
       this.$router.push(
        {
          name : 'Update',
          params : {
            subject : 'companyHistory',
            title : this.title,
            content : this.content,
            writer : this.writer,
            index : this.$route.query.index,
            year : this.year,
            month : this.month,
          }
        }
      )
    },

    async deletes() {
      var delConfirm = confirm('글을 삭제하시겠습니까?')
      if(delConfirm){
        // 삭제하기

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
            const del_dt = year + '' + month + '' + date;
            const del_tm = hours + '' + minutes + '' + seconds;

            this.boardInfo.del_dt = del_dt;
            this.boardInfo.del_tm = del_tm;

        // 서버통신으로 notice 특정 데이터를 불러옴
        //console.log('index : ', this.$route.query.index);

        // 문자열로 변환해서 서버에 보내줌.
        const boardInfos = JSON.stringify(this.boardInfo)

        console.log('boardInfo : ', boardInfos);
        const noticeData = await axios.get(`http://localhost:4000/delete/${boardInfos}`, {
          //index : this.$route.query.index
        })
        .then(res => {
            console.log('res_delete_datas : ', res)
        
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
        

      }else{
        // 삭제취소
        //alert('취소취소')
      }
    }
  }
}
</script>

<style>

</style>