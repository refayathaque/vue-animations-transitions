<template>
  <div class="container">
    <transition-group tag="ul" name="user-list">
      <li v-for="user in users" :key="user" @click="removeUser(user)">{{ user }}</li>
    </transition-group>
    <div>
      <input v-model="enteredUser" type="text" />
      <button @click="addUser">Add User</button>
    </div>
  </div>  
</template>

<script>
export default {
  data() {
    return {
      users: ['Hello', 'World', 'Vue.js', 'Better', 'Than', 'React.js?'],
      enteredUser: ''
    }
  },
  methods: {
    addUser() {
      this.users.unshift(this.enteredUser)
    },
    removeUser(user) {
      this.users = this.users.filter(usr => usr !== user);
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  border: 1px solid #ccc;
  padding: 1rem;
  text-align: center;
}
.user-list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.user-list-enter-active {
  transition: all 1s ease-out;
}
.user-list-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.user-list-leave-active {
  animation: leaves-to-the-right 1s ease-in;
  position: absolute;
}
@keyframes leaves-to-the-right {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(30px);
  }
}
.user-list-move {
  transition: transform 1s ease;
}
</style>