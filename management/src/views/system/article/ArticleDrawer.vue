<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="100%"
    @ok="handleSubmit"
  >
    <a-form size="large">
      <a-row>
        <a-col flex="1">
          <a-form-item name="title">
            <a-input placeholder="填写标题，不超过150字" size="large" />
          </a-form-item>

          <a-form-item>
            <Tinymce width="100%" />
          </a-form-item>
        </a-col>

        <a-col flex="20px">
          <a-divider type="vertical" style="height: 100%" size="large" />
        </a-col>

        <a-col flex="330px">
          <a-form-item name="userId">
            <a-select placeholder="选择用户" size="large" />
          </a-form-item>

          <a-form-item>
            <a-select placeholder="选择分类" size="large" />
          </a-form-item>

          <a-form-item>
            <a-select placeholder="添加标签，以','分割'" size="large" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #extra>
      <a-space>
        <a-button @click="onClose">Cancel</a-button>
        <a-button type="primary" @click="onClose">Submit</a-button>
      </a-space>
    </template>


  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import { getArticle, updateArticle, addArticle, getAllCateList } from '/@/api/system/extra';
  import { message } from 'ant-design-vue';
  import { Tinymce } from '/@/components/Tinymce/index';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref(null);

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      rowId.value = data.record.id;
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增文章' : '编辑文章'));

  async function handleSubmit() {
    try {
      //   const values = await validate();
      setDrawerProps({ confirmLoading: true });

      let res;
      const data = {
        id: rowId.value,
        // ...values,
      };
      if (!unref(isUpdate)) res = await addArticle(data);
      else res = await updateArticle(data);

      if (res) {
        // TODO custom api
        message.success(unref(isUpdate) ? '编辑成功' : '新增成功');
        closeDrawer();
        emit('success');
      }
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
