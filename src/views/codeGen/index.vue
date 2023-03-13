<template>
  <div class="app-container">
    <el-row style="margin-bottom: 20px">
      <el-button @click="add">add</el-button>
      <el-button @click="batchDelete()"> 批量删除 </el-button>
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
        <el-form-item label="预览" prop="pass">
          <preview :item="item"></preview>
        </el-form-item>
      </el-row>
    </el-form>

    <el-button @click="prevCode">CCCCCCCCC</el-button>

    <!--    <add-or-update ref="addOrUpdateRef" @query="initTableData"></add-or-update>-->
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { PopoverInstance } from "element-plus";
import Preview from "./preview.vue";
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
const instance = getCurrentInstance();

const formData = ref<FormConfig>({
  items: [
    {
      prop: "姓名",
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
      prop: "开始时间",
      value: undefined,
      label: "名称",
      inputType: "date",
      type: "date",
    },
    {
      prop: "性别",
      value: undefined,
      label: "名称",
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

const prevCode = () => {
  renderStr(formData.value);
};
const del = (i) => {
  formData.value.items.splice(i, 1);
};
// add or update
</script>
