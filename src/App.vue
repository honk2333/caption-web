<template>
  <div id="app">
    <header>
      <meta
        content="width=device-width,user-scalable=no,initial-scale=1.0,  maximum-scale=1.0,minimum-scale=1.0"
        name="viewport"
      />
      <Header
        ref="header"
        :class="{ [animationName]: $route.name === 'home' }"
        :fixedToTop="$route.path === '/home'"
        :theme-color="themeColor"
        @animationstart.native="onAnimationStart"
      ></Header>
    </header>
    <main>
      <transition :name="pageTransitionName" appear>
        <router-view :key="$route.path" ref="main_body"></router-view>
      </transition>
    </main>
    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>
<script>
const themecolor = {
  "/home": "is-transparent",
  "/imagecaption": "captions-color",
  "/sensitive": "sensitive-color",
  "/datasets": "datasets-color"
};
export default {
  name: "App",
  data() {
    return {
      homeScrollY: 0,
      pageTransitionName: "",
      animationName: ""
    };
  },

  computed: {
    themeColor() {
      return themecolor[this.$route.path];
    }
  },
  created() {
    this.$root.$on("home-scrolling", (direction, pos) => {
      this.homeScrollY = pos.y;

      if (direction.directionY === -1) {
        this.animationName = "slideInDown";
      } else {
        this.animationName = "slideOutUp";
      }
    });
  },
  mounted() {
    this.$refs.header.$el.addEventListener("animationend", function(e) {
      if (e.animationName === "slideOutUp") {
        e.target.style.top = "-100%";
      }
    });
  },
  watch: {
    $route(newRoute) {
      this.pageTransitionName = ["result", "home"].includes(newRoute.name)
        ? ""
        : "jumpPage";
    }
  },
  methods: {
    onAnimationStart(e) {
      if (e.animationName === "slideInDown") {
        e.target.style.top = 0;
      }
    }
  }
};
</script>
<style lang="less">
@keyframes slideInDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slideOutUp {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
}

.slideInDown {
  animation: slideInDown 0.4s;
}

.slideOutUp {
  animation: slideOutUp 0.4s;
}

.jumpPage-leave-active {
  display: none;
}

.jumpPage-enter {
  transform: translate3d(0, 80px, 0);
  opacity: 0;
}

.jumpPage-enter-active {
  transition: all 0.3s;
}

#app {
  min-width: 1200px;
  //height: 100vh;
  //box-sizing: border-box;
}

footer {
  margin-top: 0;
}

header {
  position: relative;
  z-index: 1000;
}
</style>
