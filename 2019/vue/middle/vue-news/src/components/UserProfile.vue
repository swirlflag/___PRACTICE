<template>

  <div class="user-container">
    <!-- 유저 아이콘 -->
    <div><i class="fas fa-user"></i></div>

    <div class="user-decription">
      
      <slot name="username">
        <!-- {{ 상위컴포넌트에서 정의할 영역 : 유저 이름 }} -->  
      </slot>

      <div class="time">
        <slot name="time">
          <!-- {{ 상위컴포넌트에서 정의할 영역 : 작성 시간 }} -->  
        </slot>
      </div>

      <slot name="karma">
        <!-- {{ 상위컴포넌트에서 정의할 영역 : 활동점수 }} -->  
      </slot>
      
    </div>
    
  </div>

</template>

<script>

export default {

};

</script>

<style scoped>
.user-container{
  display: flex;
  align-items: center;
  padding: 0.5rem;
}
.fa-user{
  font-size: 2.5rem;
}
.user-decription{
  padding-left: 8px;
}
.time{
  font-size: 0.7rem;
}
</style>
