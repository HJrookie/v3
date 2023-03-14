<template>
  <div class="app-container">
    <el-row style="margin-bottom: 20px">
      <el-button @click="add">add</el-button>
      <el-button @click="batchDelete()" :icon="Search"> Goto </el-button>

      <!--      <el-button type="primary" :icon="ArrowLeft">Previous Page</el-button>-->
      <!--      <el-icon><ArrowLeft /></el-icon>-->
      <el-button type="primary">
        <el-icon><ArrowLeft /></el-icon>
        Search
      </el-button>

      <el-button type="primary">
        <el-icon class="el-icon--right"><ArrowRight /></el-icon>Upload
      </el-button>
    </el-row>

    <el-form ref="ruleFormRef" :model="form" :rules="formRules" label-width="100px" labelPosition="top">
      <el-row v-for="(item, i) of formData.items">
        <el-form-item label="类型" prop="pass">
          <el-select v-model="item.inputType" placeholder="Select">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="label" prop="pass">
          <el-input v-model="item.label" placeholder="姓名"></el-input>
        </el-form-item>

        <el-form-item label="prop" prop="pass">
          <el-input v-model="item.prop" placeholder="name"></el-input>
        </el-form-item>

        <!--        todo-->
        <el-form-item label="预览" prop="pass" style="margin-left: 15px; width: 220px">
          <preview :item="item"></preview>
        </el-form-item>

        <el-form-item label="移除" prop="pass">
          <el-button @click="remove(i)" type="danger"
            ><el-icon><Minus></Minus></el-icon
          ></el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <el-button @click="prevCode">CCCCCCCCC</el-button>

    <preview-code ref="prevRef"></preview-code>

    <!--    <add-or-update ref="addOrUpdateRef" @query="initTableData"></add-or-update>-->
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { PopoverInstance } from "element-plus";
import Preview from "./preview.vue";
import PreviewCode from "./previewCode.vue";
const router = useRouter();
import { getCurrentInstance } from "vue";
const options = ref([
  {
    label: "input",
    value: "input",
  },
  {
    label: "select",
    value: "select",
  },
  {
    label: "inputNumber",
    value: "inputNumber",
  },
  {
    label: "date",
    value: "date",
  },
  {
    label: "input-textarea",
    value: "input-textarea",
  },
]);

// import AddOrUpdate from "./add-or-update.vue";
import { deleteSchool, getExamList } from "@/api/user";
import useUserStore from "@/store/user";
import { FormConfig } from "@/views/codeGen/type";
import { renderStr } from "@/views/codeGen/render";
import { Search } from "@element-plus/icons-vue";
const instance = getCurrentInstance();

const formData = ref<FormConfig>({
  items: [
    {
      prop: "name",
      value: undefined,
      label: "名称",
      inputType: "input",
    },
    {
      prop: "age",
      value: undefined,
      label: "年龄",
      inputType: "inputNumber",
    },
    {
      prop: "beginTime",
      value: undefined,
      label: "开始时间",
      inputType: "date",
      type: "date",
    },
    {
      prop: "sex",
      value: undefined,
      label: "性别",
      inputType: "select",
      options: [
        { label: "男", value: 0 },
        { label: "女", value: 1 },
      ],
    },
    {
      prop: "des",
      value: undefined,
      label: "描述信息",
      inputType: "input-textarea",
    },
  ],
});
const add = () => {
  formData.value.items.push({
    prop: "name",
    value: undefined,
    label: "名称",
    inputType: "input",
  });
};

const remove = (i) => {
  formData.value.items.splice(i, 1);
};

const batchDelete = () => {
  router.push("/test");
};
const prevCode = () => {
  instance?.refs?.prevRef?.init(formData.value);
};
const del = (i) => {
  formData.value.items.splice(i, 1);
};
// add or update
</script>
