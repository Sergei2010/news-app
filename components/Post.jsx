// @ts-nocheck
import { Text, View, Image } from 'react-native';

import styled from 'styled-components/native';

const PostView = styled.View`
  flex-direction: row;
  margin-top: 30px;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0,0,0,0.1);
  border-bottom-style: solid;
`;

const PostDetails = styled.View`
  flex:1;
  justify-content: center;
`;

const PostImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  margin-right: 12px;
`;

const PostTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
`;

const PostDate = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  margin-top: 2px;
`;

const trancateTitle = (str) => {
  if (str.length >= 50) {
    return str.substring(0, 50) + '...';
  }

  return str;
};

// date-fns => format

export const Post = ({ title, imageUrl, createdAt }) => {
  return <PostView>
    <PostImage
      source={ { uri: imageUrl } }
    />
    <PostDetails>
      <PostTitle>{ trancateTitle(title) }</PostTitle>
      <PostDate>{ new Date(createdAt).toLocaleDateString(3) }</PostDate>
    </PostDetails>
  </PostView>;
};