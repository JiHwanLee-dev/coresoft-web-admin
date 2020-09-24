<template>
  <div class="about">
    <h1>This is an about page</h1>

    <table>
      <tr :key = index v-for="(value,index) in data">
         <td> {{ value.writer}} a</td>
      </tr>
    </table>
    <br>
    <hr>
    <br>
    <p> message : {{ msg }}</p>

    <table>
      <tr :key = index v-for="(value,index) in data2">
         <td> {{ value.title}} a</td>
      </tr>
    </table>
  </div>
</template>

<script>
//import sql from '@/mssql'
//const sql = require('mssql')
//import DB from '@/DB'
import data from '../data/index'
import axios from 'axios'
//var data = require('../data/index');


export default{
  data(){
    return {
      //asd : data
      data: data,
      msg : '',
      data2 : ''
    }
  },

  async created(){
    console.log(this.data)
    
    //const data2 = await axios.get('/api/hello')
    //const data2 = await axios.get('http://api.coresoft.co.kr/api/v1/notice?p=1&rpp=10&t&q') // 공지사항 전체 목록
    const data2 = await axios.get('http://api.coresoft.co.kr/api/v1/companyhistory?p=1&rpp=10&t&q')  // 회사연혁 전체보기
    .then(res => {
      console.log('res : ', res)
      console.log(res.data.message)
      this.msg = res.data.message
      this.data2 = res.data.items
      console.log(res.data.items)
      console.log(res.data.title)
    })
    .catch(err => {
      console.log('err : ', err)
    })
    
    
  }
}
</script>

<style lang="stylus" scoped>

</style>