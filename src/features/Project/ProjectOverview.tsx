import { Skeleton, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { SearchOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Input, Space } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { NavLink } from "react-router-dom";
import { ProjectOverviewType } from "../../types/ProjectOverviewType";
import { useGetProjectOverview } from "../../hooks/useGetProjectOverview";

  type DataIndex = keyof ProjectOverviewType;

const ProjectOverview: React.FC =() =>{

  const {data, isLoading} = useGetProjectOverview();
    
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
  
    const handleSearch = (
      selectedKeys: string[],
      confirm: (param?: FilterConfirmProps) => void,
      dataIndex: DataIndex,
    ) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
  
    const handleReset = (clearFilters: () => void) => {
      clearFilters();
      setSearchText('');
    };
  
    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<ProjectOverviewType> => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText((selectedKeys as string[])[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />

        ) : (
          text
        ),
    });
  
    const columns: ColumnsType<ProjectOverviewType> = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        ...getColumnSearchProps('Name'),
        sorter: (a, b) => a.Name.localeCompare(b.Name),
        sortDirections: ['descend', 'ascend'],
        render: (text:any, render: any)=>{
            return  <NavLink  to={`/project/${render.key}`} className={"drawer-navlink"}>{render.name}</NavLink>
        },
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        ...getColumnSearchProps('Description'),
        sorter: (a, b) => a.Description.localeCompare(b.Description),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags',
        ...getColumnSearchProps('Tags'),
        sorter: (a, b) => a.Tags.localeCompare(b.Tags),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Active',
        dataIndex: 'active',
        key: 'active',
        ...getColumnSearchProps('Active'),
        sorter: (a, b) => a.Active.localeCompare(b.Active),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Hiring',
        dataIndex: 'hiring',
        key: 'hiring',
        ...getColumnSearchProps('Hiring'),
        sorter: (a, b) => a.Hiring.localeCompare(b.Hiring),
        sortDirections: ['descend', 'ascend'],

      },
    ];

    return   (isLoading ? <Skeleton /> :<div className="employee-overview-main-div">
    <Table columns={columns} dataSource={data} style={{width:"90%"}}/>
</div>);
}

export default ProjectOverview;