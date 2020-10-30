<template>
  <div>
    <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
    hide-default-footer 
    fixed-header
    :page.sync="page"
    :search="searchText"
    :items-per-page="itemsPerPage"
    @page-count="pageCount = $event"
    @input="handleClick"
    @click:row="click"
    @current-items="getCurrentItems"
  >

 
    <template v-slot:top>
      <v-toolbar flat color="white"
      style="margin-bottom:30px;">

        <v-toolbar-title
            v-if="propsdata.subject === 'notice'">
            공지사항
        </v-toolbar-title>

        <v-toolbar-title
            v-else-if="propsdata.subject === 'archievements'">
            국내외 개발실적
        </v-toolbar-title>

        <v-toolbar-title
            v-else-if="propsdata.subject === 'companyHistory'">
            회사연혁
        </v-toolbar-title>

        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>


      <v-col sm="6" cols="2"
      style="margin-top:40px;">
        <v-text-field
          v-model="searchText"
          append-icon="mdi-magnify"
          label="검색"
        ></v-text-field>

      </v-col>    
      </v-toolbar>
    </template>
  </v-data-table>
    <v-layout
    mt-3
    align-end>
        <v-row
              justify="end">
                <v-btn
                style="margin-right: 8px;"
                color="primary"
                @click="register"
                >
              등록
                 </v-btn>
               
        </v-row>
    </v-layout>
    <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>

    <!-- <router-view/> -->

  </div>
    
  
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import { mapState } from 'vuex';
import { pageNumEventBus } from '@/main.js';


