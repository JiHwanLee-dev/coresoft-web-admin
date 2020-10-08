<template>
    <div >
         <v-data-table          
            :headers="headers"
            :items="desserts"
            class="elevation-1"
            hide-default-footer 
            fixed-header
            @click:row="click"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            :search="searchText"
            @page-count="pageCount = $event"
        >
            <template v-slot:top>
            <v-toolbar flat color="white"
            style="margin-bottom:30px;">
                <v-toolbar-title>국내외 개발실적</v-toolbar-title>
                <v-divider
                class="mx-4"
                inset
                vertical
                ></v-divider>
                <v-spacer></v-spacer>

            <!-- <v-col class="d-flex" cols="6" sm="2"
            style="margin-top:40px;">
                <v-select
                :items="searchMenu"
                label="분류"
                v-model="select"
                ></v-select>
            </v-col> -->

            <v-col sm="6" cols="2"
            style="margin-top:40px;">
                <v-text-field
                label="검색"
                v-model="searchText"
                append-icon="mdi-magnify"
                ></v-text-field>

            </v-col>

                <!-- <v-btn
                style="margin-top:40px;"
                    color="primary"
                    dark
                    class="mb-2"
                    @click="btnSearchMenu"
                    
                >검색</v-btn> -->
            
                
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

        <!-- <v-flex>
                <router-view></router-view>
            </v-flex> -->
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
    
     page: 1,
     pageCount: 0,
     itemsPerPage: 10,
    
    select : null,
    searchText : null,
    test : [
        {sub : 'aa',
        cont : 'bb'},
        {sub : 'cc',
        cont : 'dd'}
    ],
    adas :null
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

    console.log(this.data)
    
    /*
    const data2 = await axios.get('http://api.coresoft.co.kr/api/v1/archievements?p=1&rpp=87&t&q')  // 국내외 개발실적 전체보기
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
     const noticeData = await axios.get('http://localhost:4000/archievement')
      .then(res => {
          console.log('res_archievement_datas : ', res)
          //console.log('items : ', res.data.recordset)
          this.desserts = res.data.recordset;
      }).catch(err => {
          console.log('err : ', err)
      })

    
    
  },


    methods: {
        click(value){
          console.log('등록번호 : ', value.idx)

          for(var key in value){
            console.log(this.desserts.indexOf(value))
            console.log(this.desserts.idx)
            console.log("value : " + value[key])
          }

          var idx = value.idx
        

          console.log('page : ', this.page)

          this.$emit("child", "showDetail");


          // 상세보기
          this.$router.push(
            {name : 'ArchievementDetail',
              query : {
                index : idx
              }
            }
          )



          console.log(value.indexOf)
           //alert(value)
        },

        // 분류에 검색 후 검색버튼 클릭 시 이벤트
        btnSearchMenu() {
            console.log('분류 : ',this.select + " / " + '검색 : ', this.searchText)
        },

        // 글 작성
        register(){
          this.$router.push(
            {
              name : 'Register',
              params : {
                subject : 'archievement'
              }
            }
          )
        }

     
    },
}
</script>

<style>

</style>