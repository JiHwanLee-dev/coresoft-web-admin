<template>
    <div>
         <v-data-table
            :headers="headers"
            :items="desserts"
            class="elevation-1"
            hide-default-footer
            fixed-header
            @click:row="click"
            :search="searchText"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            @page-count="pageCount = $event"
        >
            

            <template v-slot:top>
            <v-toolbar flat color="white"
            style="margin-bottom:30px;">
                <v-toolbar-title>회사 연혁</v-toolbar-title>
                <v-divider
                class="mx-4"
                inset
                vertical
                ></v-divider>
                <v-spacer></v-spacer>


            <v-col sm="6" cols="2"
            style="margin-top:40px;">
                <v-text-field
                label="검색"
                v-model="searchText"
                append-icon="mdi-magnify"
                ></v-text-field>

            </v-col>
                
            
                
            </v-toolbar>
            </template>
        </v-data-table>
        <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      
        </div>
    </div>
 
  
</template>

<script>
/* eslint-disable */
import axios from 'axios';
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
        { text: '개발일자', value: 'date',  sortable: false, align: 'start'},
        { text: '제목', value: 'title', sortable: false},
        { text: '내용', value: 'content',  sortable: false},
       
       
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      searchText : null,

     page: 1,
     pageCount: 0,
        itemsPerPage: 10,
    
    select : null,
    searchText : null
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
      
      /*
      const data2 = await axios.get('http://api.coresoft.co.kr/api/v1/companyhistory?p=1&rpp=24&t&q')  // 회사연혁 전체보기
      .then(res => {
        console.log('res : ', res)
        console.log(res.data.message)
        this.msg = res.data.message
        this.data2 = res.data.items
        console.log(res.data.items)
        console.log(res.data.title)
        this.desserts = res.data.items
        console.log('desserts : ', this.desserts);
      })
      .catch(err => {
        console.log('err : ', err)
      })
      */

     // 서버통신으로 notice데이터를 불러옴
     const noticeData = await axios.get('http://localhost:4000/companyHistory')
      .then(res => {
          console.log('res_companyHistory_datas : ', res)
          //console.log('items : ', res.data.recordset)
          this.desserts = res.data.recordset;
      }).catch(err => {
          console.log('err : ', err)
      })

    
    
  },

    methods: {
        click(value){
          for(var key in value){
            console.log(this.desserts.indexOf(value))
            console.log("value : " + value[key])
          }


          console.log(value.idx)

          var idx = value.idx

          // 상세보기
          this.$router.push(
            {name : 'CompanyHistoryDetail',
              query : {
                index : idx
              }
            }
          )


           //alert(value)
        },

        // 분류에 검색 후 검색버튼 클릭 시 이벤트
        btnSearchMenu() {
            console.log('분류 : ',this.select + " / " + '검색 : ', this.searchText)
        },

    

     
    },
}
</script>

<style>

</style>