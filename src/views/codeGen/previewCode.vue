<template>
  <el-dialog v-model="visible" :title="title" width="600px">


  </el-dialog>
</template>

<script setup>
import { useForm } from "@/components/Form";
import { getCurrentInstance, nextTick } from "vue";
// import { addNewSchool, editSchool, getSchoolList } from "@/api/school";
import { ElMessage } from "element-plus";
const title = ref("");
const visible = ref(false);
const schoolNames = ref([]);
const emit = defineEmits(["query"]);

// form

defineExpose({ init });
</script>
