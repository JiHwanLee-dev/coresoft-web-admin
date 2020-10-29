<!-- 로그인 화면 -->

<template>
   <v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
                
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="user.email"
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    v-model="user.password"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                
                 <v-btn color="primary"
                @click="getLogin">Login</v-btn>
            
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from "vuex"
var qs = require('querystring')

export default {
  data() {
    return {
      user: {
        email : null,
        password : null
      }
    }
  },

  methods : {
    // 로그인 버튼 클릭
    getLogin() {
        console.log('user: ',this.user)

        const jsonData = JSON.stringify(this.user)
        console.log('json : ', jsonData)


    /*

      // 로그인 확인
      axios.post(`http://localhost:4000/login_process/${jsonData}`, {

      })
      .then(res => {
            console.log('res_login_datas : ', res)
            //console.log('items : ', res.data.recordset)
            //this.desserts = res.data.recordset;
            // console.log(res.data.rowsAffected)

            // 로그인 결과
            var response = res.data

            // 유저정보 저장(admin_id, name)
            var userInfo = res.data.recordset
            console.log('userInfo : ', userInfo)
            

            if(response == 'failed'){
                 alert('아이디나 비밀번호가 틀렸습니다. ')
                this.$store.commit('loginError')

            }else {
                 //alert('로그인 성공')
                this.$store.commit('loginSuccess', userInfo)   // store.index.js 파일의 mutations의 loginSuccess함수 호출 , 두번째 인자는 loginSuccess함수에 전달하는 값
                      
                // 공지사랑 전체목록으로
                this.$router.push(
                  {
                    name : 'Notice'
                  }
                )
            }
        }).catch(err => {
            console.log('err : ', err)
        })

    */

   
    //  axios.post('http://api.coresoft.co.kr/api/v1/auth', {
    //  //axios.post('http://localhost:4000/login_process', {
    //     //email : this.user.email,
    //     //passwd : this.user.password,
    //     jsonData,
    //     headers: config

      // 밑에 방식으로 해야지 동작이 됨;;

        axios({
          url: "http://api.coresoft.co.kr/api/v1/auth",
          method: "post",
          data: jsonData,
          headers: {
            'content-type': 'application/json',            
          }
       
    }).then(res => {
        console.log('res_login_datas : ', res)
        
            // 로그인 결과
            var response = res.data

            // 유저정보 저장(admin_id, name)
            var userInfo = res.data.recordset
            console.log('userInfo : ', userInfo)
            console.log('response : ', response.ok)

            if(response.ok == false){
                 alert('아이디나 비밀번호가 틀렸습니다. ')
                this.$store.commit('loginError')

            }else {
                 //alert('로그인 성공')
                //this.$store.commit('loginSuccess', userInfo)   // store.index.js 파일의 mutations의 loginSuccess함수 호출 , 두번째 인자는 loginSuccess함수에 전달하는 값
                this.$store.commit('loginSuccess', this.user.email)   // store.index.js 파일의 mutations의 loginSuccess함수 호출 , 두번째 인자는 loginSuccess함수에 전달하는 값
                      
                // 공지사항 전체목록으로
                this.$router.push(
                  {
                    name : 'Notice'
                  }
                )
            }
    })
    
    .catch(function (err){
      console.log('err : ', err)
    })






    }
  }



}
</script>

<style>

</style>