import React from 'react';
import { Link } from 'react-router-dom';

const MemberList = () => {
  // TODO DBからデータを取得
  // const lists = [];

  const lists = [
    '小田さくら',
    '佐藤優樹',
    '生田衣梨奈',
    '譜久村聖',
    '石田亜佑美'
  ];

  if (lists.length === 0) {
    return <Link to="/members/add">リストを作成する</Link>;
  }

  const renderList = lists.map(list => {
    return <div>{list}</div>;
  });

  return <div>{renderList}</div>;
};

export default MemberList;
