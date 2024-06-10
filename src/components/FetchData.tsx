import React, { useEffect, useState } from 'react';
import { database } from '../../firebaseConfig';
import { ref, get } from 'firebase/database';
import { Table, Tag, Flex, Button, Modal, Progress, notification } from 'antd';
import type { TableProps } from 'antd';
import { Data, NotificationType } from '../types';
import {
    InfoCircleOutlined,
    PhoneOutlined,
    MailOutlined,
    CodepenOutlined,
    GithubOutlined,
    CodeSandboxOutlined,
} from '@ant-design/icons';
import { currentDate, customTagBgColor } from '../utils';

const FetchData: React.FC = () => {
    const [data, setData] = useState<Data[]>([]);
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Fetching Error',
            description: 'No data available.',
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const dataRef = ref(database, 'students');
            const snapshot = await get(dataRef);
            if (snapshot.exists()) {
                const data: Data[] = snapshot.val();
                setData(data);
            } else {
                openNotificationWithIcon('error');
                console.info('No data available');
            }
            setLoading(false);
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns: TableProps<Data>['columns'] = [
        {
            title: 'Batch',
            dataIndex: 'batch',
            key: 'batch',
            align: 'center',
            width: '120px',
            fixed: 'left',
            sorter: (a, b) => a.batch - b.batch,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width: '200px',
        },
        {
            title: 'Contact',
            dataIndex: ['profiles', 'github'],
            key: 'github',
            align: 'center',
            width: '200px',
            render: (text, record) => (
                <Flex gap="small" justify="center">
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
            title: 'Stack',
            dataIndex: 'stack',
            key: 'stack',
            align: 'center',
            width: '160px',
            filters: [
                {
                    text: 'MERN',
                    value: 'MERN',
                },
                {
                    text: 'SERVERLESS',
                    value: 'SERVERLESS',
                },
                {
                    text: 'LAMP',
                    value: 'LAMP',
                },
                {
                    text: 'DJANGO',
                    value: 'DJANGO',
                },
                {
                    text: 'MEAN',
                    value: 'MEAN',
                },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) =>
                record.stack.startsWith(value as string),
            render: (_, { stack }) => {
                return <Tag style={{
                    color: "#092b00",
                    backgroundColor: "#d9f7be"
                }}>
                    {stack}
                </Tag>
            }
        },
        {
            title: 'Certifications',
            dataIndex: ['certificates'],
            key: 'scrum',
            align: 'center',
            render: (_, { certificates }) => {
                const { EnglishColor, ScrumColor, CyberSecurityColor } =
                    customTagBgColor(certificates);
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
            width: '160px',
            render: (_, record) => {
                const score = Object.values(record.grades).reduce((acc, val) => {
                    return acc + val
                })
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
                                    <>
                                        <Flex gap="middle" wrap>
                                            {Object.entries(record.grades).map(
                                                ([key, value]) => {
                                                    const btnBgColor =
                                                        value > 0 ? '#306317' : '#d32029';
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
                                        <Flex align="center" justify="start" gap="middle" style={{ marginTop: "20px" }}>
                                            <h3>CURRENT SCORE: </h3>
                                            <Progress type="circle" percent={score} size={60} />
                                        </Flex>
                                    </>
                                ),
                                footer: (_, { OkBtn }) => (<OkBtn />),
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
            {contextHolder}
            <Table
                dataSource={data}
                columns={columns}
                rowKey="id"
                bordered
                loading={loading}
                size="middle"
                title={() => 'Mentoring Program - Students Grades'}
                footer={() => `CodeCrafters Labs Mentoring Program - ${currentDate(new Date())}`}
            />
        </div>
    );
};

export default FetchData;
