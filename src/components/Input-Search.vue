<template>
  <div :class="size" class="input-search">
    <div id="text_input">
      <i class="prefix-icon el-icon-search"></i>
      <input v-bind="$attrs" ref="text_input" type="text" placeholder="输入图片链接或者上传图片以产生描述" :value="text"
        @change="changetext" @keypress.enter="search" />
    </div>
    <!-- <div id="image_input">
      <i class="prefix-icon-picture el-icon-picture-outline"> </i>
      <input v-bind="$attrs" type="file" ref="image_input" accept="image/jpg, image/jpeg, image/png" :value="image"
        @change="changefile"
      />
    </div>   -->
    <span @click="search" class="input-search-button">生成</span>
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
    chagetext(){
      e => $emit('change', e.target.value);
    },
    // changefile(){
    //   var files = event.target.files[0]        //获取文件 
    //   this.$emit("search", this.$refs.image_input.value);
    // }
  }
};
</script>
<style lang="less" scoped>
.input-search {
  margin-left: auto;
  margin-right: auto;
  height: 50px;
  width: 100%;
  min-width: 400px;
  max-width: @main-width;
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid @main-color;
  font-size: 17px;

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
    line-height: 100%;
    border: none;
    padding: 10px;
    padding-left: 2em;
  }

  &-button {
    padding: 9px;

    color: #fff;
    text-align: center;
    position: absolute;
    right: 0;

    top: 0;
    width: 100px;
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
