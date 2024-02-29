import React from "react";
import { useState, useEffect } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import baseUrl from "../api/axios";
import FormUpdateUser from "./FormUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import ModalBlockUser from "./ModalBlockUser";
export default function ListUser({ usersSearch }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openBlockModal, setOpenBlockModal] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  //Truyền id sửa, xóa, chặn
  const [deleteId, setDeleteId] = useState("");
  const [blockId, setBlockId] = useState("");
  const [updateId, setUpdateId] = useState("");

  //Đóng mở modal xóa
  const handleOpenDeleteModal = (id) => {
    setOpenDeleteModal(true);
    setDeleteId(id);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  //Đóng mở modal chặn
  const handleOpenBlockModal = (id) => {
    setOpenBlockModal(true);
    setBlockId(id);
  };
  const handleCloseBlockModal = () => {
    setOpenBlockModal(false);
  };
  //Đóng mở form update
  const handleOpenUpdateForm = (id) => {
    setOpenUpdateForm(true);
    setUpdateId(id);
  };
  const handleCloseUpdateForm = () => {
    setOpenUpdateForm(false);
  };

  return (
    <>
      {usersSearch.map((user, index) => (
        <tr>
          <td>{index + 1}</td>
          <td>{user.userName}</td>
          <td>{user.dateOfBirth}</td>
          <td>{user.email}</td>
          <td>{user.address}</td>
          <td>
            <div className="d-flex  gap-3 ">
              <div
                style={{
                  borderRadius: "50%",
                  width: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: user.status === 1 ? "#008000" : "#FF0000",
                }}
              >
                <FontAwesomeIcon
                  className="text-white"
                  style={{ fontSize: "10px" }}
                  icon={faUser}
                />
              </div>
              <div>
                <span>{user.status === 1 ? "Đang hoạt đông" : "Bị chặn"}</span>
              </div>
            </div>
          </td>
          <td>
            <span
              onClick={() => {
                handleOpenUpdateForm(user.id);
              }}
              className="button button-block"
            >
              Sửa
            </span>
          </td>
          <td>
            <span
              onClick={() => {
                handleOpenBlockModal(user.id);
              }}
              className="button button-edit"
            >
              {user.status === 1 ? "Chặn" : "Bỏ chặn"}
            </span>
          </td>
          <td>
            <span
              onClick={() => {
                handleOpenDeleteModal(user.id);
              }}
              className="button button-delete"
            >
              Xóa
            </span>
          </td>
          {/* Modal xác nhận chặn tài khoản */}
          {openBlockModal && (
            <ModalBlockUser
              blockId={blockId}
              handleCloseBlockModal={handleCloseBlockModal}
            ></ModalBlockUser>
          )}

          {/* Modal xác nhận xóa tài khoản */}
          {openDeleteModal && (
            <ModalDeleteUser
              deleteId={deleteId}
              handleCloseDeleteModal={handleCloseDeleteModal}
            ></ModalDeleteUser>
          )}
        </tr>
      ))}
      {/* Form update nhân viên */}
      {openUpdateForm && (
        <FormUpdateUser
          updateId={updateId}
          handleCloseUpdateForm={handleCloseUpdateForm}
        ></FormUpdateUser>
      )}
    </>
  );
}
