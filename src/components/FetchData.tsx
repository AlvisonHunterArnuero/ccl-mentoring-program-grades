import React, { useEffect, useState } from 'react';
import { database } from '../../firebaseConfig';
import { ref, get } from 'firebase/database';
import { Table, Tag, Flex, Button, Modal } from 'antd';
import type { TableProps } from 'antd';
import { Data } from '../types';
import {
    InfoCircleOutlined,
    PhoneOutlined,
    MailOutlined,
    CodepenOutlined,
    GithubOutlined,
    CodeSandboxOutlined,
} from '@ant-design/icons';

const FetchData: React.FC = () => {
    const [data, setData] = useState<Data[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const dataRef = ref(database, 'students');
            const snapshot = await get(dataRef);
            if (snapshot.exists()) {
                const data: Data[] = snapshot.val();
                setData(data);
            } else {
                console.log('No data available');
            }
        };

        fetchData();
    }, []);

    const columns: TableProps<Data>['columns'] = [
        {
            title: 'Batch',
            dataIndex: 'batch',
            key: 'batch',
            align: 'center',
            sorter: (a, b) => a.batch - b.batch,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            filters: [
                {
                    text: 'Krys',
                    value: 'Krys',
                },
                {
                    text: 'Ezra',
                    value: 'Ezra',
                },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) =>
                record.name.startsWith(value as string),
        },
        {
            title: 'Contact',
            dataIndex: ['profiles', 'github'],
            key: 'github',
            align: 'center',
            render: (text, record) => (
                <Flex gap="small">
                    <a
                        href={`tel:${record.phone}`}
                        title={text}
                        rel="noopener noreferrer"
                    >
                        <PhoneOutlined />
                    </a>
                    <a
                        href={`mailto:${record.email}`}
                        target="_blank"
                        title={text}
                        rel="noopener noreferrer"
                    >
                        <MailOutlined />
                    </a>
                    <a
                        href={`${record.profiles.github}`}
                        target="_blank"
                        title={text}
                        rel="noopener noreferrer"
                    >
                        <GithubOutlined />
                    </a>
                    <a
                        href={`${record.profiles.codepen}`}
                        target="_blank"
                        title={text}
                        rel="noopener noreferrer"
                    >
                        <CodepenOutlined />
                    </a>
                    <a
                        href={`${record.profiles.codewars}`}
                        target="_blank"
                        title={text}
                        rel="noopener noreferrer"
                    >
                        <CodeSandboxOutlined />
                    </a>
                </Flex>
            ),
        },
        {
            title: 'Certifications',
            dataIndex: ['certificates'],
            key: 'scrum',
            align: 'center',
            render: (_, { certificates }) => {
                const EnglishColor = certificates.english
                    ? 'geekblue'
                    : 'volcano';
                const ScrumColor = certificates.scrum ? 'cyan' : 'volcano';
                const CyberSecurityColor = certificates.cyberSecurity
                    ? 'green'
                    : 'volcano';
                return (
                    <Flex align="center" justify="center" gap="small">
                        <Tag color={EnglishColor}>
                            {certificates.english || 'Incompleted'}
                        </Tag>
                        <Tag color={ScrumColor}>
                            {certificates.scrum || 'Incompleted'}
                        </Tag>
                        <Tag color={CyberSecurityColor}>
                            {certificates.cyberSecurity || 'Incompleted'}
                        </Tag>
                    </Flex>
                );
            },
        },
        {
            title: 'Grades',
            dataIndex: ['grades'],
            key: 'grades',
            align: 'center',
            render: (_, record) => {
                return (
                    <Button
                        size="small"
                        type="default"
                        style={{
                            backgroundColor: '#5273e0',
                            fontSize: 'x-small',
                            color: 'white',
                            textTransform: 'uppercase',
                        }}
                        onClick={() => {
                            Modal.confirm({
                                title: `Mentoring Grades - ${record.name}`,
                                centered: true,
                                content: (
                                    <Flex gap="middle" wrap>
                                        {Object.entries(record.grades).map(
                                            ([key, value]) => {
                                                const btnBgColor = value > 0 ? '#306317' : '#d32029';
                                                return (
                                                    <Button
                                                        style={{
                                                            backgroundColor: `${btnBgColor} `,
                                                            color: '#ffffff',
                                                        }}
                                                        size="middle"
                                                        key={key}
                                                        icon={<InfoCircleOutlined />}
                                                    >
                                                        <span style={{ marginRight: 2 }}>
                                                            Test{key.slice(4, 6)}
                                                        </span>{' '}
                                                        {value}
                                                    </Button>
                                                );
                                            }
                                        )}
                                    </Flex>
                                ),
                                footer: (_, { OkBtn, CancelBtn }) => (
                                    <>
                                        <CancelBtn />
                                        <OkBtn />
                                    </>
                                ),
                            });
                        }}
                    >
                        View Grades
                    </Button>
                );
            },
        },
    ];

    return (
        <div>
            <Table
                dataSource={data}
                columns={columns}
                rowKey="id"
                bordered
                size="small"
                title={() => 'Mentoring Program - Students Grades'}
                footer={() => 'CodeCrafters Labs Mentoring Program - 2024'}
            />
        </div>
    );
};

export default FetchData;
