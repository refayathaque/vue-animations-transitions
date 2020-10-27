<template>
  <div class="container">
    <p><i>same as above but being refactored to use JavaScript</i></p>
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
      @enter-cancelled="enterCancelled"
      @leave-cancelled="leaveCancelled"
    >
      <p v-if="paraIsVisible">This is only sometimes visible...</p>
    </transition>
    <button @click="toggleParagraph">Toggle Paragraph</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paraIsVisible: false,
      enterInterval: null,
      leaveInterval: null,
    };
  },
  methods: {
    toggleParagraph() {
      this.paraIsVisible = !this.paraIsVisible;
    },
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      let round = 1;
      this.enterInterval = setInterval(() => {
        el.style.opacity = round * 0.01;
        round++;
        if (round > 100) {
          clearInterval(this.enterInterval);
          done();
        }
      }, 20);
    },
    beforeLeave(el) {
      el.style.opacity = 1;
    },
    leave(el, done) {
      let round = 100;
      this.leaveInterval = setInterval(() => {
        el.style.opacity = round * 0.01;
        round--;
        if (round < 0) {
          clearInterval(this.leaveInterval);
          done();
        }
      }, 20);
    },
    enterCancelled() {
      clearInterval(this.enterInterval)
    },
    leaveCancelled() {
      clearInterval(this.leaveInterval)
    },
  },
};
</script>
