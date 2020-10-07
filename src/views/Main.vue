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
                to="/notice">Login</v-btn>

                 <v-btn color="primary"
                @click="getLogin">Login(post)</v-btn>
            
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
      // 서버통신으로 notice 특정 데이터를 불러옴

        localStorage.setItem('LoginStatus', this.user)
        
     
      axios.post(`http://localhost:4000/login_process/${jsonData}`, {
          //email : 'fred',
          //password : 'friend'
      })
      .then(res => {
            console.log('res_notice_datas : ', res)
            //console.log('items : ', res.data.recordset)
            //this.desserts = res.data.recordset;
            // console.log(res.data.rowsAffected)

            // 로그인 결과
            var response = res.data

            var userInfo = res.data.recordset
            console.log('userInfo : ', userInfo)
            
           

            if(response == 'failed'){
                 alert('로그인 실패')
                this.$store.commit('loginError')

            }else {
                 alert('로그인 성공')
                this.$store.commit('loginSuccess', userInfo)
                      
                // 공지사랑 전체목록
                this.$router.push(
                  {name : 'Notice'}
                )
            }
        }).catch(err => {
            console.log('err : ', err)
        })

    }
  }



}
</script>

<style>

</style>