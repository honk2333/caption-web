<template>
  <div class="wrapper">
    <a-row>
      <a-col :lg="10" :md="10" :sm="9">
        <div class="left-wrapper">
          <!-- <div class="up-img-wrapper"> -->
          <!-- :beforeUpload="beforeUpload" -->
          <div class="upimg-dragger">
            <a-upload-dragger
                :beforeUpload="beforeUpload"
                :showUploadList="false"
                accept=".jpg, .jpeg, .png, .gif, .ico"
                action="/tools/ocr_text/"
                listType="picture"
                name="file"
                @change="handleChange"
            >
              <p>点击、拖动、或者粘贴图片</p>
            </a-upload-dragger>
          </div>
          <div class="up-img-preview">
            <!--  -->
            <img :hidden="previewImgHidden" :src="upImage" alt="预览图片"/>
          </div>
          <!-- </div> -->
        </div>
      </a-col>

      <a-col :lg="3" :md="4" :sm="6">
        <div class="split">
          <div class="divider"></div>
          <div class="btn-group">
            <a-button :loading="isOCRing" @click="handleUpload">识别</a-button>
            <!-- 压缩图片、显示检测后的图片、显示原始值、显示纯文字 -->
            <div style="margin-top:1rem;">
              <p>
                压缩图片:
                <a-switch
                    checked-children="开"
                    default-checked
                    style="width:auto;min-width:45%;"
                    un-checked-children="关"
                    @change="changeCompressBtn"
                />
              </p>
              <p :hidden="hiddenCompressBox">
                压缩尺寸:
                <a-input-number
                    id="compressSizeInput"
                    v-model="comporessSize"
                    :min="1"
                    size="small"
                    style="width:auto;max-width:45%;"
                />
                <!-- @change="onChange" -->
              </p>
            </div>
          </div>

        </div>
      </a-col>

      <a-col :lg="11" :md="10" :sm="9">
        <div class="right-wrapper">
          <div :hidden="hiddenDetectedImg" class="detected-img">
            <a-divider orientation="left">文字检测结果</a-divider>

            <img :src="detectedImg" alt="检测结果图片"/>
          </div>

          <div :hidden="hiddenOcrRaw" class="ocr-raw">
            <a-divider orientation="left">原始结果</a-divider>
            <CodeHighlight :txt="ocrRaw"/>
          </div>

          <div :hidden="hiddenOcrText" class="ocr-text">
            <a-divider orientation="left">识别的文字</a-divider>
            <CodeHighlight :txt="ocrText"/>
          </div>

          <div :hidden="hiddenFilterResult" class="filter-result">
            <a-divider orientation="left">违规信息检测结果</a-divider>
            <CodeHighlight :txt="filterResult"/>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Vue from 'vue'
import CodeHighlight from '../components/CodeHighlight.vue'
import Message from 'ant-design-vue'
import {
  Button,
  Layout,
  Input,
  Row,
  Col,
  Icon,
  Divider,
  Upload,

} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';


const axios = require('axios')
Vue.use(Message)

Vue.use(Button)
Vue.use(Layout)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Icon)
Vue.use(Divider)
Vue.use(Upload)

// 获取上传对象的临时链接
function getObjectURL(file) {
  var url = null
  if (window.createObjectURL != undefined) {
    url = window.createObjectURL(file)
  } else if (window.URL != undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file)
  } else if (window.webkitURL != undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file)
  }
  return url
}

