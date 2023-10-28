<template>
  <div :class="[{ fixedToTop }, themeColor]" class="header">
    <div v-if="isShow" class="logo">
      <a href="/">
        <logo></logo>
      </a>
    </div>
    <ul class="navbar" >
      <router-link v-slot="{ href, navigate, isActive }" exact to="/home">
        <li :class="{ active: isActive }" class="navbar-item">
          <a :href="href" @click="navigate">主页</a>
        </li>
      </router-link>
      <router-link v-slot="{ href, navigate, isActive }" exact to="/imagecaption">
        <li :class="{ active: isActive }" class="navbar-item">
          <a :href="href" @click="navigate">图像描述</a>
        </li>
      </router-link>
      <router-link v-slot="{ href, navigate, isActive }" to="/datasets">
        <li :class="{ active: isActive }" class="navbar-item">
          <a :href="href" @click="navigate">数据集</a>
        </li>
      </router-link>
      <router-link to="/sensitive" v-slot="{ href, navigate, isActive }">
        <li class="navbar-item" :class="{ active: isActive }">
          <a :href="href" @click="navigate">图片敏感文本检测</a>
        </li>
      </router-link>
      <li class="navbar-item">
        <a href="" target="_blank">Litermate</a>
      </li>
      <router-link v-slot="{ href, navigate, isActive }" to="/ours">
        <li :class="{ active: isActive }" class="navbar-item">
          <a :href="href" @click="navigate">关于</a>
        </li>
      </router-link>
    </ul>
    <!--    <div class="ours">-->
    <!--      <router-link to="ours">-->
    <!--        <span class="login__text">关于</span>-->
    <!--      </router-link>-->
    <!--    </div>-->
    <!--    <div class="github-project">-->
    <!--      <a-->
    <!--        href="https://github.com/konglingwen94/vue-bytedanceJob"-->
    <!--        target="_blank"-->
    <!--        aria-label="View source on Github"-->
    <!--        class="github-corner github-corner"-->
    <!--      >-->
    <!--        <svg-->
    <!--          data-v-09fe1acc-->
    <!--          width="80"-->
    <!--          height="80"-->
    <!--          viewBox="0 0 250 250"-->
    <!--          aria-hidden="true"-->
    <!--          style="fill: rgb(64, 201, 198); color: rgb(255, 255, 255);"-->
    <!--        >-->
    <!--          <path data-v-09fe1acc d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />-->
    <!--          <path-->
    <!--            data-v-09fe1acc-->
    <!--            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"-->
    <!--            fill="currentColor"-->
    <!--            class="octo-arm"-->
    <!--            style="transform-origin: 130px 106px 0px;"-->
    <!--          />-->
    <!--          <path-->
    <!--            data-v-09fe1acc-->
    <!--            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"-->
    <!--            fill="currentColor"-->
    <!--            class="octo-body"-->
    <!--          />-->
    <!--        </svg>-->
    <!--      </a>-->
    <!--    </div>-->
  </div>
</template>


<script>
export default {
  name: "Header",
  props: {
    fixedToTop: {
      type: Boolean,
      default: false
    },
    themeColor: {
      type: String,
      default: "main-color"
    },
  },
  data() {
    return {
      isShow: true,
      fullWidth: 0,
    };
  },
  created() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize(event) {
      this.fullWidth = document.documentElement.clientWidth;
      // 页面宽度小于750px时，不显示地图
      if (this.fullWidth < 700) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  // color:rgba(255, 255, 255, 0.8);

  display: flex;
  height: 60px;
  align-items: center;
  padding: 10px;
  //min-width: 100px;
  //max-height: 100px;
  font-family: STZhongsong, serif;
  position: fixed;
  width: 100%;


  &.fixedToTop {
    position: fixed;
    width: 100%;
  }

  &.main-color {
    //background-color:  rgb(234, 239, 241);
    .navbar-item {
      &:hover {
        color: @main-color;
      }
    }

    .active {
      color: @main-color;
    }
  }

  &.captions-color {
    background-color: #EAEFF1;

    .navbar-item {
      &:hover {
        color: @main-color;
      }
    }

    .active {
      color: @main-color;
    }
  }

  &.sensitive-color {
    background-color: white;

    .navbar-item {
      &:hover {
        color: @main-color;
      }
    }

    .active {
      color: @main-color;
    }
  }

  &.datasets-color {
    background-color: white;

    .navbar-item {
      &:hover {
        color: @main-color;
      }
    }

    .active {
      color: @main-color;
    }
  }

  &.is-transparent {
    color: #fff;
    // color: rgba(255, 255, 255, 0.2);
    .navbar-item {
      &:hover {
        color: #ccc;
        // color: rgba(255, 255, 255, 0.2);
      }
    }

    .active {
      color: #fff;
      // color: rgba(255, 255, 255, 0.2);
    }
  }
}
  .navbar {
    margin-left: auto;
    margin-right: 20px;
    //hight: 80px;
    display: flex;
    //float: right;
    //width: 100%;
    //position: relative;


    &-item {
      padding: 4px 0px;
      margin: 0 20px;
      //height: ;
      //width: ;
      &.active {
        border-bottom: 2px solid;
        color: @main-color;
      }
    }
  }
  //.logo {
    //width: 200px;
    //height: 70px;
    // a {
    //   height: 80%;
    //   display: block;
    // }
  //}





// .user {
//   margin-left: 40px;
//   position: relative;

//   .arrow {
//     display: inline-block;
//     border: 1px solid;
//     border-width: 1px 1px 0 0;
//     transform: rotate(135deg);
//     transform-origin: center;
//     vertical-align: 5px;
//     margin-left: 5px;
//     transition: all 0.3s;
//     width: 10px;
//     height: 10px;
//   }
//   &:hover {
//     .arrow {
//       transform: rotate(-45deg);
//       vertical-align: -3px;
//     }
//     .dropdown-menu__wrapper {
//       display: block;
//     }
//   }
//   .dropdown-menu {
//     position: relative;
//     z-index: 1000;
//     &__email {
//       line-height: 2;
//       cursor: pointer;
//     }
//     &__wrapper {
//       position: absolute;
//       display: none;
//       right: 0;
//       color: @regular-text-color;
//       padding: 9px 0;
//       width: 200px;
//       border-radius: 5px;
//       box-shadow: 0 0px 2px 1px #eee;
//       background: #fff;
//     }
//     &__item {
//       padding: 9px 12px;
//       cursor: pointer;
//       &:hover {
//         background: #efefef58;
//       }
//     }
//   }
// }
//.github-project {
//  position: absolute;
//  right: 0;
//  top: 0;
//}
</style>
