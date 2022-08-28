// @ts-nocheck
import React from 'react';
import axios from 'axios';

import { Image, Text, View } from 'react-native';
import { Loading } from '../components/Loading';

import styled from 'styled-components/native';

const PostImage = styled.Image`
  width: 100%;
  height: 250px;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const PostText = styled.Text`
 font-size: 18px,
 line-height: 24px,
`;

export const FullPostScreen = ({ route, navigation }) => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [data, setData] = React.useState();
	const { id, title } = route.params;

	React.useEffect(() => {
		navigation.setOptions({
			title
		});
		axios
			.get('https://629219decd0c91932b6d45bd.mockapi.io/articles/' + id)
			.then(({ data }) => {
				setData(data);
			})
			.catch((err) => {
				console.log(err);
				Alert.alert('Ошибка', 'Не удалось получить статью');
				//alert('Не удалось получить статью');
			})
			.finally(() => setIsLoading(false));
	}, []);

	if (isLoading) {
		return (
			<View style={ {
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center'
			} }>
				<Loading />
			</View>
		);
	}

	return (
		<View style={ { padding: 20 } }>
			<PostImage source={ { uri: data.imageUrl } } />
			<PostText>{ data.text }</PostText>
		</View>
	);
};
