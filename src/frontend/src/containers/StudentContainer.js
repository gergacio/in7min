//import {useState, useEffect} from 'react'
//import {deleteStudent, getAllStudents} from "../services/StudentService";
//import {
//    Layout,
//    Table,
//    Spin,
//    Empty,
//    Button,
//    Badge,
//    Tag,
//    Avatar,
//    Radio, Popconfirm
//} from 'antd';
//
//import {
//    UserOutlined,
//    LoadingOutlined,
//    PlusOutlined
//} from '@ant-design/icons';
//import StudentDrawerForm from "../forms/StudentDrawerForm";
//
//import {errorNotification, successNotification} from "../Notification";
//
//
//
//const {Content} = Layout;
//const TheAvatar = ({name}) => {
//    let trim = name.trim();
//    if (trim.length === 0) {
//        return <Avatar icon={<UserOutlined/>}/>
//    }
//    const split = trim.split(" ");
//    if (split.length === 1) {
//        return <Avatar>{name.charAt(0)}</Avatar>
//    }
//    return <Avatar>
//        {`${name.charAt(0)}${name.charAt(name.length - 1)}`}
//    </Avatar>
//}
//const removeStudent = (studentId, callback) => {
//    deleteStudent(studentId).then(() => {
//        successNotification("Student deleted", `Student with id: ${studentId} was deleted`);
//        callback();
//    }).catch(err => {
//        err.response.json().then(res => {
//            console.log(res);
//            errorNotification(
//                "There was an issue",
//                `${res.message} [${res.status}] [${res.error}]`
//            )
//        });
//    })
//}
//
//const columns = fetchStudents => [
//    {
//        title: '',
//        dataIndex: 'avatar',
//        key: 'avatar',
//        render: (text, student) =>
//            <TheAvatar name={student.name}/>
//    },
//    {
//        title: 'Id',
//        dataIndex: 'id',
//        key: 'id',
//    },
//    {
//        title: 'Name',
//        dataIndex: 'name',
//        key: 'name',
//    },
//    {
//        title: 'Email',
//        dataIndex: 'email',
//        key: 'email',
//    },
//    {
//        title: 'Gender',
//        dataIndex: 'gender',
//        key: 'gender',
//    },
//    {
//        title: 'Actions',
//        key: 'actions',
//        render: (text, student) =>
//            <Radio.Group>
//                <Popconfirm
//                    placement='topRight'
//                    title={`Are you sure to delete ${student.name}`}
//                    onConfirm={() => removeStudent(student.id, fetchStudents)}
//                    okText='Yes'
//                    cancelText='No'>
//                    <Radio.Button value="small">Delete <span>❌</span></Radio.Button>
//                </Popconfirm>
//                <Radio.Button onClick={() => alert("TODO: Implement edit student")} value="small">Edit</Radio.Button>
//            </Radio.Group>
//    }
//];
//
//const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;
//
//const StudentContainer = () => {
//    const [students, setStudents] = useState([]);
//    const [fetching, setFetching] = useState(true);
//    const [showDrawer, setShowDrawer] = useState(false);
//
//    const fetchStudents = () =>
//        getAllStudents()
//            .then(res => res.json())
//            .then(data => {
//                console.log(data);
//                setStudents(data);
//            }).catch(err => {
//            console.log(err.response)
//            err.response.json().then(res => {
//                console.log(res);
//                errorNotification(
//                    "There was an issue",
//                    `${res.message} [${res.status}] [${res.error}]`
//                )
//            });
//        }).finally(() => setFetching(false))
//
//    useEffect(() => {
//        console.log("component is mounted");
//        fetchStudents();
//    }, []);
//
//    const renderStudents = () => {
//        if (fetching) {
//            return <Spin indicator={antIcon}/>
//        }
//        if (students.length <= 0) {
//            return <>
//                <Button
//                    onClick={() => setShowDrawer(!showDrawer)}
//                    type="primary" shape="square" icon={<PlusOutlined/>} size="small">
//                    Add New Student
//                </Button>
//                <StudentDrawerForm
//                    showDrawer={showDrawer}
//                    setShowDrawer={setShowDrawer}
//                    fetchStudents={fetchStudents}
//                />
//                <Empty/>
//            </>
//        }
//        return <>
//            <StudentDrawerForm
//                showDrawer={showDrawer}
//                setShowDrawer={setShowDrawer}
//                fetchStudents={fetchStudents}
//            />
//            <Table
//                dataSource={students}
//                columns={columns(fetchStudents)}
//                bordered
//                title={() =>
//                    <>
//                        <Tag>Number of students</Tag>
//                        <Badge count={students.length} className="site-badge-count-4"/>
//                        <br/><br/>
//                        <Button
//                            onClick={() => setShowDrawer(!showDrawer)}
//                            type="primary" shape="square" icon={<PlusOutlined/>} size="small">
//                            Add New Student
//                        </Button>
//                    </>
//                }
//                pagination={{pageSize: 50}}
//                scroll={{y: 500}}
//                rowKey={student => student.id}
//            />
//        </>
//    }
//
//    return(<Layout style={{minHeight: '100vh'}}>
//        <Layout className="site-layout">
//            <Content style={{margin: '0 16px'}}>
//                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
//                    {renderStudents()}
//                </div>
//            </Content>
//        </Layout>
//    </Layout>)
//
//}
//
//export default StudentContainer;