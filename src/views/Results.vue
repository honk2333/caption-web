<template>
  <div class="result">
    <ul class="result-fullpage-indicator">
      <li v-for="(item, index) in results" :key="item.id" class="result-fullpage-indicator-item"
        :class="{ active: activeIndex === index }" @click="activeIndex = index">
        <img :src="item.logo" alt />
      </li>
    </ul>
    <transition :duration="duration" :name="transitionName">
      <!-- ... the buttons ... -->
      <div :key="activeIndex" class="view-wrapper" v-if="!loading" :style="`backgroundImage:url(${item.cover})`">
        <div class="content">
          <div class="logo">
            <img :src="item.logo" width="100%" height="100%" alt />
          </div>
          <h2>{{ item.title }}</h2>
          <div class="description">{{ item.description }}</div>
          <div class="subDescription">{{ item.subDescription }}</div>
          <div class="link">
            更多信息，请访问：
            <br />
            <span>{{ item.link }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "result",
  data() {
    return {
      results: [
        {
          "name": "gogokid",
          "logo": "@/img.png",
          "title": "GoGoKid",
          "id": 0,
          "description": "GoGokid 是一个面向 4 - 12 岁孩子的在线少儿英语 1 对 1学习平台。主打 100% 纯北美外教；教材对标美国小学主流课标（CCSS），融入 SED（社交情商培养）、多元智能理论，为中国孩子带来高效的英语学习体验。",
          "cover": "@/img.png",
          "link": "https://www.gogokid.com.cn"
        },
        {
          "name": "naughtyShrimp",
          "logo": "@/img.png",
          "title": "皮皮虾",
          "id": 1,
          "description": "今日头条官方爆笑社区，一个只要打开就能让你笑到停不下来的 App。",
          "cover": "@/img.png",
          "subDescription": "皮皮虾一直坚持「传播快乐，分享生活」的目标，以特有的「神评」玩法形成了独特的社区氛围。之后，皮皮虾将不断提供更多有趣的功能，帮助用户创造出更多优质的内容。",
          "link": "https://mp.pipix.com"
        },
        {
          "name": "urgentLetter",
          "logo": "@/img.png",
          "title": "飞书",
          "id": 2,
          "description": "飞书是新一代企业办公套件，整合即时沟通、日历、音视频会议、在线文档、云盘、工作台等功能于一体，为企业提供全方位协作解决方案，成就组织和个人，更高效、更愉悦。",
          "cover": "@/img.png",
          "subDescription": "",
          "link": "https://www.feishu.com"
        },
        {
          "name": "headNews",
          "title": "今日头条",
          "logo": "@img.png",
          "cover": "@img.png",
          "description": "今日头条是一款个性化资讯推荐引擎产品，致力于连接人与信息，让优质、丰富的信息得到高效、精准的分发，为用户创造价值。",
          "subDescription": "今日头条目前拥有科技、体育、健康、美食、教育、三农、国风、NBA 等超过 100 个垂直领域，覆盖了图文、图集、小视频、短视频、短内容、直播、小程序等多种信息体裁。",
          "id": 3,
          "link": "https://m.ulikecam.com/"
        },
        {
          "name": "trillShortVideo",
          "title": "抖音短视频",
          "logo": "@img.png",
          "cover": "@img.png",
          "description": "抖音是一个帮助用户表达自我，记录美好生活的短视频平台。截至 2020 年 1 月，日活跃用户数已经突破 4 亿，并继续保持高速增长。",
          "subDescription": "",
          "id": 4,
          "link": "https://douyin.com/"
        },
        {
          "name": "trillShortVideo",
          "title": "西瓜视频",
          "logo": "@img.png",
          "cover": "@img.png",
          "description": "西瓜视频是字节跳动旗下的一款视频 App，作为聚合多元文化的综合视频平台，它通过个性化推荐，源源不断地为不同人群提供丰富的优质内容，同时鼓励多样化创作，帮助人们轻松地向全世界分享视频作品。",
          "subDescription": "目前西瓜视频累计用户数超过 3.5 亿，日均播放量超过 40 亿。",
          "id": 5,
          "link": "https://ixigua.com/"
        },
        {
          "name": "trillShortVideo",
          "title": "懂车帝",
          "logo": "@img.png",
          "cover": "@img.png",
          "description": "懂车帝是“看车、选车、买车”一站式汽车媒体和服务平台，产品基于个性化推荐引擎帮助用户发现感兴趣的汽车内容，同时配有车型库、360 度全景看车等选车工具，首创短视频社区“车友圈”，为用户打造内容 + 社区 + 工具的多元生态。目前，懂车帝已经成长为增长最快的汽车类手机应用。",
          "subDescription": "目前西瓜视频累计用户数超过 3.5 亿，日均播放量超过 40 亿。",
          "id": 6,
          "link": "https://www.dongchediapp.com/"
        },
      ],
      activeIndex: 3,
      transitionName: "",
      scrolling: false,
      duration: 1000,
      loading: false
    };
  },
  watch: {
    activeIndex(newIndex, oldIndex) {
      if (this.scrolling) {
        return;
      }
      if (this.$route.params.id) {
        delete this.$route.params.id;
        return;
      }

      this.transitionName = newIndex < oldIndex ? "move-down" : "move-up";
    }
  },
  created() {
    this.loading = true;
    const loading = this.$loading({
      position: { top: 60 }
    });
    this.loading = false;
    loading.close();
    // fetch('@data.json')
    //   .then((response) => response.json()).then((json) => console.log(json));
    // this.request
    //   .get("/results")
    //   .then(response => {
    //     this.results = response;
    //     console.log(this.results)
    //     this.loading = false;
    //     loading.close();

    //     if (this.$route.params.id) {
    //       this.activeIndex = this.results.findIndex(
    //         item => item.id === this.$route.params.id
    //       );
    //     }
    //   })
    //   .catch();
  },
  mounted() {
    window.addEventListener("mousewheel", this.mousewheelHandler);
  },
  destroyed() {
    window.removeEventListener("mousewheel", this.mousewheelHandler);
  },
  computed: {
    item() {
      return this.results[this.activeIndex] || {};
    }
  },
  methods: {
    mousewheelHandler(e) {
      if (this.scrolling) {
        return;
      }
      this.scrolling = true;
      if (e.wheelDelta > 0) {
        this.transitionName = "move-down";
        this.activeIndex =
          this.activeIndex === 0
            ? this.results.length - 1
            : this.activeIndex - 1;
      } else {
        this.transitionName = "move-up";
        this.activeIndex = (this.activeIndex + 1) % this.results.length;
      }
      setTimeout(() => {
        this.scrolling = false;
      }, this.duration);
    }
  }
};
</script>
  
