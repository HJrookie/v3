<template>
  <el-dialog v-model="visible" :title="title" width="600px">
    <el-form ref="ruleFormRef" :model="form" :rules="formRules" label-width="100px">
      <el-form-item label="学校名称" prop="school">
        <el-select v-model="form.school" class="m-2" placeholder="请选择学校名称" filterable>
          <el-option v-for="item in schoolNames" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="班级名称" prop="className">
        <el-input v-model="form.className" placeholder="请输入班级名称" clearable />
      </el-form-item>

      <el-form-item label="描述信息" prop="des">
        <el-input v-model="form.des" :rows="2" type="textarea" placeholder="请输入班级描述信息" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
        <el-button @click="resetDialog"> 取消 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { useForm } from "@/components/Form";
import { getCurrentInstance, nextTick } from "vue";
import { addNewSchool, editSchool, getSchoolList } from "@/api/school";
import { ElMessage } from "element-plus";
const title = ref("");
const visible = ref(false);
const schoolNames = ref([]);
const emit = defineEmits(["query"]);

// form
const ruleFormRef = ref();
const { form, formRules } = useForm({
  fields: [
    {
      propName: "school",
      value: undefined,
      rules: [
        {
          required: true,
          message: "请选择学校",
        },
      ],
    },
    {
      propName: "className",
      value: undefined,
      rules: [
        {
          required: true,
          message: "请输入班级名称",
        },
      ],
    },
    {
      propName: "des",
      value: undefined,
      rules: [],
    },
  ],
});
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // add or save data todo
      const data = {
        name: form.value.className,
        parentId: form.value.school,
        nameDescribe: form.value.des,
        id: form.value?.id,
        type: 1, // 0是学校,1 是班级
      };
      const message = form.value?.id ? "编辑成功" : "添加成功";
      const ajax = form.value?.id ? editSchool : addNewSchool;
      ajax(data)
        .then((res) => {
          console.log(333, res);
          if (res.code === "S0007") {
            ElMessage.error("该学校已有同名班级,请重试");
          } else {
            ElMessage({
              type: "success",
              message: message,
            });
          }
          resetDialog();
          emit("query");
        })
        .catch((err) => {
          emit("query");
          resetDialog();
        });
    } else {
      console.log("error submit!", fields);
    }
  });
};
const resetDialog = () => {
  ruleFormRef.value.resetFields();
  form.value.id = undefined;
  visible.value = false;
};
const init = (data) => {
  title.value = data ? "编辑班级" : "新增班级";
  visible.value = true;
  nextTick(() => {
    ruleFormRef.value.resetFields();
    getSchoolList({ page: 1, pageSize: 10, type: 0 })
      .then((res) => {
        schoolNames.value = (res?.data ?? []).map((v) => ({ label: v.name, value: v.id }));
      })
      .catch((err) => {});
    if (data) {
      console.log(444, data);
      form.value = {
        id: data?.id ?? undefined,
        school: data?.parentId ?? 0,
        className: data?.name ?? "",
        des: data?.nameDescribe ?? "",
      };
    }
  });
};
defineExpose({ init });
</script>
