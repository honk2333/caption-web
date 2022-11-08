<template functional>
  <div class="footer">
    	<div class="container">
        	<div class="pre_footer">
            	<div class="row">
                	<div class="col-sm-4">
                    	<div class="sidepanel widget_text">
                        	<h4 class="title">联系我们</h4>
                        	<p>江苏省南京市栖霞区仙林大道163号
                                <br/>南京大学仙林校区机关603号信箱计算机系</p>
                            <p><span>Contact：</span>陈家骏 教授</p>
                            <p><span>Phone：</span> +86-25-89683672</p>
                            <p><span>Office：</span> 计算机科学与技术系904</p>
                            <p><span>Email：</span> <a href="mailto:#">chenjj@nju.edu.cn</a></p>
                        </div>
                    </div>
                    <img style="display: inline;float: right;margin-left:auto;margin-right:auto;width:auto;height:auto;max-height:150px;max-width:150px;" src="img/QRcode.jpeg" class="img-responsive img-rounded">
                </div>
            </div>
            <div class="footer_bottom">
            	<div class="copyright">Copyright 2017. All Rights Reserved by NJUNLP.</div>
                <div class="clear"></div>
            </div>
        </div>
    </div>   
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.footer {
  height: 220px;
  min-width: @main-width;
  background: rgba(0, 0, 0, 1);
  color: #fff;
  display: flex;
  font-size: @font-size-small;
  padding: 0 150px;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  &-content-column {
    padding: 0 40px;
    height: 100px;
    .title {
      color: @secondary-text-color;
    }
    &:last-child {
      width: 340px;
      padding: 0 80px;
    }
    & + & {
      text-align: center;
      flex: 1;
      border-left: 1px solid @border-dark-color;
    }

    &__contact {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .contact-item {
        border-radius: 50%;
        width: 33px;
        height: 33px;
        overflow: hidden;
      }
    }
  }
}

// .footer {
//   -webkit-text-size-adjust: 100%;
//   -webkit-tap-highlight-color: rgba(0,0,0,0);
//   --sr-annote-color-0: #b4d9fb;
//   --sr-annote-color-1: #ffeb3b;
//   --sr-annote-color-2: #a2e9f2;
//   --sr-annote-color-3: #a1e0ff;
//   --sr-annote-color-4: #a8ea68;
//   --sr-annote-color-5: #ffb7da;
//   line-height: 21px;
//   color: #444444;
//   font-size: 14px;
//   font-weight: 400;
//   font-family: 'Roboto', sans-serif;
//   text-rendering: optimizeLegibility !important;
//   box-sizing: border-box;
//   background: #31383d;
// }
</style>

