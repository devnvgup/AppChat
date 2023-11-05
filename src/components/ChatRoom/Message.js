import { Avatar, Typography } from "antd";
import { formatRelative } from "date-fns";
import React from "react";
import styled from "styled-components";

const WrapperStyled = styled.div`
  margin-bottom: 10px;

  .author {
    margin-left: 5px;
    font-weight: bold;
  }

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }

  .content {
    margin-left: 30px;
  }
`;

function formatDate(seconds) {
  let formatDate = "";
  if (seconds) {
    formatDate = formatRelative(new Date(seconds * 1000), new Date());
    formatDate = formatDate.charAt(0).toUpperCase() + formatDate.slice(1);
  }
  return formatDate;
}

function Message({ text, displayName, createdAt, photoURL }) {
  return (
    <WrapperStyled>
      <div>
        <Avatar size={"small"} src={photoURL}>
          {photoURL ? "" : photoURL?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="author">{displayName}</Typography.Text>
        <Typography.Text className="date">
          {formatDate(createdAt?.seconds)}
        </Typography.Text>
      </div>
      <div>
        <Typography.Text>{text}</Typography.Text>
      </div>
    </WrapperStyled>
  );
}

export default Message;
