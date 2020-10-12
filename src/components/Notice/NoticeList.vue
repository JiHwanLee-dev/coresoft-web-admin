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
        <v-toolbar-title>공지사항</v-toolbar-title>
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
    <template v-slot:item.actions="{ item }">
        
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
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

  </div>
    
  
</template>

<script>
/* eslint-disable */
import axios from 'axios'

export default {
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

     // 서버통신으로 notice데이터를 불러옴
     const noticeData = await axios.get('http://localhost:4000/notice')
      .then(res => {
          console.log('res_notice_datas : ', res)
          //console.log('items : ', res.data.recordset)
          this.desserts = res.data.recordset;
      }).catch(err => {
          console.log('err : ', err)
      })
    
  },

    methods: {
        click(value){
          for(var key in value){
            //console.log(this.desserts.indexOf(value))
            //console.log("value : " + value[key])
          }

          console.log(value.idx)

          console.log('page : ', this.page)
          console.log('pageCount : ', this.pageCount)

          var idx = value.idx

          // 상세보기
          this.$router.push(
            {name : 'NoticeDetail',
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
            name : 'Register',
            params : {
              subject : 'notice'
            }
          }
        )
      }

 
    },
}
</script>

<style>

</style>