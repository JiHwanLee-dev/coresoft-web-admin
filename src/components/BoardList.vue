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
    @click:row="click"
  >
 
    <template v-slot:top>
      <v-toolbar flat color="white"
      style="margin-bottom:30px;">

        <v-toolbar-title
            v-if="propsdata === 'notice'">
            공지사항
        </v-toolbar-title>

        <v-toolbar-title
            v-else-if="propsdata === 'archievement'">
            국내외 개발실적
        </v-toolbar-title>

        <v-toolbar-title
            v-else-if="propsdata === 'companyHistory'">
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
    props : ['propsdata'],
    data: () => ({
        dialog: false,
        headers: [],
        desserts: [],
        editedIndex: -1,
    
        searchText : null,

        page: 1,
        pageCount: 0,
        itemsPerPage: 10,

        // 
        detailName : null,
        registerName : null,
        updateName : null
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },

             ...mapState(["boardName"]),
             ...mapState(["boardCurrentPageNum"]),
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },
        

        async created(){ 
            console.log('propss : ', this.propsdata)

            if(this.propsdata === 'archievement' || this.propsdata === 'companyHistory'){
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
            }else if (this.propsdata === 'notice'){
                this.headers = [
                    {
                    text: '번호',
                    align: 'start',
                    sortable: false,
                    value: 'idx',
                    },
                    { text: '제목', sortable: false, value: 'title' },
                    { text: '조회수',  sortable: false, value: 'hit' },
                    { text: '등록일',  sortable: false, value: 'rgst_dt' },
                
                ]
            }


            if(this.propsdata === 'notice'){
                this.detailName = 'NoticeDetail'    
                this.registerName = 'NoticeRegister'   
                this.updateName = 'NoticeUpdate'
            }else if(this.propsdata === 'archievement'){
                this.detailName = 'ArchievementDetail'
                this.registerName = 'ArchievementRegister'
                this.updateName = 'ArchievementUpdate'   
            }else if(this.propsdata === 'companyHistory'){        
                this.detailName = 'CompanyHistoryDetail'
                this.registerName = 'CompanyHistoryRegister'
                this.updateName = 'CompanyHistoryUpdate'   
            }

            // 서버통신으로 게시판에 맞는 데이터를 불러옴
            const noticeData = await axios.get(`http://localhost:4000/${this.propsdata}`)
            .then(res => {
                console.log(`res_${this.propsdata}_datas : `, res)
                //console.log('items : ', res.data.recordset)
                this.desserts = res.data.recordset;
            }).catch(err => {
                console.log('err : ', err)
            })
        
    },

        methods: {
            // 상세보기 클릭
            click(value){
                for(var key in value){
                    //console.log(this.desserts.indexOf(value))
                    //console.log("value : " + value[key])
                }

                console.log(value.idx)

                console.log('page : ', this.page)
                console.log('pageCount : ', this.pageCount)
                console.log('detailName : ', this.detailName)

                var idx = value.idx
                // var detailName = ''

                 pageNumEventBus.getPageNumEventBus(this.page)


                this.$store.commit('currentBoardPageNum', this.page) 
                console.log('currentPageNum : ', this.boardCurrentPageNum);


                // 상세보기
                this.$router.push(
                     {name : this.detailName,
                         query : {
                             index : idx
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
            }

    
        },
}
</script>

<style>

</style>