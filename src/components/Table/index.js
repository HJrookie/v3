import { onMounted } from "vue";
import { getInnerType } from "@/utils";
import { ElMessageBox, ElMessage } from "element-plus";
import { Delete } from "@element-plus/icons-vue";

export function useFormAndTable(props) {
  const { instance, formInfo, tableInfo, addOrUpdateRefName } = props;
  const { fields: formFields, formRefName } = formInfo;
  const { apiInfo = {}, queryFormatter, initOnMounted } = tableInfo;
  const { getDataApi, deleteDataApi, deleteDataFormatter, headers = {} } = apiInfo;
  const loading = ref(false);
  const table = ref({
    page: 1,
    pageSize: 10,
    total: 0,
    data: [],
    selected: [],
  });
  // init form and rules
  const { _form, _formRules } = (formFields ?? []).reduce(
    (prev, cur) => {
      const prop = cur?.propName ?? "";
      prev._form[prop] = cur?.value ?? undefined;
      prev._formRules[prop] = cur?.rules ?? [];
      return prev;
    },
    { _form: {}, _formRules: {} }
  );
  const form = ref({ ..._form });
  const formRules = ref({ ..._formRules });

  /*
   * 常见操作 -->  查询列表 新增 编辑 删除
   * */
  const initTableData = (data) => {
    table.value.selected = [];
    const basicQueryData = {
      page: table.value.page,
      pageSize: table.value.pageSize,
    };

    data = { ...basicQueryData, ...(queryFormatter?.(form.value) ?? {}), ...(data ?? {}) };

    if (getDataApi) {
      loading.value = true;
      getDataApi?.(data)
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
  };

  const addNew = () => {
    instance.refs?.[addOrUpdateRefName]?.init();
  };
  const editColumn = (scope) => {
    l("rr", scope.row);
    instance.refs?.[addOrUpdateRefName]?.init(scope.row);
  };

  const resetTable = () => {
    table.value.page = 1;
    table.value.pageSize = 10;
    table.value.total = 0;
    table.value.data = [];
    table.value.selected = [];
  };
  const batchDelete = (id) => {
    if (!deleteDataApi || !deleteDataFormatter) {
      return;
    }
    const isOnlyOne = ["String", "Number"].includes(getInnerType(id)); // 只有一条数据
    // 如果是多选,那么必须要 先选中,否则就退出
    if (!isOnlyOne && !table.value.selected?.length) {
      ElMessage({
        type: "info",
        message: "请先选择要删除的数据",
      });
      return;
    }
    const data = isOnlyOne ? [+id] : table.value.selected?.map((colData) => deleteDataFormatter(colData));
    console.log(3333333, data);
    ElMessageBox.confirm("确认删除已选择的数据?", "Warning", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
      autofocus: false,
    })
      .then(() => {
        deleteDataApi(data)
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
  };

  /*
   *  hook  钩子函数
   * */
  if (initOnMounted) {
    onMounted(() => {
      initTableData();
    });
  }

  /*
   *
   * 分页逻辑
   * */
  const handleSizeChange = (val) => {
    table.value.pageSize = val;
    initTableData({
      pageSize: val,
    });
  };
  const handleCur = (val) => {
    table.value.page = val;
    initTableData({
      page: val,
    });
  };

  const handleSelect = (selected) => {
    table.value.selected = [...selected];
    console.log(88, table.value);
  };

  /*
   * init form and rules
   */

  const resetForm = (formEl) => {
    if (!formEl) {
      instance.refs?.[formRefName]?.resetFields();
      initTableData();
      return;
    }
    const type = getInnerType(formEl);
    if (type === "String") {
      instance.refs?.[formEl]?.init(scope.row);
    } else if (type === "Object") {
      formEl?.value?.init(scope.row);
    }
    initTableData();
  };

  const submitForm = async (formEl) => {
    await instance.refs?.[formRefName]?.validate((valid, fields) => {
      if (valid) {
        console.log("submit!");
        initTableData();
      } else {
        console.log("error submit!", fields);
      }
    });
  };

  return {
    form,
    formRules,
    table,
    loading,
    addNew,
    resetForm,
    submitForm,
    editColumn,
    batchDelete,
    initTableData,
    handleSizeChange,
    handleCur,
    handleSelect,
  };
}
