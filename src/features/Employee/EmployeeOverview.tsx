import { Skeleton, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Input, Space } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { useGetEmployeeOverview } from "../../hooks/useGetEmployeeOverview";
import { EmployeeOverviewType } from "../../types/EmployeeOverviewType";

type DataIndex = keyof EmployeeOverviewType;

const EmployeeOverview: React.FC =() =>{
    const {data:employeeData, isLoading} = useGetEmployeeOverview();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [empl, setEmpl] = useState<any>();

    useEffect(()=>{
      if(employeeData){
        setEmpl(employeeData)
      }
    }, [employeeData])
  
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
  
    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<EmployeeOverviewType> => ({
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
  
    const columns: ColumnsType<EmployeeOverviewType> = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        ...getColumnSearchProps('name'),
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Projects',
        dataIndex: 'projects',
        key: 'projects',
        ...getColumnSearchProps('projects'),
        sorter: (a, b) => a.projects.localeCompare(b.projects),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Utilization Type',
        dataIndex: 'utilizationType',
        key: 'utilizationType',
        ...getColumnSearchProps('utilizationType'),
        sorter: (a, b) => a.utilizationType.localeCompare(b.utilizationType),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Utilization Amount',
        dataIndex: 'utilizationAmount',
        key: 'utilizationAmount',
        ...getColumnSearchProps('utilizationAmount'),
        sorter: (a, b) => a.utilizationAmount - b.utilizationAmount,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Languages',
        dataIndex: 'languages',
        key: 'languages',
        ...getColumnSearchProps('languages'),
        sorter: (a, b) => a.languages.localeCompare(b.languages),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Skills',
        dataIndex: 'skills',
        key: 'skills',
        ...getColumnSearchProps('skills'),
        sorter: (a, b) => a.skills.localeCompare(b.skills),
        sortDirections: ['descend', 'ascend'],
      },
    ];
    

    return ( isLoading ? <Skeleton /> : <div className="employee-overview-main-div">
        <Table columns={columns} dataSource={empl} style={{width:"90%"}} onRow={(record)=>({
          onClick:()=>(console.log("row clicked!", record))
        })} />
    </div>);
}

export default EmployeeOverview;