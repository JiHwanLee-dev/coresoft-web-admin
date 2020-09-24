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
        { text: '등록일',  sortable: false, value: 'rgst_Dt' },
      
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
    
      searchMenu: [
            '제목', '글쓴이'
     ]
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
    
      const data2 = await axios.get('http://api.coresoft.co.kr/api/v1/notice?p=1&rpp=18&t&q') // 공지사항 전체 목록
      //const data2 = await axios.get('http://api.coresoft.co.kr/api/v1/companyhistory?p=1&rpp=10&t&q')  // 회사연혁 전체보기
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
            {name : 'NoticeDetail',
              query : {
                index : idx
              }
            }
          )

           
        },
        searchText(){

        },
        
      initialize () {
        // this.desserts = [
        //   {
        //     name: 'Frozen Yogurt',
        //     calories: 159,
        //     fat: 6.0,
        //     carbs: 24,
        //     protein: 4.0,
        //   },
        //   {
        //     name: 'Ice cream sandwich',
        //     calories: 237,
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
        // ]
      },

 
    },
}
</script>

<style>

</style>