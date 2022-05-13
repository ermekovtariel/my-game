import { Card, Table } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

function TableComponent({ changeHandleer }) {
  const names = ['NOW', 'Game History'];
  const myName = useSelector((store) => store.auth.auth);
  const history = useSelector((store) => store.history.history);
  changeHandleer.name = myName;
  const dataSource = [changeHandleer];

  const keyHistory = history.map((item, idx) => ({
    name: item.name,
    true: item.true,
    false: item.false,
    count: item.count,
    key: `${idx}-${item.name}`,
  }));

  const keyDataSource = dataSource.map((item, idx) => ({
    name: item.name,
    true: item.true,
    false: item.false,
    count: item.count,
    key: `${idx}_${item.name}`,
  }));

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'true',
      dataIndex: 'true',
      key: 'true',
    },
    {
      title: 'false',
      dataIndex: 'false',
      key: 'false',
    },
    {
      title: 'count',
      dataIndex: 'count',
      key: 'count',
    },
  ];

  return names.map((item) => {
    return (
      <Card key={item} title={`${item}`}>
        <Table
          dataSource={item === 'Game History' ? keyHistory : keyDataSource}
          columns={columns}
        />
      </Card>
    );
  });
}

export default TableComponent;
