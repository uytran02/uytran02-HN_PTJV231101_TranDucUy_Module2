import React, { useState } from "react";
import { useEffect } from "react";
import baseUrl from "../api/axios";
import FormAddUser from "./FormAddUser";
import ListUser from "./ListUser";
import ListSearchUser from "./ListSearchUser";
export default function Home() {
  //Đóng mở
  const [openForm, setOpenForm] = useState(false);
  //Mảng lưu toàn bộ các user
  const [users, setUsers] = useState([]);
  //Mảnh lưu userSearch do con truyền lên
  const [usersSearch, setUsersSearch] = useState([]);
  //Giá trị trên ô input tìm kiếm
  const [searchValue, setSearchValue] = useState("");
  const [clickInput, setClickInput] = useState(false);

  //Đóng mở form thêm mới
  const handleOpenForm = () => {
    setOpenForm(true);
  };
  const handleCloseForm = () => {
    setOpenForm(false);
  };

  //call API lấy tất cả users
  useEffect(() => {
    baseUrl
      .get(`users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, [users]);

  //Tìm kiếm
  useEffect(() => {
    const result = users.filter((user) =>
      user.email.toLowerCase().includes(searchValue.toLocaleLowerCase())
    );
    setUsersSearch(result);
  }, [searchValue]);
  //UseEff để log
  useEffect(() => {
    console.log(users);
    console.log(usersSearch);
  }, []);
  return (
    <>
      <div className="w-[80%] m-auto mt-4 h-[100vh]">
        <main className="main">
          <header className="d-flex justify-content-between mb-3">
            <h3 style={{ fontSize: "25px" }}>Quản lý nhân viên</h3>

            <button
              onClick={handleOpenForm}
              className="btn btn-primary"
              style={{ fontSize: "14px" }}
            >
              {" "}
              Thêm mới nhân viên
            </button>
          </header>
          <div className="d-flex align-items-center justify-content-end  mb-3">
            <input
              style={{ width: 350, fontSize: "14px" }}
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo email"
              onChange={(e) => {
                setSearchValue(e.target.value);
                setClickInput(true);
              }}
            />
            <i className="fa-solid fa-arrows-rotate" title="Refresh" />
          </div>
          {/* Danh sách nhân viên */}
          <table className="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Ngày sinh</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Trạng thái</th>
                <th colSpan={3}>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {clickInput === false ? (
                <ListUser users={users}></ListUser>
              ) : usersSearch.length === 0 ? (
                <tr>
                  <td colSpan={7}>Không có kết quả tìm kiếm phù hợp</td>
                </tr>
              ) : usersSearch.length < users.length ? (
                <ListSearchUser
                  usersSearch={usersSearch}
                  searchValue={searchValue}
                ></ListSearchUser>
              ) : (
                <ListUser users={users}></ListUser>
              )}
            </tbody>
          </table>
          <footer className="d-flex justify-content-end">
            {usersSearch.length == 0 ? (
              <div className="d-flex align-items-center gap-3">
                <select style={{ fontSize: "14px" }} className="form-select">
                  <option selected="">Hiển thị 5 bản ghi trên trang</option>
                  <option>Hiển thị 10 bản ghi trên trang</option>
                  <option>Hiển thị 20 bản ghi trên trang</option>
                </select>
              </div>
            ) : (
              <div></div>
            )}
          </footer>
        </main>
      </div>
      {/* Form thêm mới nhân viên */}
      {openForm && (
        <FormAddUser handleCloseForm={handleCloseForm}></FormAddUser>
      )}
    </>
  );
}
