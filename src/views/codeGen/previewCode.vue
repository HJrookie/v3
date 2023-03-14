<template>
  <div>
    <el-dialog v-model="visible" title="查看" class="cccccc" width="80%" top="3vh">
      <el-row type="flex" justify="end">
        <el-button @click="cpppp">
          <el-icon class="iccon"><Check /></el-icon>
        </el-button>
      </el-row>
      <pre><code id="foo" class="hljs"  v-html="highlightedCode(code)"></code></pre>
    </el-dialog>
  </div>
</template>

<script setup>
import { renderStr } from "@/views/codeGen/render";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
hljs.registerLanguage("javascript", javascript);
import "highlight.js/styles/github-gist.css";
import { ElMessage } from "element-plus";

hljs.registerLanguage("vue", xml);
const highlightedCode = (code) => {
  const result = hljs.highlight("xml", code || "", true);
  resultStr.value = result.value ?? "";
  return result.value || "&nbsp;";
};
const visible = ref(false);
const code = ref("");
const resultStr = ref("");
const init = (data) => {
  visible.value = true;
  code.value = renderStr(data);
};
const cpppp = async () => {
  await navigator.clipboard.writeText(code.value);
  ElMessage({
    type: "success",
    message: "成功",
  });
};
defineExpose({ init });
</script>

<style lang="scss" scoped>
:deep(.cccccc) {
  .el-dialog__body {
    max-height: 90vh;
    overflow: auto;
    padding-top: 0;
    .iccon {
      font-size: 24px;
      cursor: pointer;
      //background: rgba(0, 0, 0, 0.025);
    }
  }
}

//.cccccc {
//  :deep(.el-dialog__body) {
//
//  }
//}
//:deep(.cccccc) {
//  .el-dialog__body {
//
//  }
//}
//.cccccc {
//  color: red;
//
//  :deep(.el-dialog__body) {
//
//  }
//}
</style>
