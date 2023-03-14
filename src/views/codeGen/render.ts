import { FormConfig, FormItem } from "@/views/codeGen/type";
import _ from "lodash";
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

const renderFormOptions = (data: FormConfig) => {
  let str = ``;
  data.items.forEach((item) => {
    if (item.inputType === "select") {
      str += `const ${item.optionsKey} = ${JSON.stringify(item.options)}`;
      console.log(4444444, str);
    }
  });
  return str;
};

const formatFormItemStr = (item: FormItem) => {
  let str = "";
  if (item.inputType === "select") {
    str = `
    <el-form-item label="${item.label}" prop="${item.prop}">
     <el-select v-model="form.${item.prop}" placeholder="${formatPlaceholder(item)}" clearable filterable ${item.multiple ? "multiple" : ""} ${
      item.disabled ? ':disbled="item.disabled"' : ""
    } >
        <el-option v-for="item in ${item.optionsKey ?? "options"}" :key="item.value" :label="item.label" :value="item.value" />
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
    if (item.type?.includes("range")) {
      str = `
    <el-form-item label="${item.label}" prop="${item.prop}">
    <el-date-picker clearable
        v-model="form.${item.prop}"        type="${item.type ?? "date"}"
        range-separator="${item?.["range-separator"] ? item?.["range-separator"] : "-"}"
        start-placeholder="${item?.["start-placeholder"] ? item?.["start-placeholder"] : ""}"
        end-placeholder="${item?.["end-placeholder"] ? item?.["end-placeholder"] : ""}"
        placeholder="${formatPlaceholder(item)}" value-format="${item?.["value-format"] ? item?.["value-format"] : "yyyy-MM-dd"}"
      />
    </el-form-item>
    `;
    } else {
      str = `
    <el-form-item label="${item.label}" prop="${item.prop}">
    <el-date-picker
    clearable
        v-model="form.${item.prop}"        type="${item.type ?? "date"}"
        placeholder="${formatPlaceholder(item)}" value-format="${item?.["value-format"] ? item?.["value-format"] : "yyyy-MM-dd"}"
      />
    </el-form-item>
    `;
    }
  }
  return str;
};

export const renderStr = (data: FormConfig) => {
  let formInitialValues = "";
  let formRules: Record<string, any> = {};
  let formStr = `
  <template>
    <el-dialog :title="title" width="50%" v-model="visible" >

    <el-form class="form" status-icon :model="form" :rules="rules" ref="${data.formConfig?.refName ?? "formRef"}"   size="${
    data?.formConfig?.size ?? "default"
  }" ${data?.formConfig?.inline ? "inline" : ""} label-width="${data?.formConfig?.labelWidth ?? "100px"}">`;

  // 遍历 item 数组
  data.items.forEach((fItem) => {
    //1. k,v 字符串
    formInitialValues += "" + fItem.prop + ":" + fItem.value + ",\n";
    // 2. 格式化 rules
    //默认都是 true
    formRules[fItem.prop] = [
      {
        required: fItem?.required ?? true,
        message: formatPlaceholder(fItem),
        trigger: fItem?.trigger ?? "change",
      },
    ];

    // 3. init optionKey
    if (fItem.inputType === "select") {
      if (!fItem.optionsKey) {
        fItem.optionsKey = fItem.prop + "Options";
      }
    }

    // 4. form Item str
    formStr += formatFormItemStr(fItem);
  });

  // confirm str
  formStr += `
          <el-row type="flex" justify="center">
            <el-button type="primary"  @click="submitForm(${data.formConfig?.refName ?? "formRef"})">确定</el-button>
            <el-button   @click="resetForm(${data.formConfig?.refName ?? "formRef"})">取消</el-button>
         </el-row>
        </el-form> 
      </el-dialog>
    `;

  let tableStr = `

    <el-row style="margin-bottom: 20px">
      <el-button @click="add">add</el-button>
      <el-button @click="batchDelete(false)" type="danger"> 批量删除 </el-button>
</el-row>


<el-table v-loading="loading" :data="table.data" @selection-change="handleSelect">
 <el-table-column type="selection" width="55" >  </el-table-column>`;

  data.items.forEach((item) => {
    tableStr += `
       <el-table-column prop="${item.prop}" label="${item.label}"  align="center" >  </el-table-column>`;
  });

  tableStr += `
<el-table-column prop="ac" label="操作" align="center">
        <template #default="scope">
          <el-button type="text" size="small" @click="editColumn(scope.row)">修改</el-button>
          <el-button type="danger" size="small" @click="batchDelete(true,scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end" style="margin-top: 20px">
      <el-pagination
        :page-sizes="[10, 20, 50, 100]"
        background
        layout="prev, pager, next, sizes, total"
        :current-page="table.page"
        @update:current-page="handleCur"
        @update:page-size="handleSizeChange"
        :page-size="table.pageSize"
        :total="table.total"
      />
    </el-row>
    </template>

`;

  let scriptStr = `
<script lang="ts" setup>
import { reactive, ref } from "vue";

import { FormInstance, FormRules,ElMessageBox } from "element-plus";
import {getExamList,deleteExam} from '@/api/user';
const formRef = ref<FormInstance>();
const instance = getCurrentInstance();
const visible = ref(false)
const title = ref('')


interface User {
  date: string
  name: string
  address: string
}

let form = reactive({
  ${formInitialValues}
});
const table = ref<{
  page:number,
  pageSize:number,
  total:number,
  data:User[],
  selected:User[],
}>({
 page: 1,
    pageSize: 10,
    total: 0,
    data: [],
    selected: [],
})
const loading = ref(false)
const rules = reactive<FormRules>(
  ${JSON.stringify(formRules)}
);
const handleSelect = (selected:User[])=>{
    table.value.selected = [...selected];
}
const submitForm = async (formEl: FormInstance | undefined) => {
    console.log(444,form)
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const add = ()=>{
    visible.value = true;
}

const resetTable = () => {
  table.value.page = 1;
  table.value.pageSize = 10;
  table.value.total = 0;
  table.value.data = [];
  table.value.selected = [];
};

const editColumn= (row:User)=>{
    visible.value = true;
    nextTick(() => {
    [...Object.entries(form)].forEach(([k, v]) => {
      form[k] = row[k];
    });
  });
   // instance?.refs?.addOrUpdateRef?.init(scope.row);
}

const batchDelete= (onlyOne:boolean, id:number)=>{
  if(!onlyOne && !table.value.selected.length){
    return ElMessage({
              type: "warning",
              message: "请先选择要删除的行",
            });
  }
  let mesg = onlyOne ? '确认删除该数据' : '确认删除已选择的数据';
  let data = onlyOne ? {id}: [...table.value.selected]
   ElMessageBox.confirm(mesg, "Warning", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
      autofocus: false,
    })
      .then(() => {
        deleteExam(data)
          .then((res) => {
            ElMessage({
              type: "success",
              message: "删除成功",
            });
            resetTable();
            initTableData();
          })
          .catch((err) => {
            ElMessage({
              type: "info",
              message: "删除失败,请重试",
            });
            resetTable();
            initTableData();
          });
      })
      .catch(() => {});
  
}


  const handleSizeChange = (val:number) => {
    table.value.pageSize = val;
    initTableData({
      pageSize: val,
    });
  };
  const handleCur = (val:number) => {
    table.value.page = val;
    initTableData({
      page: val,
    });
  };
    
  const initTableData = (data?:Record<string,any>)=>{
        table.value.selected = [];
            getExamList({
        page: table.value.page,
        pageSize: table.value.pageSize,
        ...data
      })
          .then((res) => {
            loading.value = false;
            table.value.data = res?.data ?? [];
            table.value.total = res?.recordsTotal ?? 0;
          })
          .catch((err) => {
            loading.value = false;
            table.value.data = [];
            table.value.total = 0;
          });
  }

onMounted(() => {
  initTableData();
});



const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  visible.value = false;
  formEl.resetFields();
  initTableData();
};

${renderFormOptions(data)}

</script>
  `;

  const styleStr = `
  <style lang="scss" scoped>
  .form{
      --el-component-size: 36px;
  }
</style>
  `;

  return formStr + tableStr.trim() + scriptStr.trim() + styleStr;
};