<style lang="less" scoped>
.move-up-leave-active,
.move-up-enter-active,
.move-down-leave-active,
.move-down-enter-active {
  transition: all 0.7s;
  transition-timing-function: cubic-bezier(0.66, 0, 0.34, 1);
}

.move-up-leave-to,
.move-up-enter,
.move-down-leave-to,
.move-down-enter {
  opacity: 0;
}

.move-up-leave-to,
.move-down-enter {
  transform: translateY(-100%);
}

.move-down-leave-to,
.move-up-enter {
  transform: translateY(100%);
}

.result {
  position: fixed;
  z-index: -1;
  top: 60px;
  right: 0;
  left: 0;
  bottom: 0;
  min-height: 500px;
  min-width: 700px;

  &-fullpage-indicator {
    position: absolute;
    z-index: 333;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);

    &-item {
      margin: 22px 0;
      width: 5vh;
      height: 5vh;
      min-height: 30px;
      min-width: 30px;
      cursor: pointer;
      transition: all 0.3s;
      border-radius: 50%;
      overflow: hidden;

      &:hover,
      &.active {
        transform: scale(1.3);

        box-shadow: 0 0 14px 0 @box-shadow-dark-color;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .view-wrapper {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: absolute;
    height: 100vh;
    width: 100%;
    // padding-top: 100px;
    padding-left: 100px;

    .content {
      width: 300px;
      transform: translateY(-50%);
      position: absolute;
      top: 50%;

      // text-align: center;
      .logo {
        width: 80px;
        height: 80px;
      }

      h2 {
        margin: 30px 0;
      }

      .description,
      .subDescription {
        color: #aaa;
        line-height: 1.4;
      }

      .link {
        margin-top: 40px;

        span {
          color: @main-color;
        }
      }
    }
  }
}
</style>
  