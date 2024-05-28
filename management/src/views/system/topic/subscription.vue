<template>
    <div>
      <BasicTable @register="registerTable" :searchInfo="searchInfo">
      </BasicTable>
    </div>
  </template>
  <script lang="ts">
    import { defineComponent, reactive } from 'vue';
  
    import { BasicTable, useTable, TableAction } from '/@/components/Table';
    import { getSubscriptionPage } from '/@/api/system/extra';
  
    import { useModal } from '/@/components/Modal';
  
    import { columns, searchFormSchema } from './subscription.data';
  
    export default defineComponent({
      name: 'SubscriptionManagement',
      components: { BasicTable, TableAction },
      setup() {
        const [registerModal, { openModal }] = useModal();
        const searchInfo = reactive<Recordable>({});
        const [registerTable, { reload, updateTableDataRecord }] = useTable({
          title: '订阅列表',
          api: getSubscriptionPage,
          rowKey: 'id',
          columns,
          formConfig: {
            labelWidth: 120,
            schemas: searchFormSchema,
            autoSubmitOnEnter: true,
          },
          useSearchForm: true,
          showTableSetting: true,
          bordered: true,
          handleSearchInfoFn(info) {
            console.log('handleSearchInfoFn', info);
            return info;
          },
        });
  
        function handleCreate() {
          openModal(true, {
            isUpdate: false,
          });
        }
  
  
  
        function handleSuccess({ isUpdate, values }) {
          if (isUpdate) {
            // 演示不刷新表格直接更新内部数据。
            // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
            const result = updateTableDataRecord(values.id, values);
            console.log(result);
          } else {
            reload();
          }
        }
  
        function handleSelect(deptId = '') {
          searchInfo.deptId = deptId;
          reload();
        }

  
        return {
          registerTable,
          registerModal,
          handleCreate,
          handleSuccess,
          handleSelect,
          searchInfo,
        };
      },
    });
  </script>
  