export default {
     //props : ['propsdata'],


    props : {
        propsdata: {
            type : Object
        }
    },

    data: () => ({
        dialog: false,
        headers: [],

        desserts: [],
        temp_desserts:[],
        current_items:[],

        editedIndex: -1,
    
        searchText : null,

        page: null,
        pageCount: 0,
        itemsPerPage: 10,

        // 
        detailName : null,
        registerName : null,
        updateName : null
        }),

        computed: {
             ...mapState(["boardName"]),
             ...mapState(["boardCurrentPageNum"]),
             ...mapState(["boardCurrentList"]),
        },

        watch: {
           
        },

        beforeCreate(){
            
        },

         created(){ 
            console.log('craete()');

/*

            // 처음 페이지 로드 시
            if(this.propsdata.pageNum != null){
                this.page = this.propsdata.pageNum
            }else{
                this.page = this.boardCurrentPageNum
                //this.page = this.$route.params.page
            }


            console.log('pageNum : ', this.page)
            console.log('propss.subject : ', this.propsdata.subject)
            console.log('propss.pageNum : ', this.propsdata.pageNum)
            console.log('boardCurrentPageNumS : ', this.boardCurrentPageNum)
            console.log('boardCurrentList : ', this.boardCurrentList)
            //console.log(':page.sync : ', )


            */
            
            if(this.propsdata.subject === 'archievements' || this.propsdata.subject === 'companyHistory'){
                this.headers = [
                    {
                    text: '번호',
                    align: 'start',
                    sortable: false,
                    value: 'idx',
                    },
                    { text: '개발일자', value: 'date',  sortable: false, align: 'start'},
                    { text: '제목', value: 'title', sortable: false},
                    { text: '내용', value: 'content',  sortable: false},
                ]

            }else if (this.propsdata.subject === 'notice'){

                
                this.headers = [
                    {
                    text: '번호',
                    align: 'start',
                    sortable: false,
                    value: 'idx',
                    },
                    { text: '제목', sortable: false, value: 'title' },
                    { text: '조회수',  sortable: false, value: 'hit' },
                    { text: '등록일',  sortable: false, value: 'date' },
                
                ]
                
                /*
                this.headers = [
                    {
                        text: 'Dessert (100g serving)',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    { text: 'Calories', value: 'calories' },
                    { text: 'Fat (g)', value: 'fat' },
                    { text: 'Carbs (g)', value: 'carbs' },
                    { text: 'Protein (g)', value: 'protein' },
                    { text: 'Iron (%)', value: 'iron' },
                    ]
                */

            }


            if(this.propsdata.subject === 'notice'){
                this.detailName = 'NoticeDetail'    
                this.registerName = 'NoticeRegister'   
                this.updateName = 'NoticeUpdate'
            }else if(this.propsdata.subject === 'archievements'){
                this.detailName = 'ArchievementDetail'
                this.registerName = 'ArchievementRegister'
                this.updateName = 'ArchievementUpdate'   
            }else if(this.propsdata.subject === 'companyHistory'){        
                this.detailName = 'CompanyHistoryDetail'
                this.registerName = 'CompanyHistoryRegister'
                this.updateName = 'CompanyHistoryUpdate'   
            }


            /*

            // 서버통신으로 게시판에 맞는 데이터를 불러옴
            // const noticeData = await axios.get(`http://localhost:4000/${this.propsdata.subject}`)
            const noticeData =  axios.get(`http://api.coresoft.co.kr/api/v1/${this.propsdata.subject}?p=1&rpp=1000`)
            .then(res => {
                console.log(`res_${this.propsdata.subject}_datas : `, res)

                //console.log('items : ', res.data.recordset)

                // 기존꺼
                //this.desserts = res.data.recordset;
                this.temp_desserts = res.data.items;

                console.log('size : ', this.temp_desserts.length);
                
                var year = '';   // 년
                var month = '';   // 월
                var day = '';     // 일
                var sumDate = '';   // 년 월 일

                for(var i = 0; i < this.temp_desserts.length; i++){
                    //console.log('fpr : ', this.temp_desserts[i])

                    // 공지사항 등록일
                    if(this.propsdata.subject === 'notice'){
                         var rgst_Dt = this.temp_desserts[i].rgst_Dt;  

                        //console.log(rgst_Dt);
                        year = rgst_Dt.substring(0,4);
                        month = rgst_Dt.substring(4,6);
                        day = rgst_Dt.substring(6,8);
                        sumDate = year + '.' + month + '.' + day;

                        this.temp_desserts[i].date = sumDate;

                    // 그 외 게시판 등록일
                    }else{
                        this.temp_desserts[i].date = this.temp_desserts[i].year + '.' + this.temp_desserts[i].month;
                    }
                }
                
                //console.log(this.temp_desserts);

                this.desserts = this.temp_desserts;

                console.log('desserts : ', this.desserts)
            
            }).catch(err => {
                console.log('err : ', err)
            })

            */


            
        
    },

        methods: {
            // 상세보기 클릭
            click(value){
                for(var key in value){
                    //console.log(this.desserts.indexOf(value))
                    //console.log("value : " + value[key])
                }

                //console.log(value.idx)

                console.log('page : ', this.page)
                console.log('pageCount : ', this.pageCount)
                console.log('detailName : ', this.detailName)

                var idx = value.idx
                // var detailName = ''

               
                
                // 현재 게시판 page저장
                 pageNumEventBus.getPageNumEventBus(this.page)


                this.$store.commit('currentBoardPageNum', this.page) 
                console.log('currentPageNum : ', this.boardCurrentPageNum);

                this.$store.commit('currentBoardList', this.current_items)
                 console.log('current_items : ',this.current_items)


                // 상세보기
                this.$router.push(
                     {name : this.detailName,
                         query : {
                             //page : this.page,
                             index : idx,
                         },
                         params : {
                             page : this.page
                         }

                     }
                 ) 
            },
        
            // 글 등록 함수
            register(){
                // storage에 데이터 저장
                // this.$store.commit('currentBoardName', this.propsdata)   // store.index.js 파일의 mutations의 loginSuccess함수 호출 , 두번째 인자는 loginSuccess함수에 전달하는 값

                console.log('boardName : ',this.$store.state.boardName)
                this.$router.push(
                {
                    name : this.registerName,
                    params : {
                        subject : this.propsdata
                    }
                }
                )
            },

            handleClick(page){
                
            },

            
            
            
            getCurrentItems: function(value){
                console.log('현재 페이지 아이템 : ', value)
                this.current_items = value
                console.log('현재 페이지 번호 : ', this.page)
                //this.boardCurrentPageNum = this.page
                //value = null
               
            },

            

            // pageCount: function(value){
            //      console.log('valeu : ', value)
            // }
          
    
        },

        mounted(){
            console.log('BoardList_mounted', + this.propsdata)



            console.log('pageNum : ', this.page)
            console.log('propss.subject : ', this.propsdata.subject)
            console.log('propss.pageNum : ', this.propsdata.pageNum)
            console.log('boardCurrentPageNumS : ', this.boardCurrentPageNum)
            console.log('boardCurrentList : ', this.boardCurrentList)
            //console.log(':page.sync : ', )

            // 서버통신으로 게시판에 맞는 데이터를 불러옴
            // const noticeData = await axios.get(`http://localhost:4000/${this.propsdata.subject}`)
            const noticeData =  axios.get(`http://api.coresoft.co.kr/api/v1/${this.propsdata.subject}?p=1&rpp=1000`)
            .then(res => {
                console.log(`res_${this.propsdata.subject}_datas : `, res)

                //console.log('items : ', res.data.recordset)

                // 기존꺼
                //this.desserts = res.data.recordset;
                this.temp_desserts = res.data.items;

                console.log('size : ', this.temp_desserts.length);
                
                var year = '';   // 년
                var month = '';   // 월
                var day = '';     // 일
                var sumDate = '';   // 년 월 일

                for(var i = 0; i < this.temp_desserts.length; i++){
                    //console.log('fpr : ', this.temp_desserts[i])

                    // 공지사항 등록일
                    if(this.propsdata.subject === 'notice'){
                         var rgst_Dt = this.temp_desserts[i].rgst_Dt;  

                        //console.log(rgst_Dt);
                        year = rgst_Dt.substring(0,4);
                        month = rgst_Dt.substring(4,6);
                        day = rgst_Dt.substring(6,8);
                        sumDate = year + '.' + month + '.' + day;

                        this.temp_desserts[i].date = sumDate;

                    // 그 외 게시판 등록일
                    }else{
                        this.temp_desserts[i].date = this.temp_desserts[i].year + '.' + this.temp_desserts[i].month;
                    }
                }
                
                //console.log(this.temp_desserts);

                this.desserts = this.temp_desserts;

                console.log('desserts : ', this.desserts)



                /* 

                desserts변수에 데이터들을 대입했을 때 page번호를 설정함. 
                게시판 목록 데이터들이 axios통신으로 다 가져오기 전에 page를 설정해버리면,
                pagenation에는 page번호가 맞게 뜨는데, 게시판 목록 데이터들은 첫페이지 목록부터 보임
               
                */


                  // 처음 페이지 로드 시
                if(this.propsdata.pageNum != null){
                    this.page = this.propsdata.pageNum
                }else{
                    this.page = this.boardCurrentPageNum
                    //this.page = this.$route.params.page
                }
            
            }).catch(err => {
                console.log('err : ', err)
            })
            
        },

        updated(){
            console.log('BoardList_updated', + this.propsdata)
        },

        destroyed(){
            console.log('BoardList_destoryed', + this.propsdata)
        }
}
</script>

<style>

</style>