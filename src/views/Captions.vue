<template>
  <div class="captions">
    <div ref="banner" class="banner content-item-block">
      <h1 class="banner-title">
        看图说话
      </h1>
      <div class="search">
        <input-search @search="generateCaption"></input-search>
      </div>
      <!-- <div class="bottom-tips">
        <span class="arrow-down" @click="scrollDown">
          <i>⤓</i>
        </span>
        <span class="vertical-dashed"></span>
      </div> -->
      <img :src="results.url" height="300"/>
      <div id="captions">
        <span> {{ results.caption }} </span>
      </div>

    </div>

  </div>
  <!-- <footer>
    <Footer></Footer>
  </footer> -->
</template>

<script>
// @ is an alias to /src
import {watchScrollDirection} from "@/helper/utilities.js";
import {captionByURL, captionByFile} from "@/helper/api.js"

export default {
  name: "captions",
  data() {
    return {
      captionLayerVisible: true,
      search: "",
      // captions: [],
      results: {},
    };
  },
  methods: {
    generateCaption(param) {
      // this.$router.push({ name: "result", params: { keyword } });
      if (param instanceof File) {
        const formData = new FormData();
        formData.append('file', param);
        captionByFile(formData).then(data => {
          this.results = data;
          this.results.url = 'http://njunlp.club:1024' + data.url;
          // console.log(this.results.url);
        })
            .catch();
      } else {
        captionByURL(param).then(data => {
          console.log(data);
          this.results = data;
          this.results.url = 'http://njunlp.club:1024' + data.url;
          // console.log(this.results.url);
          // this.loading = false;
          // loading.close();
        }).catch();
      }
    }
  },
  mounted() {
    const rootVm = this.$root;
    rootVm.$emit(
        "home-scrolling",
        {directionX: 1, directionY: -1},
        {x: document.body.scrollLeft, y: document.body.scrollTop}
    );
    this.unwatch = watchScrollDirection(window, function (...args) {
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

.captions {
  .main {
    width: @main-width;
    margin: auto;
  }

  .conteheadernt-item-block {
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
  background: rgb(234, 239, 241);
  // background: #222;

  position: relative;

  &-title {
    color: #000000b0;
    //   color: rgb(245, 245, 247);
    font-size: 60px;
    text-align: center;
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
    }

    o
      // 分割竖线
    .vertical-dashed {
      border-left: 1px dashed #fff;
      height: 30px;

      display: inline-block;
    }
  }
}

</style>
  