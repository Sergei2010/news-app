// @ts-nocheck
import React from 'react';
import axios from 'axios';

import {
	StatusBar,
	View,
	Alert,
	FlatList,
	ActivityIndicator,
	Text,
	RefreshControl,
	TouchableOpacity
} from 'react-native';

import { Post } from '../components/Post';


export const HomeScreen = ({ navigation }) => {
	const [items, setItems] = React.useState();
	const [isLoading, setIsLoading] = React.useState(true);

	const fetchPosts = () => {
		setIsLoading(true);
		axios
			.get('https://629219decd0c91932b6d45bd.mockapi.io/articles')
			.then(({ data }) => {
				setItems(data);
			})
			.catch((err) => {
				console.log(err);
				Alert.alert('Ошибка', 'Не удалось получить статьи');
				//alert('Не удалось получить статьи');
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	React.useEffect(fetchPosts, []);

	if (isLoading) {
		return (
			<View
				style={ {
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center'
				} }
			>
				<ActivityIndicator size="large" />
				<Text
					style={ {
						marginTop: 15,
					} }
				>
					Загрузка ...
				</Text>
			</View>
		);
	}

	return (
		<View>
			<FlatList
				refreshControl={
					<RefreshControl
						refreshing={ isLoading }
						onRefresh={ fetchPosts }
					/>
				}
				data={ items }
				renderItem={ ({ item }) =>
					<TouchableOpacity
						onPress={ () => navigation.navigate('FullPost', { id: item.id, title: item.title }) }
					>
						<Post
							title={ item.title }
							imageUrl={ item.imageUrl }
							createdAt={ item.createdAt }
						/>
					</TouchableOpacity>
				}
			/>
			<StatusBar theme="auto" />
		</View>
	);
};