export default {
  name: 'Index',
  props:{
  },
  data() {
    return {
      upImage: '', // 上传后的图片预览地址
      fileList: [], // 上传图片的列表
      detectedImg: '', // 检测后的图片
      ocrRaw: ``, // 返回的原始结果
      ocrText: ``, // 经过提取后的文字结果
      filterResult: '',

      uploading: false, //状态 原生 上传控件的状态
      previewImgHidden: true, // 状态 预览图片是否隐藏
      isOCRing: false, // 状态 是否在识别中
      hiddenDetectedImg: true, //状态  是否显示检测后的图片
      hiddenOcrRaw: true, // 状态  是否显示返回的原始结果
      hiddenOcrText: true, // 状态 是否显示经过提取后的文字结果
      hiddenFilterResult: true,
      comporessSize: 1600,
      hiddenCompressBox: false,
      themecolor: "rgb(255, 255, 255)",
    }
  },
  components: {
    CodeHighlight
  },
  methods: {
    changeCompressBtn(checked) {

      if (checked === true) {
        this.$data.hiddenCompressBox = false
      } else {
        this.$data.hiddenCompressBox = true
      }
    },
    handleChange(info) {
      const status = info.file.status
      if (status !== 'uploading') {
        this.$data.fileList = [info.file]
        this.$data.upImage = getObjectURL(info.file)
        this.$data.previewImgHidden = false
        console.log('success')
      }
      if (status === 'done') {
        console.log('done')
        this.$message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
        console.log('error')
      }
    },
    beforeUpload(file) {
      this.fileList = [file]
      return false
    },
    handleUpload() {
      if (this.fileList.length < 1) {
        this.$message.warning('还没有选择图片')
        return
      }

      const formData = new FormData()
      this.fileList.forEach(file => {
        formData.append('file', file)
      })
      if (this.$data.hiddenCompressBox === true) {
        formData.append('compress', 0)
      } else {
        formData.append('compress', this.$data.comporessSize)
      }

      this.isOCRing = true
      this.uploading = true

      const _this = this
      axios({
        // url: '/api/tr-run/',
        url: '/api/tr-run/',
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Requested-With': 'XMLHttpRequest'
        },
        transformRequest: {},
        data: formData
      })
          .then(function (response) {
            _this.$data.detectedImg = response.data['data']['img_detected']

            _this.$data.ocrRaw = ''
            _this.$data.ocrText = ''
            _this.$data.filterResult = ''

            let nextLineHeight = 0 // 下一行的高度

            const raw_data = response.data['data']['raw_out']
            for (let i = 0; i < raw_data.length; i++) {
              _this.$data.ocrRaw += JSON.stringify(raw_data[i]) + '\r'

              // 合并同一行的数据
              if (i < raw_data.length - 1) {
                nextLineHeight = raw_data[i + 1][0][1]
                // 判断判断同一行的依据是 两段的行高差 小于 行高的一半
                if (
                    Math.abs(raw_data[i][0][1] - nextLineHeight) <
                    raw_data[i][0][3] / 2
                ) {
                  _this.$data.ocrText += raw_data[i][1] + ' '
                } else {
                  _this.$data.ocrText += raw_data[i][1] + '\r'
                }
              } else {
                _this.$data.ocrText += raw_data[i][1]
              }

              // _this.$data.ocrText += raw_data[i][1] + '\r'
            }
            _this.$data.filterResult = response.data['data']['filter_result']

            _this.$data.uploading = false
            _this.$data.isOCRing = false
            _this.$data.hiddenDetectedImg = false
            _this.$data.hiddenOcrRaw = false
            _this.$data.hiddenOcrText = false
            _this.$data.hiddenFilterResult = false

            _this.$message.success(
                '成功! 耗时：' + response.data['data']['speed_time'] + ' 秒'
            )
          })
          .catch(function (error) {
            // console.log(error)
            _this.$data.isOCRing = false

            const errorInfo = error.response['msg'] || error.message
            _this.$message.error('错误：' + errorInfo)

            _this.$data.hiddenDetectedImg = true
            _this.$data.hiddenOcrRaw = true
            _this.$data.hiddenOcrText = true
            _this.$data.hiddenFilterResult = true
          })
    }
  },
  watch: {
    fileList: function (newVal, oldVal) {
      if (newVal.length <= 0) {
        this.hiddenDetectedImg = true
        this.hiddenOcrRaw = true
        this.hiddenOcrText = true
        this.hiddenFilterResult = true
        // oldVal
      }

    }
  },
  mounted: function () {
    // console.log('mounted')
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered

      const _this = this
      document.addEventListener('paste', function (event) {
        var items = event.clipboardData && event.clipboardData.items
        var file = null
        if (items && items.length) {
          // 检索剪切板items
          for (var i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
              file = items[i].getAsFile()
              break
            }
          }
        }

        // console.log(file)
        if (file !== null) {
          _this.$data.fileList = [file]
          _this.$data.upImage = getObjectURL(file)
          _this.$data.previewImgHidden = false
        }
        console.log(_this.$data.fileList)
        // 此时file就是剪切板中的图片文件
      })
    })
  }
}
</script>

<style>
/* >>>>>>  覆盖原生样式 */
/*.ant-divider-inner-text {*/
/*  font-size: 20px;*/
/*  color: gray;*/
/*}*/

/* <<<<<<  覆盖原生样式 */
.wrapper {
  main-color: ;
  /*position: absolute;*/
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: auto;
  /*background: rgb(234, 239, 241);*/
}

.left-wrapper {
  min-height: 100vh;
  height: auto;
}

.upimg-dragger {
  height: 4rem;
  margin: 2.5rem 0 1rem 2.5rem;
}

.up-img-preview {
  text-align: center;

  margin: 1.5rem -1rem 1rem 1rem;
}

.up-img-preview img {
  object-fit: contain;
  max-width: 95%;
  max-height: 80vh;
}

.split {
  min-height: 100%;
  /* border: solid gray 1px; */
  height: 100vh;
  position: relative;
}

.divider {
  position: absolute;
  left: 50%;
  top: 0;
  min-height: 100%;
  height: auto;
  width: 1px;
  border-left: 1px solid #d3d3d36b;
}

.btn-group {
  text-align: center;
  margin: 2.5rem 0;
  padding: 1rem;
  background: white;
  width: 100%;
  position: absolute;
}

.btn-group button {
  width: 90%;
}

.right-wrapper {
  padding: 1rem 2.5rem 1rem 0;
}

.detected-img {
  max-height: 50%;
  /* border: 1px solid gray; */
  text-align: center;
}

.detected-img img {
  object-fit: contain;
  max-width: 100%;
  max-height: 40vh;
}

.detected-img .ocr-raw {
  max-height: 40vh;
}

.detected-img .ocr-text {
  max-height: 40vh;
}
</style>