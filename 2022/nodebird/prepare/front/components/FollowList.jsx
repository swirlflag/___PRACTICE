import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { List, Button, Card } from "antd";
import { StopOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { unfollowAction, removeFollowerAction } from "../reducers/user";

const FollowList = (props) => {
	const dispatch = useDispatch();
	const { header, data, onClickMore, loading } = props;

	const onCancel = (id) => () => {
		if (header === "팔로잉 목록") {
			dispatch(unfollowAction(id));
		} else {
			dispatch(removeFollowerAction(id));
		}
	};

	return (
		<List
			grid={{ gutter: 4, xs: 2, md: 3 }}
			size="small"
			style={{ marginBottom: 20 }}
			header={<div>{header}</div>}
			loadMore={
				<div style={{ textAlign: "center", margin: "10px 0" }}>
					<Button onClick={onClickMore} loading={loading}>
						더 보기
					</Button>
				</div>
			}
			bordered
			dataSource={data}
			renderItem={(item) => (
				<List.Item style={{ marginTop: 20 }}>
					<Card
						actions={[
							<StopOutlined
								key="stop"
								onClick={onCancel(item.id)}
							/>,
						]}
					>
						<Link href={`/user/${item.id}`}>
							<a>
								<Card.Meta description={item.nickname} />
							</a>
						</Link>
					</Card>
				</List.Item>
			)}
		/>
	);
};

export default FollowList;
