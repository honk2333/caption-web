<template>
  <div class="hello">
    <div class="more">
      <h1>🔎 Welcome to the MORE dataset</h1>

      <div class="searchdatasetbyimgid">
        <el-input
          v-model="param1"
          clearable
          placeholder="请输入图片ID进行搜索"
          type="text"
          @keypress.enter="SearchById"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            type="primary"
            @click="SearchById"
          >
            搜索
          </el-button>
        </el-input>
        <el-input
          v-model="param2"
          clearable
          placeholder="请输入行号进行跳转"
          type="text"
          @keypress.enter="SearchByLine"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            type="primary"
            @click="SearchByLine"
          >
            跳转
          </el-button>
        </el-input>
      </div>
      <div class="show-dataset">
        <h3>图片id: {{ adata.img_id }}</h3>
        <h3>数据行号： {{ adata.line_id }}</h3>
        <hr />
        <h3>{{ adata.title }}</h3>
        <img :src="adata.img_path" alt="Image" />
        <!--      <p> Entity Number: {{ adata.ent_num }} </p>-->
        <!--      <p> Object Number: {{ adata.obj_num }} </p>-->
      </div>
      <div class="show-label">
        <p>Entity: {{ adata.entity }}</p>
        <p>Object: {{ adata.object }}</p>
        <p>Relation: {{ adata.relation }}</p>
      </div>
      <div class="button-div">
        <el-button icon="el-icon-search" type="primary" @click="LastLine">
          上一条</el-button
        >
        <el-button icon="el-icon-search" type="primary" @click="NextLine">
          下一条</el-button
        >
        <el-button icon="el-icon-search" type="warning" @click="ReportLine">
          提交错误</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Input } from "element-ui";
import { FindById, FindByLine, ReportLine } from "@/helper/api.js";

export default {
  name: "DataSet",
  props: {
    msg: String
  },
  data() {
    return {
      adata: {
        img_path: "",
        title: "",
        ent_num: 0,
        obj_num: 0,
        entity: "",
        object: "",
        img_id: "",
        line_id: "",
        relation: ""
      },
      param1: "",
      param2: ""
    };
  },
  methods: {
    SearchById() {
      console.log(this.param1);
      FindById(this.param1)
        .then(data => {
          this.adata = data;
          this.adata.img_path = "http://njunlp.club:80/" + data.img_path;
          console.log(this.adata.img_path);
        })
        .catch();
    },
    SearchByLine() {
      console.log(this.param2);
      FindByLine(this.param2).then(data => {
        console.log(data);
        this.adata = data;
        this.adata.img_path = "http://njunlp.club:80/" + data.img_path;
      });
    },
    NextLine() {
      this.adata.line_id += 1;
      FindByLine(this.adata.line_id).then(data => {
        console.log(data);
        this.adata = data;
        this.adata.img_path = "http://njunlp.club:80/" + data.img_path;
      });
    },
    LastLine() {
      this.adata.line_id -= 1;
      FindByLine(this.adata.line_id).then(data => {
        console.log(data);
        this.adata = data;
        this.adata.img_path = "http://njunlp.club:80/" + data.img_path;
      });
    },
    ReportLine() {
      console.log(this.adata.line_id);
      ReportLine(this.adata.line_id);
    }
  },
  components: { Button, Input },
  mounted() {
    this.adata.line_id = 0;
    FindByLine(this.adata.line_id).then(data => {
      console.log(data);
      this.adata = data;
      this.adata.img_path = "http://njunlp.club:80/" + data.img_path;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 25px;
  font-family: STZhongsong, serif;
  font-weight: normal;
  width: auto;
  /* position: fixed; */
  /*height: 120%;*/
  /*position: absolute;*/
  /*margin-top: auto;*/
}

.more {
  flex: 1;
  margin-top: 5%;
}

.searchdatasetbyimgid{
  flex: 1;
}

.show-label {
  flex: 1;
  text-align: center;
}

.button-div {
  flex: 3;
  display: flex;
  justify-content: space-between;
}

img {
  height: 280px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

h3 {
  margin: 20px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}


</style>
