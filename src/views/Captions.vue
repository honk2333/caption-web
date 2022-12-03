<template>
  <div class="captions">
    <div ref="banner" class="banner content-item-block">
      <h1 class="banner-title">
        📷 看图说话
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
      <div v-if="results.caption" class="results">
        <img :src="results.url" height="300" style="float: left"/>
        <div class="results-caption">
          <nobr>
            <b> 多语言 </b>
            <li @click="play(results.caption)" style="float:right;cursor:pointer;" > 朗读 🔊</li>
          </nobr>
          <p> 英文: {{ results.caption }} </p>
          <p> 中文： </p>
          <hr>
          <b> 多风格 </b>
          <p> 积极: </p>
          <p> 中立: </p>
          <p> 消极: </p>
        </div>
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
import {captionByFile, captionByURL} from "@/helper/api.js"
import Speech from 'speak-tts'

export default {
  name: "captions",
  props: {},
  data() {
    return {
      captionLayerVisible: true,
      search: "",
      results: {},
      showresults: false,
      // themecolor: "rgb(234, 239, 241)",
      speech: null,
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
          // console.log(this.results.url);surface pc
          // this.loading = false;
          // loading.close();
        }).catch();
      }
    },
    SpeechInit() {
      this.speech = new Speech()
      this.speech.setLanguage('zh-CN')
      this.speech.init().then(() => {
      })
    },
    //播放函数
    play(textContent) {
      this.speech.speak({
        text: textContent,// 播放的文本内容
        listeners: {
          //开始播放
          onstart: () => {
            console.log("Start utterance")
          },
          //判断播放是否完毕
          onend: () => {
            console.log("End utterance")
          },
          //恢复播放
          onresume: () => {
            console.log("Resume utterance")
          },
        },
      }).then(() => {
        console.log("读取成功")
      })
    },
    //暂停
    paused() {
      this.speech.pause();
    },
    //从暂停处继续播放
    goahead() {
      this.speech.resume();
    },
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
    this.SpeechInit() // 需要初始化
  },
  destroyed() {
    this.unwatch();
    this.speech.cancel();
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

//.captions {
//  .main {
//    width: @main-width;
//    margin: auto;
//  }
//
//  .conteheadernt-item-block {
//    .title {
//      font-size: @font-size-larger;
//    }
//  }
//}

.banner {
  height: 100vh;
  width: 100%;

  //min-height: 400px;
  //min-width: @main-width;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background: rgba(51, 112, 255, 0.2);
  background: rgb(234, 239, 241);
  // background: #222;
  //padding-top: 120px;
  position: absolute;
  box-sizing: border-box;


  &-title {
    color: #000000b0;
    //   color: rgb(245, 245, 247);
    font-size: 45px;
    font-family: STZhongsong, serif;
    font-weight: normal;
    //align-items: center;text-align
  }

  .search {
    width: 60%;
    min-width: 100px;
    margin-top: 100px;
    margin-bottom: 40px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

  }

  .results-caption {
    width: 90vh;
    font-size: 25px;
    font-family: STZhongsong, serif;
    font-weight: normal;
    float: left;
  }

  img {
    margin-right: 10vh;
  }

  //.bottom-tips {
  //  position: absolute;
  //  bottom: 30px;
  //  width: 50px;
  //  height: 50px;
  //  flex-shrink: 0;
  //
  //  text-align: center;
  //
  //  .arrow-down {
  //    display: block;
  //    margin-bottom: 4px;
  //    width: 100%;
  //    height: 100%;
  //    border-radius: 50%;
  //    border: 1px solid #fff;
  //    text-align: center;
  //    line-height: 40px;
  //    color: #fff;
  //    cursor: pointer;
  //    font-size: 21px;
  //
  //    i {
  //      animation: verticalMotion 1.3s infinite linear;
  //      display: inline-block;
  //      font-style: normal;
  //    }
  //  }
  //
  //    // 分割竖线
  //  .vertical-dashed {
  //    border-left: 1px dashed #fff;
  //    height: 30px;
  //
  //    display: inline-block;
  //  }
  //}
}

</style>
  