<template>
  <div>

  </div>
</template>

<script>
export default {

    created(){
        console.log('resData : ', this.$route.params.idx)
        var storage = localStorage;

        //storage.setItem('boardName', this.$route.params.idx)

        console.log(storage)
        
    }
}
</script>

<style>

</style>