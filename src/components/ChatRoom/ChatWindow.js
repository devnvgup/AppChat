import { UserAddOutlined } from '@ant-design/icons'
import { Avatar, Button, Form, Input, Tooltip } from 'antd'
import React from 'react'
import styled from 'styled-components'
import Message from './Message'

const HeaderStyled = styled.div`
    display:flex;
    justify-content:space-between;
    padding:0 16px;
    display: flex;
    align-items: center;
    height:50px;
    border-bottom: 1px solid rgb(230,230,230);
    .header {
        &__infor {
            display:flex;
            flex-direction:column;
            justify-content:center;
        }
        &__title {
            margin:0;
            font-weight:bold;
        }
        &__description{
            font-size:12px
        }
    }
`
const ContentStyled = styled.div`
    height:calc(100% - 100px);
    display:flex;
    flex-direction:column;
    padding:11px;
    justify-content:flex-end;
`
const ButtonGruopStyled = styled.div`
    display:flex;
    align-items:center;
`
const MessageListStyled = styled.div`
    max-height:100%;
    overflow-y:auto;
`
const WrapperStyled = styled.div`
    height:100vh;
`
const FormStyled = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:2px 2px 2px 0;
    border:1px solid rgb(230,230,230);
    border-radius:2px

    .ant-form-item {
        flex:1;
        margin-bottom:0
    }
`
const ChatWindow = () => {
    return (
        <WrapperStyled>
            <HeaderStyled>
                <div className='header__infor'>
                    <p className='header__title'>Room 1</p>
                    <span className='header__description'>Đây là Room 1</span>
                </div>
                <ButtonGruopStyled>
                    <Button type='text' icon={<UserAddOutlined />}>Mời</Button>
                    <Avatar.Group size='small' maxCount={2}>
                        <Tooltip title='A'>
                            <Avatar>A</Avatar>
                        </Tooltip>
                        <Tooltip title='B'>
                            <Avatar>B</Avatar>
                        </Tooltip>
                        <Tooltip title='C'>
                            <Avatar>C</Avatar>
                        </Tooltip>
                    </Avatar.Group>
                </ButtonGruopStyled>
            </HeaderStyled>
            <ContentStyled>
                <MessageListStyled>
                    <Message text='test' displayname='truong' createdAt={123123} />
                    <Message text='test' displayname='truong' createdAt={123123} />
                    <Message text='test' displayname='truong' createdAt={123123} />
                    <Message text='test' displayname='truong' createdAt={123123} />
                </MessageListStyled>
                <FormStyled>
                    <Form.Item>
                        <Input placeholder='tin nhan' bordered={false} autoComplete='off'/>
                    </Form.Item>
                    <Button type='primary'>Gửi</Button>
                </FormStyled>
            </ContentStyled>
        </WrapperStyled>
    )
}

export default ChatWindow