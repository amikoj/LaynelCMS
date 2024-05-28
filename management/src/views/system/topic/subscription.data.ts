import { getAllRoleList } from '/@/api/demo/system';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import dayjs from 'dayjs';

export const columns: BasicColumn[] = [
    {
        title: '专题名称',
        dataIndex: 'name',
        width: 120,
    },
    {
        title: '订阅用户',
        dataIndex: 'user',
        width: 220,
    },
    {
        title: '付费类型',
        dataIndex: 'type',
        width: 80,
        format: (text) => {
            return String(text) === '1' ? '免费' : '付费'
        }
    }, {
        title: '付费金额',
        dataIndex: 'money',
        width: 80,
    }, {
        title: '来源系统',
        dataIndex: 'source',
        width: 80,
    },
    {
        title: '记录类型',
        dataIndex: 'status',
        width: 80,
        format: (text) => {
            return String(text) === '1' ? '订阅' : '取消订阅'
        }
    }, {
        title: '备注',
        dataIndex: 'comment',
        width: 120,
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        width: 180,
        format(text) {
            return dayjs(text).format('YYYY-MM-DD HH:mm');
        },
    }
];

export const searchFormSchema: FormSchema[] = [
    {
        field: 'name',
        label: '专题名称',
        component: 'Input',
        colProps: { span: 8 },
    },
];

