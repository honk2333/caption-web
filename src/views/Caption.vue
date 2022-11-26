<template>
    <div class="home">
      <div ref="banner" class="banner content-item-block">
        <!-- <div class="video-wrapper">
          <video
            ref="video"
            class="video"
            preload="auto"
            muted
            loop
            playsinline
            autoplay
            src="../video-small.mp4"
            tabindex="-1"
          ></video>
        </div> -->
        <h1 class="banner-title">
           Image Caption 
          <div class="subTitle">南京大学自然语言处理实验室</div>
        </h1>
        <div class="search">
          <input-search @search="searchJobs"></input-search>
        </div>
        <!-- <div class="bottom-tips">
          <span class="arrow-down" @click="scrollDown">
            <i>⤓</i>
          </span>
          <span class="vertical-dashed"></span>
        </div> -->
      </div>
    </div>
  
  </template>
  
  <script>
  // @ is an alias to /src
  import { watchScrollDirection } from "@/helper/utilities.js";
  
  export default {
    name: "caption",
    data() {
      return {
        captionLayerVisible: true,
        search: "",
        captions: [],
      };
    },
    methods: {
      onScrollRightAnimationEnd() {
        this.captionLayerVisible = false;
      },
      scrollDown() {
        this.$refs.captions.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      },
      searchJobs(keyword) {
        this.$router.push({ name: "result", params: { keyword } });
      },
     
    },
    mounted() {
      const rootVm = this.$root;
      rootVm.$emit(
        "home-scrolling",
        { directionX: 1, directionY: -1 },
        { x: document.body.scrollLeft, y: document.body.scrollTop }
      );
      this.unwatch = watchScrollDirection(window, function(...args) {
        rootVm.$emit("home-scrolling", ...args);
      });
    },
    destroyed() {
      this.unwatch();
    }
  };
  </script>
  
  <style lang="less" scoped>
  @keyframes verticalMotion {
    0% {
      transform: translateY(6px);
    }
    50% {
      transform: translateY(-6px);
    }
    100% {
      transform: translateY(6px);
    }
  }
  @keyframes scrollToRight {
    0% {
      left: -100%;
    }
  
    100% {
      left: 100%;
    }
  }
  
  .home {
    .main {
      width: @main-width;
      margin: auto;
    }
    .content-item-block {
      .title {
        font-size: @font-size-larger;
      }
    }
  }
  
  .banner {
    height: 100vh;
    min-height: 400px;
    min-width: @main-width;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // background: rgba(51, 112, 255, 0.2);
    // background: rgb(1, 1, 1);
    // background: #222;
  
    position: relative;
    .video-wrapper {
      font-size: 0;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      overflow: hidden;
      .video {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
    &-title {
      // color: #fff;
      color: rgb(245, 245, 247);
      font-size: 60px;
      text-align: center;
      .subTitle {
        &::after,
        &::before {
          content: "";
          position: absolute;
          background-image: linear-gradient(
            270deg,
            hsla(0, 0%, 100%, 0),
            #fff 47%,
            hsla(0, 0%, 100%, 0)
          );
          height: 2px;
          width:89px;
          top: 50%;
          transform: translateY(-50%);
        }
        &:before {
          right: 10px;
        }
        &:after {
          left: 10px;
        }
        position: relative;
        margin-top: 10px;
        font-size: @font-size-base;
        letter-spacing: 20px;
      }
    }
    .search {
      width: 500px;
      margin-top: 100px;
      margin-bottom: 40px;
    }
    .bottom-tips {
      position: absolute;
      bottom: 30px;
      width: 50px;
      height: 50px;
      flex-shrink: 0;
  
      text-align: center;
      .arrow-down {
        display: block;
        margin-bottom: 4px;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid #fff;
        text-align: center;
        line-height: 40px;
        color: #fff;
        cursor: pointer;
        font-size: 21px;
        i {
          animation: verticalMotion 1.3s infinite linear;
          display: inline-block;
          font-style: normal;
        }
      }o
      // 分割竖线
      .vertical-dashed {
        border-left: 1px dashed #fff;
        height: 30px;
  
        display: inline-block;
      }
    }
  }
  
  </style>
  