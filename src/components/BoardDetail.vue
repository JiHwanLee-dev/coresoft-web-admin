<template>

 <v-app id="inspire">
       
        <v-layout 
          column
          align-center
        >   
     
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
              <v-col 
              sm="8"
              cols="12" >
              <v-text-field
                :value="boardInfo.title"
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
                :value="boardInfo.content"
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



               <!-- v-if="this.userInfo === this.writer" -->
               <v-row
            
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
        </v-layout>
  </v-app>

</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import axios from "axios";
import { mapState } from 'vuex';
import { pageNumEventBus } from '@/main.js';

export default {
  components : {
        Header,
        Footer,
    },

    props : ['propsdata'],

  data() {
    return {
      setIndex : '',
     


      boardInfo : {
        idx : '',
        subject : '',
        title : '',
        content : '',
        writer : '',
        use_yn : 'N',
        year : '',
        month : '',
        adminId : '',
      }
    }
  },

  computed : {
      ...mapState(["boardName"]),
      ...mapState(["userInfo"]),
      ...mapState(["boardCurrentPageNum"]),
      
  },

  async created(){
    
    console.log('propsdata : ',this.propsdata);
    console.log('userInfo : ', this.userInfo);
    console.log('pageNum : ', this.boardCurrentPageNum);
    console.log('query_page : ', this.$route.params.page);
    console.log('currentboardname : ', this.boardName);


    // this.boardInfo.subject = this.propsdata
    // this.boardInfo.index = this.$route.query.index;
    // this.boardInfo.userId = this.userInfo[0].admin_id
    

    // 문자열로 변환해서 서버에 보내줌.
    //const boardInfos = JSON.stringify(this.boardInfo)

     this.boardInfo.adminId = this.userInfo;
     this.boardInfo.idx = Number(this.$route.query.index);
       // 서버통신으로 notice 특정 데이터를 불러옴
     console.log(' boardInfo.idx : ', this. boardInfo.idx);

     

     //const noticeData = await axios.get(`http://localhost:4000/detail/${boardInfos}`, {
    const noticeData = await axios.get(`http://api.coresoft.co.kr/api/v1/${this.boardName}/${this.$route.query.index}`)
      .then(res => {
          console.log(`res_${this.propsdata}_detail_datas : `, res)
          console.log(res.data.title);
          this.boardInfo.title = res.data.title;
          this.boardInfo.content = res.data.content;
          this.boardInfo.writer = res.data.rgst_id;
          this.boardInfo.year = res.data.year;
          this.boardInfo.month = res.data.month;
      }).catch(err => {
          console.log('err : ', err)
      })

      
    
    // pageNumEventBus.$on('getPageNumEventBus', (date) => {
    //     console.log('currentBuss : ', date)
    // })





    // 페이지 뒤로가기 클릭 시, 처음 페이지로 리로드가 되는게 아니라, 현재 페이지 번호를 토대로 리로드가 되어야 됨.
    // ex. 2페이지의 상세화면 들어갔을 시, 뒤로가기 클릭 했을 때, 1페이지 부터 리로드가 된다. 고로, 2페이지부터 리로드가 되게 할려면, 페이지 넘버2 를 넘겨줘야 됨.
     window.onpopstate = function(event){
        //alert('뒤로가기')
        //pageNumEventBus.$emit('currentPageNum', 2);
        //this.$router.go(-1)
        console.log(window.history, "location : ", document.location)
    }

    
  },

  mounted(){
    window.scrollTo(0,0)  // 스크롤 위치 최상단으로 

    

     window.onpopstate = function(event){
          console.log(' ---------------- 뒤로가기 ---------------------')
          alert('뒤로가기')
    }
  },
  
  methods : {
    // 목록으로 돌아가기
    getList(){
      console.log('getList_index : ', this.$route.query.index)

       //this.$router.back()
        var names = '';

       if(this.propsdata === 'companyHistory'){
          names = 'CompanyHistory' 
       }else if(this.propsdata === 'archievements'){
          names = 'Archievement'
       }else if(this.propsdata === 'notice'){
          names = 'Notice'
       }

      this.$router.push(
        {
          name : names,
          params : {
            page : this.boardCurrentPageNum
          }
        }
      )

      
      // this.$router.push(
      //   {
      //     name : "Test",
      //     params : {
      //       page : this.boardCurrentPageNum
      //     }
      //   }
      // )



    },

    update() {
       this.$router.push(
        {
          name : 'Update',
          params : {
            subject : this.propsdata,
            title : this.boardInfo.title,
            content : this.boardInfo.content,
            writer : this.boardInfo.writer,
            index : this.boardInfo.idx,                                                                                                                                                                                                                                                                                                                                                                                                                       
            year : this.boardInfo.year,
            month : this.boardInfo.month,
          
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

        console.log(this.boardInfo)
        // 문자열로 변환해서 서버에 보내줌.
        const boardInfos = JSON.stringify(this.boardInfo)

        console.log('boardInfo : ', boardInfos);
        //await axios.get(`http://localhost:4000/delete/${boardInfos}`, {
        axios({  
              url: `http://api.coresoft.co.kr/api/v1/${this.propsdata}/${this.boardInfo.idx}`,
              method: "delete",
              data: this.boardInfo,
              headers: {
                    'content-type': 'application/json',
              }
        })
        .then(res => {
            console.log('res_delete_datas : ', res)

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