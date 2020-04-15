<template>
  <div class="selectBarDivPhone mb-4" align="center"><br>
    <div class="selectPhone" style="width': '30px';cursor: pointer;" @click="sendSelectType ('')"> all</div>
    <img class="selectPhone" :style="[selectType=='camera' ? { 'margin-bottom': '15px' } : { 'margin-bottom': '0px' }]" @click="sendSelectType ('camera')" src="../assets/icons/camera.png" alt="">
    <img class="selectPhone" :style="[selectType=='watch' ? { 'margin-bottom': '15px' } : { 'margin-bottom': '0px' }]" @click="sendSelectType ('watch')" src="../assets/icons/watch.png" alt="">
    <img class="selectPhone" :style="[selectType=='bag' ? { 'margin-bottom': '15px' } : { 'margin-bottom': '0px' }]" @click="sendSelectType ('bag')" src="../assets/icons/bag.png" alt="">
    <img class="selectPhone" :style="[selectType=='book' ? { 'margin-bottom': '15px' } : { 'margin-bottom': '0px' }]" @click="sendSelectType ('book')" src="../assets/icons/book.png" alt="">
    <img class="selectPhone" :style="[selectType=='bicycle' ? { 'margin-bottom': '15px' } : { 'margin-bottom': '0px' }]" @click="sendSelectType ('bicycle')" src="../assets/icons/bike.png" alt="">
    <img class="selectPhone" :style="[selectType=='motorcycle' ? { 'margin-bottom': '15px' } : { 'margin-bottom': '0px' }]" @click="sendSelectType ('motorcycle')" src="../assets/icons/motorcycle.png" alt="">
    <img class="selectPhone" :style="[selectType=='car' ? { 'margin-bottom': '15px' } : { 'margin-bottom': '0px' }]" @click="sendSelectType ('car')" src="../assets/icons/car.png" alt="">
    <img class="selectPhone" :style="[selectType=='land' ? { 'margin-bottom': '15px' } : { 'margin-bottom': '0px' }]" @click="sendSelectType ('land')" src="../assets/icons/land.png" alt="">
    <img class="selectPhone" :style="[selectType=='house' ? { 'margin-bottom': '15px' } : { 'margin-bottom': '0px' }]" @click="sendSelectType ('house')" src="../assets/icons/home.png" alt="">
    <img class="selectPhone" :style="[selectType=='condominium' ? { 'margin-bottom': '15px' } : { 'margin-bottom': '0px' }]" @click="sendSelectType ('condominium')" src="../assets/icons/condominium.png" alt="">
    <img class="selectPhone" :style="[selectType=='apartment' ? { 'margin-bottom': '15px' } : { 'margin-bottom': '0px' }]" @click="sendSelectType ('apartment')" src="../assets/icons/apartment.png" alt="">
    <div class="selectPhone m-3"  style="width: 30px;cursor: pointer;" @click="sendSelectType ('other')">others</div>
  </div>
</template>

<script>
export default {
  props: ['selectType'],
  methods: {
    sendSelectType (type) {
      this.$emit('clicked', type)
    }
  }
}
</script>

<style>
@media only screen and (max-width: 500px) {
  .seletbar{
    width: 30px;
    padding-left: 15px !important;
    padding-right: 43px !important;
  }
  .seletbar:before {
    width: 30px;
    padding-left: 0px;
  }
  .selectBarDiv{
    display: none;
  }
  .profileDiv{
    display: none;
  }
  .selectBarDivPhone{
    display: block;
  }
  .selectBarDivPhone {
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2);
    z-index: 1;
    background: inherit;
    overflow: hidden;
    border-radius: 20px;
  }
  .selectBarDivPhone:before {
    content: "";
    background: inherit;
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
    filter: blur(10px);
    border-radius: 20px;
  }
  .selectPhone{
    width: 25px;
    cursor: pointer;
    transition: all .2s ease-in-out;
    font-size: 13px;
    margin:10px;
  }
  .selectPhone:hover {
    transform: scale(1.4);
  }
}
</style>