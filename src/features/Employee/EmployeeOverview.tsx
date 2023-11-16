import { Table } from "antd";
import { useGetAllEmployees } from "../../hooks/useGetAllEmployees";
import { ColumnsType } from "antd/es/table";
import { SearchOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Input, Space } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { useNavigate } from "react-router";


interface DataType {
    key: string;
    name: string;
    projects:string;
    utilizationType:string;
    utilizationAmount:number;
    languages: string;
    skills:string;
  }
  
  type DataIndex = keyof DataType;
  
  const dummyData: DataType[] = [
    {
      key: '1',
      name: 'John Doe',
      projects: 'Time Tracker, HR Dashboard, E-commerce Platform',
      utilizationType: 'Full-time',
      utilizationAmount: 80,
      languages: 'English, German, Spanish',
      skills: 'HTML, JavaScript, React, .NET',
    },
    {
      key: '2',
      name: 'Jane Smith',
      projects: 'Inventory Management, CRM System',
      utilizationType: 'Part-time',
      utilizationAmount: 50,
      languages: 'English, French',
      skills: 'Java, Python, Database Management',
    },
    {
      key: '3',
      name: 'Alice Johnson',
      projects: 'E-learning Platform, Mobile App Development',
      utilizationType: 'Full-time',
      utilizationAmount: 100,
      languages: 'English, Spanish',
      skills: 'JavaScript, React Native, Ruby on Rails',
    },
    {
      key: '4',
      name: 'Bob Williams',
      projects: 'E-commerce Website, Content Management System',
      utilizationType: 'Full-time',
      utilizationAmount: 90,
      languages: 'English, Italian',
      skills: 'HTML/CSS, JavaScript, PHP, WordPress',
    },
    {
      key: '5',
      name: 'Eva Davis',
      projects: 'Online Booking System, Data Analytics Dashboard',
      utilizationType: 'Part-time',
      utilizationAmount: 60,
      languages: 'English, Spanish, Portuguese',
      skills: 'Python, Data Analysis, Machine Learning',
    },
    {
      key: '6',
      name: 'Mike Wilson',
      projects: 'E-commerce Platform, Inventory Management',
      utilizationType: 'Full-time',
      utilizationAmount: 100,
      languages: 'English, French, German',
      skills: 'Java, Python, Spring Boot, SQL',
    },
    {
      key: '7',
      name: 'Olivia Brown',
      projects: 'HR Management System, Event Registration Website',
      utilizationType: 'Part-time',
      utilizationAmount: 40,
      languages: 'English, Spanish',
      skills: 'HTML/CSS, JavaScript, React, Node.js',
    },
    {
      key: '8',
      name: 'Daniel Lee',
      projects: 'E-commerce Website, Content Management System',
      utilizationType: 'Full-time',
      utilizationAmount: 70,
      languages: 'English, Chinese',
      skills: '.NET, C#, SQL Server, Azure',
    },
    {
      key: '9',
      name: 'Sophia Hall',
      projects: 'Social Media App, E-commerce Platform',
      utilizationType: 'Full-time',
      utilizationAmount: 95,
      languages: 'English, Spanish',
      skills: 'HTML/CSS, JavaScript, React, Node.js, AWS',
    },
    {
      key: '10',
      name: 'William Turner',
      projects: 'Online Learning Platform, E-commerce Website',
      utilizationType: 'Part-time',
      utilizationAmount: 60,
      languages: 'English, German',
      skills: 'Java, Spring Boot, JavaScript, Angular',
    },
  ];

const EmployeeOverview: React.FC =() =>{
    // const {data:employeeData, isLoading} = useGetAllEmployees();
    // if(employeeData){
    //   console.log(employeeData);
    // }

    const navigate = useNavigate();

    
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
  
    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
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
  
    const columns: ColumnsType<DataType> = [
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
    


    return  <div className="employee-overview-main-div">
        <Table columns={columns} dataSource={dummyData} style={{width:"90%"}} />
    </div>;
}

export default EmployeeOverview;


