<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
      @click:row="click"
      @current-items="getCurrentItems"

    ></v-data-table>
    <div class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="pageCount"
      ></v-pagination>
      <v-text-field
        :value="itemsPerPage"
        label="Items per page"
        type="number"
        min="-1"
        max="15"
        @input="itemsPerPage = parseInt($event, 10)"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
  export default {
      props : {
        propsdata: {
            type : Object
        }
    },
    data () {
      return {
        page: null,
        pageCount: 0,
        itemsPerPage: 7,
        headers: [
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
        ],
        desserts: [],
      }
    },

    created() {
      // 처음 페이지 로드 시
      
            

            
    },

    computed : {
      ...mapState(["boardCurrentPageNum"]),
    },

    methods : {

      // 상세보기
      click(value){
          console.log(value)

          this.$store.commit('currentBoardPageNum', this.page) 
          console.log('currentPageNum : ', this.boardCurrentPageNum);

          // 상세보기
                this.$router.push(
                     {name : "NoticeDetail",
                         params : {
                             page : this.page
                         }
                     }
                 ) 

      },

      getCurrentItems(value){
        console.log('현재 페이지 아이템 : ', value)
         console.log('현재 페이지 번호 : ', this.page)
          
      }
    },

    mounted(){
            console.log('BoardList_mounted', + this.propsdata)
            
            if(this.$route.params.page != null){
              this.page = this.$route.params.page
            }else {
              this.page = this.boardCurrentPageNum
            }


            //this.page = this.boardCurrentPageNum
           
            console.log('pageNum : ', this.page)
            console.log('propss.subject : ', this.propsdata.subject)
            console.log('propss.pageNum : ', this.propsdata.pageNum)
            console.log('boardCurrentPageNum : ', this.boardCurrentPageNum)
            console.log('boardCurrentList : ', this.boardCurrentList)
            console.log(':page.sync : ', )


            this.desserts = [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ]

        console.log('desserts : ', this.desserts)
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