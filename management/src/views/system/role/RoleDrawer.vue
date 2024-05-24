<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" showFooter :title="getTitle" width="500px" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree v-model:value="model[field]" :treeData="treeData" :replaceFields="{ title: 'title', key: 'id' }"
          checkable toolbar title="菜单分配" />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue';
import { BasicForm, useForm } from '/@/components/Form/index';
import { formSchema } from './role.data';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
import { BasicTree, TreeItem } from '/@/components/Tree';

import { getMenuList, getRole, addRole, updateRole } from '/@/api/demo/system';
import { message } from 'ant-design-vue';

export default defineComponent({
  name: 'RoleDrawer',
  components: { BasicDrawer, BasicForm, BasicTree },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const treeData = ref<TreeItem[]>([]);
    const rowId = ref(null);

    const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
      labelWidth: 90,
      schemas: formSchema,
      showActionButtonGroup: false,
    });

    const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
      resetFields();
      setDrawerProps({ confirmLoading: false });
      // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
      if (unref(treeData).length === 0) {
        treeData.value = (await getMenuList()) as any as TreeItem[];
      }
      isUpdate.value = !!data?.isUpdate;

      if (unref(isUpdate)) {
        rowId.value = data.record?.id
        getRole(data.record?.id).then((res: any) => {
          console.log('get res:', res)
          setFieldsValue({
            ...res,
          });
        })
      }
    });

    const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

    async function handleSubmit() {
      try {
        const values = await validate();
        setDrawerProps({ confirmLoading: true });


        console.log(values);
        let res
        const data = {
          id: rowId.value,
          ...values,
        }
        if (!unref(isUpdate))
          res = await addRole(data)
        else res = await updateRole(data)

        if (res) {
          // TODO custom api
          message.success(unref(isUpdate) ? '编辑成功' : '新增成功')
          closeDrawer();
          emit('success');
        }
      } finally {
        setDrawerProps({ confirmLoading: false });
      }
    }

    return {
      registerDrawer,
      registerForm,
      getTitle,
      handleSubmit,
      treeData,
    };
  },
});
</script>
