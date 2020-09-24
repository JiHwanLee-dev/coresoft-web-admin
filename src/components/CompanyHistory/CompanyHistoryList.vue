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
        { text: '연혁일자', value: 'year',  sortable: false, align: 'start'},
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

      this.initialize()
      console.log(this.data)
      
      //const data2 = await axios.get('/api/hello')
      //const data2 = await axios.get('http://api.coresoft.co.kr/api/v1/notice?p=1&rpp=10&t&q') // 공지사항 전체 목록
      const data2 = await axios.get('http://api.coresoft.co.kr/api/v1/companyhistory?p=1&rpp=24&t&q')  // 회사연혁 전체보기
      //const data2 = await axios.get('http://api.coresoft.co.kr/api/v1/archievements?p=1&rpp=87&t&q')  // 국내외 개발실적 전체보기
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

      initialize () {
        // this.desserts = [
        //   {
        //     name: 'Frozen Yogurt',
        //     calories: 'dddddddddddddddddddddddddddda',
        //     fat: 6.0,
        //     carbs: 24,
        //     protein: 4.0,
        //   },
        //   {
        //     name: 'Ice cream sandwich',
        //     calories: 'adsdadsad',
        //     fat: 9.0,
        //     carbs: 37,
        //     protein: 4.3,
        //   },
        //   {
        //     name: 'Eclair',
        //     calories: 262,
        //     fat: 16.0,
        //     carbs: 23,
        //     protein: 6.0,
        //   },
        //   {
        //     name: 'Cupcake',
        //     calories: 305,
        //     fat: 3.7,
        //     carbs: 67,
        //     protein: 4.3,
        //   },
        //   {
        //     name: 'Gingerbread',
        //     calories: 356,
        //     fat: 16.0,
        //     carbs: 49,
        //     protein: 3.9,
        //   },
        //   {
        //     name: 'Jelly bean',
        //     calories: 375,
        //     fat: 0.0,
        //     carbs: 94,
        //     protein: 0.0,
        //   },
        //   {
        //     name: 'Lollipop',
        //     calories: 392,
        //     fat: 0.2,
        //     carbs: 98,
        //     protein: 0,
        //   },
        //   {
        //     name: 'Honeycomb',
        //     calories: 408,
        //     fat: 3.2,
        //     carbs: 87,
        //     protein: 6.5,
        //   },
        //   {
        //     name: 'Donut',
        //     calories: 452,
        //     fat: 25.0,
        //     carbs: 51,
        //     protein: 4.9,
        //   },
        //   {
        //     name: 'KitKat',
        //     calories: 518,
        //     fat: 26.0,
        //     carbs: 65,
        //     protein: 7,
        //   },
        //   {
        //     name: 'KitKat',
        //     calories: 518,
        //     fat: 26.0,
        //     carbs: 65,
        //     protein: 7,
        //   },
        // ]
      },

     
    },
}
</script>

<style>

</style>