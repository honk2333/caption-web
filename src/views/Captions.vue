<template>
  <div class="captions">
    <div ref="banner" class="banner content-item-block">
      <h1 class="banner-title">
        📷 看图说话
      </h1>
      <div class="search">
        <input-search
          :ConfirmLoading="ConfirmLoading"
          @search="generateCaption"
        ></input-search>
      </div>
      <!-- <div class="bottom-tips">
        <span class="arrow-down" @click="scrollDown">
          <i>⤓</i>
        </span>
        <span class="vertical-dashed"></span>
      </div> -->
      <div v-if="results.url" class="result">
        <div align="center">
          <img :src="results.url" class="result-img" width="300" />
        </div>
        <div class="results-caption">
          <nobr>
            <!--            <b> 描述结果 </b>-->
            <li style="float:right;cursor:pointer;" @click="play(results.oppo)">
              朗读 🔊
            </li>
          </nobr>
          <b> 多模态标签融合图像描述模型: &emsp; </b>
          <p>{{ results.oppo }}</p>
          <hr />
          <b> 基线模型: &emsp; </b>
          <p>{{ results.baseline }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { watchScrollDirection } from "@/helper/utilities.js";
import { captionByURL, captionOfOPPO } from "@/helper/api.js";
import Speech from "speak-tts";
import InputSearch from "@/components/Input-Search.vue";
import "@/assets/style/global.css"; // 导入全局样式文件

export default {
  name: "Captions",
  components: { InputSearch },
  props: {},
  data() {
    return {
      search: "",
      results: {},
      speech: null,
      ConfirmLoading: false
    };
  },
  methods: {
    generateCaption(param) {
      this.ConfirmLoading = true;
      // this.$router.push({ name: "result", params: { keyword } });
      if (param instanceof File) {
        const formData = new FormData();
        formData.append("file", param);
        // captionByFile(formData).then(data => {
        //   this.results = data;
        //   this.results.url = 'http://njunlp.club:1024' + data.url;
        //   // console.log(this.results.url);
        // }).catch();
        captionOfOPPO(formData)
          .then(data => {
            this.results = data;
            this.results.url = "http://njunlp.club:80" + data.url;
            this.ConfirmLoading = false;
          })
          .catch();
      } else {
        captionByURL(param)
          .then(data => {
            console.log(data);
            this.results = data;
            this.results.url = "http://njunlp.club:80" + data.url;
            this.ConfirmLoading = false;
          })
          .catch();
      }
    },
    SpeechInit() {
      this.speech = new Speech();
      this.speech.setLanguage("zh-CN");
      this.speech.init().then(() => {});
    },
    //播放函数
    play(textContent) {
      this.speech
        .speak({
          text: textContent, // 播放的文本内容
          listeners: {
            //开始播放
            onstart: () => {
              console.log("Start utterance");
            },
            //判断播放是否完毕
            onend: () => {
              console.log("End utterance");
            },
            //恢复播放
            onresume: () => {
              console.log("Resume utterance");
            }
          }
        })
        .then(() => {
          console.log("读取成功");
        });
    },
    //暂停
    paused() {
      this.speech.pause();
    },
    //从暂停处继续播放
    goahead() {
      this.speech.resume();
    }
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
    this.SpeechInit(); // 需要初始化
  },
  destroyed() {
    this.unwatch();
    this.speech.cancel();
  }
};
</script>

<style lang="less" scoped>

.banner {
  width: 100%;
  height: 100vh;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  //text-align: center;
  justify-content: center;
  align-items: center;
  background: rgb(234, 239, 241);
  // position: relative;

  .banner-title {
    flex: 1; /* 子元素平均分配剩余空间，实现元素布满整个界面 */
    color: #000000b0;
    margin-top: 15%;
    font-size: 45px;
    font-family: STZhongsong, serif;
    font-weight: normal;
  }

  .search {
    flex: 1; /* 子元素平均分配剩余空间，实现元素布满整个界面 */
    width: 80%;
    max-width: 800px;
    min-width: 150px;
    margin-top: 100px;
    margin-bottom: 40px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .result {
    width: 80%;
    max-width: 800px;
    .results-caption {
      margin-top: 20px;
      //width: 90vh;
      //width: 100%;
      font-size: 25px;
      font-family: STZhongsong, serif;
      font-weight: normal;
    }
  }
}
</style>
