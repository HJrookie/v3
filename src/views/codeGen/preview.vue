<template>
  <div class="compass-form">
    <div>
      <template v-if="item.inputType === 'select'">
        <el-select
          v-model="item.value"
          filterable
          value-key="value"
          :multiple="item.multiple"
          :placeholder="formatPlaceholder(item)"
          :style="item.style"
          clearable
          :disabled="item.disabled"
        >
          <el-option v-for="(option, j) of getOptions(item.options)" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
      </template>

      <template v-else-if="item.inputType === 'input'">
        <el-input v-model="item.value" :placeholder="formatPlaceholder(item)" :style="item.style" clearable />
      </template>

      <template v-else-if="item.inputType === 'inputNumber'">
        <el-input-number v-model="item.value" :min="0" :max="100" :label="formatPlaceholder(item)"></el-input-number>
      </template>

      <template v-else-if="item.inputType === 'date'">
        <el-date-picker
          v-model="item.value"
          style="width: 100%"
          :value-format="formatDateValue(item.format)"
          :type="item.dateType"
          :placeholder="formatPlaceholder(item)"
          :range-separator="item.dateRangeSeparator"
          :start-placeholder="item.dateStartPlaceholder"
          :end-placeholder="item.dateEndPlaceholder"
        />
      </template>
      <template v-else-if="item.inputType === 'check'">
        <!--            todo  这个是单选,多选的代码没来得及写-->
        <el-checkbox v-model="item.value" />
      </template>

      <template v-else-if="item.inputType === 'input-textarea'">
        <el-input v-model="item.value" type="textarea" :placeholder="formatPlaceholder(item)" :style="item.style" />
      </template>
    </div>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import { uuid } from "@/utils";

export default {
  name: "MyForm",

  props: {
    item: {},
  },
  created() {

    console.log(this.item);
  },
  data() {
    return {
      uploadImgHeaders: {
        JSESSIONID: getToken(),
      },
      current: [],
      picturePreviewVisible: false,
      picturePreviewUrl: "",
      loading: false,
    };
  },
  computed: {},
  methods: {
    getOptions(options) {
      if (!options) {
        return [];
      }
      if (typeof options === "string" && !options?.trim()) {
        return [];
      }
      // 可以是一个数组,如果是数组,就用里面的选项
      if (Array.isArray(options)) {
        return [...options];
      }
      if (Object.prototype.toString.call(options) === "[object Object]") {
        // l(33, this.dict?.type[options.dictName], options.dictName);

        if (options.ajax) {
          if (this.loading) {
            return [];
          }
          return this.dict?.type[options.dictName] ?? [];
        }
        return [];
      }

      // 如果包含下划线 , 代表是维护在字典表里(也就是数据库中的),
      if (options.includes("_")) {
        return (
          this.dict?.type[options]?.map((v) => ({
            label: v.label,
            value: v.value,
          })) ?? []
        );
      }
      // 从 vuex 中取的数据, 在 src/store/modules/user.js
      return this.dicts[options] ?? [];
    },
    formatPlaceholder(item) {
      if (!item || item.blankPlaceholder) {
        return "";
      }
      if (item.placeholder) {
        return item.placeholder;
      }
      const map = {
        select: "请选择",
        input: "请输入",
        date: "请选择",
      };
      return `${map[item.inputType] ?? ""}${item.label}`;
    },
    getFormData() {
      return this.data.items.reduce(
        (prev, cur) => ({
          ...prev,
          [cur.prop]: cur.value,
        }),
        {}
      );
    },
    formatDateValue(format) {
      const defaultValue = "yyyy-MM-dd HH:mm:ss";
      return format || defaultValue;
    },
    resetFormData() {
      const formName = this.data.formConfig.ref || "defaultRef";
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped></style>
