import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

/**
 * - 해당 글 작성자는 수정 및 삭제 가능
 *   (글이 삭제가 되면 다른 글의 id값이 변경되면 안됨)
 * - [Nightmare??]만약 조회수 기능을 추가할 경우, 조회수 값을 저장할 데이터가 필요함
 * - 조회수 중복 체크 막기도 구현하면 좋음 (쿠키 적용해야 한다고함)
 */

const ViewSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ViewWrap = styled.div`
  width: 860px;
`;

const PostUpper = styled.div`
  background: #fce4ec;
  padding: 1rem;
`;

const PostTitle = styled.div`
  margin: 1rem 0;
  padding: 1rem 0;
  h3 {
    font-weight: 700;
  }
`;

const PostWriter = styled.div`
  padding: 1rem 0;
`;

const ViewContentBlock = styled.div`
  border: 1px solid #fce4ec;
  display: flex;
  padding: 1rem;
`;

const ViewImage = styled.div`
  width: 48%;
  margin-right: 2%;

  img {
    width: 100%;
    border-radius: 10px;
  }
`;

const ViewContent = styled.div`
  width: 48%;
  padding: 1rem;
`;

const ButtonBlock = styled.div`
  display: flex;
  justify-content: right;
  padding: 0.5rem 0;
`;

const View = () => {
  const [selectedPost, setSelectedPost] = useState('');
  const { id } = useParams();

  const getDetail = async () => {
    const json = await (
      await fetch(`${process.env.REACT_APP_API_URL}/posts/view/${id}`)
    ).json();
    setSelectedPost(json.data[0]);
  };

  useEffect(() => {
    getDetail();
  }, []);

  const imageUrl = `${process.env.REACT_APP_API_URL}/posts/${selectedPost.image}`;
  const parsedDate = new Date(selectedPost.createdAt).toLocaleDateString(
    'ko-kr'
  );

  return (
    <>
      <ViewSection>
        <ViewWrap>
          {selectedPost ? (
            <>
              <PostUpper>
                <PostTitle>
                  <h3 className='viewTitle'>{selectedPost.title}</h3>
                </PostTitle>
                <PostWriter>
                  <h4 className='postUsername'>작성자</h4>
                  <div className='viewWriter'>{selectedPost.username}</div>
                </PostWriter>
                <div className='postDate'>
                  <div className='viewDate'>{parsedDate}</div>
                </div>
              </PostUpper>
              <ViewContentBlock>
                <ViewImage>
                  <img className='viewImage' src={imageUrl} />
                </ViewImage>
                <ViewContent>{selectedPost.content}</ViewContent>
              </ViewContentBlock>
            </>
          ) : (
            '해당 게시글을 찾을 수 없습니다'
          )}
          <ButtonBlock>
            <Link to={`/Edit/${selectedPost.id}`}>
              <IconButton aria-label='edit'>
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton aria-label='delete'>
              <DeleteIcon />
            </IconButton>
          </ButtonBlock>
        </ViewWrap>
      </ViewSection>
    </>
  );
};

export default View;
