import PropTypes from 'prop-types';
import { List, Button, Card } from "antd";
import { StopOutlined } from '@ant-design/icons';

const FollowList = (props) => {
	const { header, data } = props;
	return (
		<List
			grid={{ gutter: 4, xs: 2, md: 3 }}
			size="small"
			style={{ marginBottom: 20 }}
			header={<div>{header}</div>}
			loadMore={<div style={{textAlign: 'center', margin: '10px 0'}}><Button>더 보기</Button></div>}
            bordered
            dataSource={data}
            renderItem={(item) => (
                <List.Item style={{marginTop: 20}}>
                    <Card actions={[<StopOutlined key="stop"/>]}>
                        <Card.Meta description={item.nickname}/>
                    </Card>
                </List.Item>
            )}
		/>
	);
};

export default FollowList;
