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

export default {
    props : ['propsdata'],
    data: () => ({
        dialog: false,
        headers: [
            {
            text: '번호',
            align: 'start',
            sortable: false,
            value: 'idx',
            },
            { text: '제목', sortable: false, value: 'title' },
            { text: '조회수',  sortable: false, value: 'hit' },
            { text: '등록일',  sortable: false, value: 'rgst_dt' },
        
        ],
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
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },
        

        async created(){ 
            console.log('propss : ', this.propsdata)

            
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
                console.log('res_notice_datas : ', res)
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