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
import { text } from "stream/consumers";
import { NavLink } from "react-router-dom";


interface DataType {
    key: string;
    name: string;
    description:string;
    tags:string;
    active:string;
    hiring:string;
  }
  
  type DataIndex = keyof DataType;

  const dummyData: DataType[] = [
    {
      key: '1',
      name: 'WebDev Solutions',
      description: 'Specializing in custom web development for small and medium-sized businesses.',
      tags: 'E-commerce, Content Management Systems, Web Design',
      active: "true",
      hiring: "false",
    },
    {
      key: '2',
      name: 'DigitalCraft Web Studio',
      description: 'Crafting digital experiences that drive engagement and results.',
      tags: 'Responsive Web Design, Mobile Apps, SEO',
      active: "true",
      hiring: "false",
    },
    {
      key: '3',
      name: 'TechPulse Innovations',
      description: 'Innovative web and mobile app development agency delivering cutting-edge solutions.',
      tags: 'Web Development, Mobile Apps, Software Solutions',
      active: "true",
      hiring: "true",
    },
    {
      key: '4',
      name: 'CodeMasters Inc.',
      description: 'Your partner for creating beautiful and functional websites.',
      tags: 'Frontend Development, UI/UX Design, Web Apps',
      active: "true",
      hiring: "true",
    },
    {
      key: '5',
      name: 'PixelPerfect Design Studios',
      description: 'Turning your web and mobile design visions into pixel-perfect realities.',
      tags: 'Web Design, Graphic Design, Branding',
      active: "true",
      hiring: "false",
    },
    {
      key: '6',
      name: 'InfiniteBytes Web Solutions',
      description: 'Creating web solutions that push the boundaries of technology.',
      tags: 'Web Development, Cloud Integration, E-commerce',
      active: "true",
      hiring: "true",
    },
    {
      key: '7',
      name: 'WebWizards Hub',
      description: 'Unleash the magic of the web with our wizardry in web development.',
      tags: 'Web Development, SEO, E-commerce',
      active: "true",
      hiring: "false",
    },
    {
      key: '8',
      name: 'WebCrafters Inc.',
      description: 'Crafting web experiences that inspire and engage your audience.',
      tags: 'Frontend Development, Content Management Systems, UI/UX Design',
      active: "true",
      hiring: "true",
    },
    {
      key: '9',
      name: 'CyberWeb Innovators',
      description: 'Innovative web solutions for the modern digital landscape.',
      tags: 'Web Development, Cybersecurity, Mobile Apps',
      active: "true",
      hiring: "false",
    },
    {
      key: '10',
      name: 'FusionWeb Creations',
      description: 'Creating unique web and mobile experiences that stand out.',
      tags: 'Web Development, Mobile App Design, E-commerce',
      active: "true",
      hiring: "true",
    },
  ];

const ProjectOverview: React.FC =() =>{

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
        render: (text:any, render: DataType)=>{
            return  <NavLink  to={`/project/${render.key}`} className={"drawer-navlink"}>{render.name}</NavLink>
        },
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'projedescriptioncts',
        ...getColumnSearchProps('description'),
        sorter: (a, b) => a.description.localeCompare(b.description),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags',
        ...getColumnSearchProps('tags'),
        sorter: (a, b) => a.tags.localeCompare(b.tags),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Active',
        dataIndex: 'active',
        key: 'active',
        ...getColumnSearchProps('active'),
        sorter: (a, b) => Number(a.active) - Number(b.active),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Hiring',
        dataIndex: 'hiring',
        key: 'hiring',
        ...getColumnSearchProps('hiring'),
        sorter: (a, b) => Number(a.hiring) - Number(b.hiring),
        sortDirections: ['descend', 'ascend'],
      },
    ];
    

    // const {data, isLoading} = useGetAllProjects();
    // if(data){
    //     console.log(data);
    // }
    return   <div className="employee-overview-main-div">
    <Table columns={columns} dataSource={dummyData} style={{width:"90%"}}/>
</div>;
}

export default ProjectOverview;