<template>
  <router-view v-slot="slotProps">
    <transition name="fade-button" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
  <!-- ^ what we need to animate switches between components with routes -->
  <div class="container">
    <div class="block" :class="{ animate: animatedBlock }"></div>
    <button @click="animateBlock">Animate</button>
  </div>
  <base-modal @close="hideDialog" :open="dialogIsVisible">
    <p>This is a test dialog!</p>
    <button @click="hideDialog">Close it!</button>
  </base-modal>
  <div class="container">
    <button @click="showDialog">Show Dialog</button>
  </div>
  <div class="container">
    <transition
      name="para"
      @before-enter="paraTransitionBeforeEnter"
      @before-leave="paraTransitionBeforeLeave"
    >
      <!-- vue transition tags can only have ONE direct child element -->
      <p v-if="paraIsVisible">This is only sometimes visible...</p>
    </transition>
    <button @click="toggleParagraph">Toggle Paragraph</button>
  </div>
  <div class="container">
    <transition name="fade-button" mode="out-in">
      <!-- vue transition tags can only have ONE direct child element, UNLESS, you guarantee that ONLY one is added to the real DOM at any time, important to use `else` directive to achieve this -->
      <button @click="showUsers" v-if="!usersAreVisible">Show Users</button>
      <button @click="hideUsers" v-else>Hide Users</button>
    </transition>
  </div>
  <div class="container">
    <transition enter-to-class="" enter-active-class="">
      <p>test</p>
    </transition>
  </div>
  <js-transitions></js-transitions>
  <animated-list></animated-list>
</template>

<script>
export default {
  data() {
    return {
      dialogIsVisible: false,
      animatedBlock: false,
      paraIsVisible: false,
      usersAreVisible: false,
    };
  },
  methods: {
    paraTransitionBeforeEnter(el) {
      console.log("transition event - para before enter");
      console.log(el);
    },
    paraTransitionBeforeLeave(el) {
      console.log("transition event - para before leave");
      console.log(el);
    },
    showUsers() {
      this.usersAreVisible = true;
    },
    hideUsers() {
      this.usersAreVisible = false;
    },
    showDialog() {
      this.dialogIsVisible = true;
    },
    hideDialog() {
      this.dialogIsVisible = false;
    },
    animateBlock() {
      this.animatedBlock = true;
    },
    toggleParagraph() {
      this.paraIsVisible = !this.paraIsVisible;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  font-family: sans-serif;
}
body {
  margin: 0;
}
button {
  font: inherit;
  padding: 0.5rem 2rem;
  border: 1px solid #810032;
  border-radius: 30px;
  background-color: #810032;
  color: white;
  cursor: pointer;
}
button:hover,
button:active {
  background-color: #a80b48;
  border-color: #a80b48;
}
.container {
  max-width: 40rem;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  border: 2px solid #ccc;
  border-radius: 12px;
}
.animate {
  /* transform: translateX(-150px); */
  /* ^ combined with transition CSS property in `block` class below */
  animation: slide-scale 1s ease-out forwards;
  /* with ^ pattern you just reference animation properties defined in `@keyframes`, preferred over what's above and its corresponding transition property within `.block` class below */
}
.block {
  width: 8rem;
  height: 8rem;
  background-color: #290033;
  margin-bottom: 2rem;
  /* transition: transform 1s ease-out; */
  /* ^ creates a smooth flow of the purple box to the left */
}
@keyframes slide-scale {
  0% {
    transform: translateX(0) scale(1);
  }
  70% {
    transform: translateX(-120px) scale(1.1);
  }
  100% {
    transform: translateX(-150px) scale(1);
  }
}
/* prefixes of these vue classes need not be e.g., `v-enter-from`, 'v' can be supplanted with a unique prefix that corresponds to the `name` attribute in the <transition></transition> tag */
/* if you have completely custom classes then you need to use special <transition></transition> tag attributes, look at line 20 (https://v3.vuejs.org/guide/transitions-enterleave.html#custom-transition-classes) */
.para-enter-from {
  /* opacity: 0;
  transform: translateY(-30px); */
}
.para-enter-active {
  animation: drops-down-with-blur 1s ease-out;
  /* similar to whats explained on line 85, but we don't need `forwards` here for it to stay at the end state, you don't also need the vue classes above and below when using this pattern because the 'to' and 'from' stages of the animation are captured in the `@keyframes` */
}
.para-enter-to {
  /* opacity: 1;
  transform: translateY(0); */
}
@keyframes drops-down-with-blur {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.para-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.para-leave-active {
  transition: all 1s ease-in;
}
.para-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.fade-button-enter-from,
.fade-button-leave-to {
  opacity: 0;
}
.fade-button-enter-active {
  transition: opacity 0.3s ease-out;
}
.fade-button-leave-active {
  transition: opacity 0.3s ease-in;
}
.fade-button-enter-to,
.fade-button-leave-from {
  opacity: 1;
}
</style>
