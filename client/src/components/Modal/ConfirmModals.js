import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export const ModalContainer = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 998;
`;

export const ModalBtn = styled.button`
  margin-top: 5px;
  color: black;
  background-color: white;
  cursor: pointer;
  z-index: 999;
  position: relative;
  border: none;
  display: inline-block;
  padding: 10px 20px;
  border-radius: 15px;
  font-family: 'paybooc-Light', sans-serif;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
  transition: 0.25s;
  cursor: auto;
`;

export const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 25rem;
  height: 6rem;
  border-radius: 1rem;
  position: relative;
`;

export default function ConfirmModal({ handleModal, children }) {
  const navigate = useNavigate();
  return (
    <ModalContainer>
      <div onClick={() => navigate('/')}>
        <ModalBackdrop onClick={handleModal}>
          <ModalView
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            {children}
            <div onClick={() => navigate('/')}>
              <ModalBtn onClick={handleModal}>확인</ModalBtn>
            </div>
          </ModalView>
        </ModalBackdrop>
      </div>
    </ModalContainer>
  );
}
