
export function useForm(props) {
  const { fields = [], instance } = props;
  const { _form, _formRules } = (fields ?? []).reduce(
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

  const resetForm = (formEl) => {
    if (!formEl) {
      return;
    }
    instance.refs?.[formRefName]?.resetFields();
  };

  return {
    form,
    formRules,
    resetForm,
  };
}
