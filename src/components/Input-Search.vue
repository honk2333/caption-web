<template>
  <div :class="size" class="input-search">
    <form id="inputform">
      <div>
        <i class="prefix-icon el-icon-search"></i>
        <input ref="text_input" :value="text" placeholder="输入图片链接或者上传图片以产生描述" type="text" @keypress.enter="search"/>
      </div>
      <div>
        <label for="image_input">
          <i aria-hidden="true" class="prefix-icon-picture el-icon-picture-outline"> </i>
        </label>
        <input v-show="false" id="image_input" :value="image" accept="image/jpg, image/jpeg, image/png"
         type="file" @change="changefile"  />
      </div>
      <span class="input-search-button" @click="search"> 生成 </span>>
      <!--            <span class="input-search-button" type=script"submit">生成</span>-->
    </form>
  </div>
</template>

<script>
export default {
  name: "input-search",
  model: {
    event: "change"
  },
  props: {
    text: String,
    image: File,
    size: {
      type: String,
      default: "medium",
      validator(value) {
        return ["small", "medium", "large"].includes(value);
      }
    },
  },
  methods: {
    search() {
      this.$emit("search", this.$refs.text_input.value);
    },
    // changetext(event) {
    //   // var value = event.target.value
    //   this.$emit('change', event.target.value);
    // },
    changefile(event) {
      var files = event.target.files[0]        //获取文件
      console.log(files)
      this.$emit("search", files);
    }
  }
};
</script>
<style lang="less" scoped>
.input-search {
  margin-left: auto;
  margin-right: auto;
  height: 50px;
  //width: 100%;
  //min-width: 400px;
  max-width: @main-width;
  position: relative;
  //border-radius: 30px;
  //white-space: nowrap;
  //text-overflow: ellipsis;
  overflow: hidden;
  //border: 1.5px solid @main-color;
  font-size: 17px;
  font-family: STZhongsong,serif;

  ::-webkit-input-placeholder {
    color: @secondary-text-color;
  }

  &.small {
    height: 40px;
    font-size: 14px;
  }

  &.large {
    height: 60px;
    font-size: 20px;
  }

  .prefix-icon {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 10px;
    display: flex;
    align-items: center;
  }

  .prefix-icon-picture {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 120px;
    display: flex;
    align-items: center;
  }


  input {
    font-size: inherit;
    height: 100%;
    width: 100%;
    //top: 0;
    //bottom: 0;
    line-height: 100%;
    border: none;
    padding: 15px;
    padding-left: 2em;
    //text-align: center;
  }

  &-button {
    padding: 9px;

    color: #fff;
    text-align: center;
    position: absolute;
    right: 0;

    top: 0;
    width: 100px;
    min-width: 30px;
    height: 100%;
    background: @main-color;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      // background: rgba(255, 255, 255, 0.5);
      &::before {
        transition: all 0.3s;
        content: "";
        position: absolute;
        width: 100%;
        top: -1px;
        bottom: -1px;
        background: rgba(255, 255, 255, 0.4);
      }
    }
  }
}
</style>
