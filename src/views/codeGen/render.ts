import { FormConfig, FormItem } from "@/views/codeGen/type";

const formatPlaceholder = (item: FormItem) => {
  if (!item || item.blankPlaceholder) {
    return "";
  }
  if (item?.placeholder) {
    return item?.placeholder ?? "";
  }
  const map = {
    select: "请选择",
    input: "请输入",
    inputNumber: "请输入",
    "input-textarea": "请输入",
    date: "请选择",
  };
  return `${map[item.inputType] ?? ""}${item.label}`;
};

const formatFormItemStr = (item: FormItem) => {
  console.log(7777777);
  let str = "";
  if (item.inputType === "select") {
    str = `
    <el-form-item label="${item.label}" prop="${item.prop}">
     <el-select v-model="form.${item.prop}" placeholder="${formatPlaceholder(item)}" clearable filterable ${item.multiple ? "multiple" : ""} ${
      item.disabled ? ':disbled="item.disabled"' : ""
    } >
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>

    `;
  } else if (item.inputType === "input") {
    str = `
    <el-form-item label="${item.label}" prop="${item.prop}">
      <el-input v-model="form.${item.prop}" placeholder="${formatPlaceholder(item)}" clearable />
    </el-form-item>
    `;
  } else if (item.inputType === "inputNumber") {
    str = `
    <el-form-item label="${item.label}" prop="${item.prop}">
      <el-input-number v-model="form.${item.prop}" :min="1" :max="100" placeholder="${formatPlaceholder(item)}"/>
    </el-form-item>
    `;
  } else if (item.inputType === "input-textarea") {
    str = `
    <el-form-item label="${item.label}" prop="${item.prop}">
      <el-input v-model="form.${item.prop}" :rows="${item?.rows ?? 5}" placeholder="${formatPlaceholder(item)}"/>
    </el-form-item>
    `;
  } else {
    // date
    str = `
    <el-form-item label="${item.label}" prop="${item.prop}">
    <el-date-picker
    clearable
        v-model="form.${item.prop}"        type="${item.type ?? "date"}"
        range-separator="${item?.["range-separator"] ? item?.["range-separator"] : "-"}"
        start-placeholder="${item?.["start-placeholder"] ? item?.["start-placeholder"] : ""}"
        end-placeholder="${item?.["end-placeholder"] ? item?.["end-placeholder"] : ""}"
        placeholder="${formatPlaceholder(item)}" value-format="${item?.["value-format"] ? item?.["value-format"] : "yyyy-MM-dd"}"
      />
    </el-form-item>
    `;
  }
  return str;
};
export const renderStr = (data: FormConfig) => {
  console.log(543543, data);
  let formStr = `
<template>
<el-form :model="form" ref="form" size="${data?.formConfig?.size ?? "small"}" ${data?.formConfig?.inline ? "inline" : ""} label-width="${
    data?.formConfig?.labelWidth ?? "75px"
  }">`;
  data.items.forEach((fItem) => {
    formStr += `\n`;
    formStr += formatFormItemStr(fItem) + "\n";
  });

  let c = `<el-form-item label="角色权限字符串" prop="roleKey">
        <el-input
          v-model="queryParams.roleKey"
          placeholder="请输入角色权限字符串"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="显示顺序" prop="roleSort">
        <el-input
          v-model="queryParams.roleSort"
          placeholder="请输入显示顺序"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="数据范围" prop="dataScope">
        <el-input
          v-model="queryParams.dataScope"
          placeholder="请输入数据范围"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="菜单树选择项是否关联显示" prop="menuCheckStrictly">
        <el-input
          v-model="queryParams.menuCheckStrictly"
          placeholder="请输入菜单树选择项是否关联显示"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="部门树选择项是否关联显示" prop="deptCheckStrictly">
        <el-input
          v-model="queryParams.deptCheckStrictly"
          placeholder="请输入部门树选择项是否关联显示"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="submit">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    </template>
    `;

  let scriptStr = `
  
<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: "Hello",
  region: "",
  count: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});

const rules = reactive<FormRules>({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  region: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change",
    },
  ],
  count: [
    {
      required: true,
      message: "Please select Activity count",
      trigger: "change",
    },
  ],
  date1: [
    {
      type: "date",
      required: true,
      message: "Please pick a date",
      trigger: "change",
    },
  ],
  date2: [
    {
      type: "date",
      required: true,
      message: "Please pick a time",
      trigger: "change",
    },
  ],
  type: [
    {
      type: "array",
      required: true,
      message: "Please select at least one activity type",
      trigger: "change",
    },
  ],
  resource: [
    {
      required: true,
      message: "Please select activity resource",
      trigger: "change",
    },
  ],
  desc: [{ required: true, message: "Please input activity form", trigger: "blur" }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const options = Array.from({ length: 100 }).map((_, idx) => ({
  value: idx+1,
  label: idx+1,
}));
</script>
  `;

  console.log(9999999, formStr.trim());
};
