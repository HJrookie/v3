<template>
  <div class="app-container">
    <el-form ref="ruleFormRef" :model="form" :rules="formRules" label-width="100px" inline>
      <el-form-item label="学校名称" prop="schoolName">
        <el-select v-model="form.schoolName" class="m-2" placeholder="请选择学校" filterable>
          <el-option v-for="item in schoolNames" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="班级名称" prop="className">
        <el-input v-model="form.className" clearable />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()"> 查询 </el-button>
        <el-button @click="resetForm()"> 清空 </el-button>
      </el-form-item>
    </el-form>

    <el-row style="margin-bottom: 20px">
      <el-button type="primary" @click="addNew()"> 新建 </el-button>
      <el-button @click="batchDelete()"> 批量删除 </el-button>
    </el-row>

    <el-table v-loading="loading" :data="table.data" style="width: 100%" @selection-change="handleSelect">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="班级名称" width="180" align="center" />
      <el-table-column prop="schoolName" label="学校名称" align="center" />
      <el-table-column prop="nameDescribe" label="描述" align="center" />
      <el-table-column prop="updateTime" label="更新时间" align="center" />
      <el-table-column prop="ac" label="操作" align="center">
        <template #default="scope">
          <el-button type="text" size="small" @click="editColumn(scope)">修改</el-button>
          <el-button type="danger" size="small" @click="batchDelete(scope.row.id)">删除</el-button>
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

    <add-or-update ref="addOrUpdateRef" @query="initTableData"></add-or-update>
  </div>
</template>

<script setup>
import AddOrUpdate from "./add-or-update.vue";
import { deleteSchool, getSchoolList } from "@/api/school";
import { useFormAndTable } from "@/components/Table";
const instance = getCurrentInstance();

const schoolNames = ref([]);

// table
const { form, formRules, table, loading, addNew, resetForm, initTableData, editColumn, submitForm, batchDelete, handleSizeChange, handleCur, handleSelect } =
  useFormAndTable({
    instance: instance, // 当前的vue 实例
    tableInfo: {
      apiInfo: {
        getDataApi: getSchoolList,
        deleteDataApi: deleteSchool,
        deleteDataFormatter: (v) => v.id,
      },
      initOnMounted: true,
      queryFormatter: () => ({ parentId: form.value.schoolName, name: form.value.className }), // 0是学校,1 是班级
    },
    addOrUpdateRefName: "addOrUpdateRef",
    formInfo: {
      formRefName: "ruleFormRef",
      fields: [
        {
          propName: "schoolName",
          value: undefined,
        },
        {
          propName: "className",
          value: undefined,
        },
      ],
    },
  });

onMounted(() => {
  getSchoolList({})
    .then((res) => {
      schoolNames.value = (res?.data ?? []).map((v) => ({ label: v.name, value: v.id }));
    })
    .catch((err) => {});
  // schoolNames.value = []
});

// add or update
</script>
