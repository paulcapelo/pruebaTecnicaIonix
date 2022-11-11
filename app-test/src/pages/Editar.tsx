import React, { useState, FC } from 'react';
import { FormUser } from "../components";
import { Button, Modal, Spin } from 'antd';
import {
  useLocation,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { UserInfo, UserType } from "../models";
import { useAuth } from "../context/useContext";
import { EditFilled } from '@ant-design/icons';

interface Props {
  user: UserType,
  ready: () => void;
}

const Editar: FC<Props> = ({ user, ready }) => {
  const { user: usuario } = useAuth();
  
  // const { user } = location?.state || UserInfo;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const backDashboard = () => {
    setIsModalOpen(false)
    ready()
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>

      <Button
        shape="circle"
        icon={<EditFilled />}
        onClick={showModal}
      />
      <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel}>
        
        <div className="">
          {usuario?.token === "" && <Navigate to="/user" replace />}
          <p></p>
          <FormUser user={user} ready={backDashboard} />
        </div>

      </Modal>
    </>
  );
};



export default Editar;
