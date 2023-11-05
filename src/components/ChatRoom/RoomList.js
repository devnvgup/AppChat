import React, { useContext} from "react";
import { Button, Collapse, Typography } from "antd";
import styled from "styled-components";
import { PlusSquareOutlined } from "@ant-design/icons";
import { AppContext } from "../../Context/AppProvider";
const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }

    .add-room {
      color: white;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;
function RoomList() {
  const appContext = useContext(AppContext);
  const { rooms, setAddRoomVisible,setSelectedRoomId } = appContext;
  const hanldeOpenModal = ()=>{
    setAddRoomVisible(true)
  }
  return (
    <div>
      <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyled header="List Room">
        {rooms?.map((room) => {
          return <LinkStyled key={room.id} onClick={()=>setSelectedRoomId(room.id)}>{room.name}</LinkStyled>;
        })}
        <Button onClick={hanldeOpenModal} type="text" icon={<PlusSquareOutlined />} className="add-room">
          Add Room
        </Button>
      </PanelStyled>
    </Collapse>
    </div>
  );
}

export default RoomList;
