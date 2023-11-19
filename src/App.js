import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";

function App() {
  const [unFormattedData, setUnformattedData] = useState([]);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("status");
  useEffect(() => {
    getUserList();
  }, []);
  const getUserList = () => {
    setLoading(true);
    axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((res) => {
        const updatedData = res?.data.tickets.map((ticket) => {
          const formattedData = { ...ticket };
          const userDetail = res?.data?.users?.find(
            (user) => user.id === ticket.userId
          );
          formattedData.userName = userDetail?.name;
          formattedData.availability = userDetail?.available;
          if (formattedData?.priority === 0) {
            formattedData.priorityLevel = "No Priority";
          }
          if (formattedData?.priority === 1) {
            formattedData.priorityLevel = "Low";
          }
          if (formattedData?.priority === 2) {
            formattedData.priorityLevel = "Medium";
          }
          if (formattedData?.priority === 3) {
            formattedData.priorityLevel = "High";
          }
          if (formattedData?.priority === 4) {
            formattedData.priorityLevel = "Urgent";
          }
          return formattedData;
        });
        formatData(updatedData, "priority");
        setUnformattedData(updatedData);
        setLoading(false);
      });
  };

  const formatData = (data, formatType) => {
    if (formatType === "status") {
      const result = Object.groupBy(data, ({ status }) => status);
      setUserList(result);
    }
    if (formatType === "user") {
      const result = Object.groupBy(data, ({ userName }) => userName);
      setUserList(result);
    }
    if (formatType === "priority") {
      const result = Object.groupBy(data, ({ priorityLevel }) => priorityLevel);
      setUserList(result);
    }
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    formatData(unFormattedData, selectedValue);
    setSelectedOption(selectedValue);
    console.log(userList)
  };
  return (
    <>
      <div className="container App">
        <div>
          Grouping
          <select
            id="dropdown"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option key-="status" value="status">
              Status
            </option>
            <option key-="user" value="user">
              User
            </option>
            <option key-="priority" value="priority">
              priority
            </option>
          </select>
        </div>

        <div className="cards-outer-box">
          {Object?.keys(userList).map((category, index) => (
            <div className="box">
              <div>
                {category}
                <strong>{userList[category].length}</strong>
              </div>
              {selectedOption === 'status' && (
                userList[category].map((data, idx) => (
                  <div className="card-inner-box" key={data.id}>
                    <div className="div6">
                      <div>{data.id || 'na'}</div>
                      <div className="profile-photo-container">
                        <img
                          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                          alt="Profile"
                          className="profile-photo"
                        />
                      </div>
                    </div>
                    <div className="div3">{data.title || 'na'}</div>
                    <div className="div1">
                      <div className="div2">
                        {idx % 2 == 0 ? <i className="material-icons">more_horiz</i> : <i className="material-icons">signal_cellular_alt</i>}
                      </div>
                      <button className="whitebutton"><div className="circle"></div> {data.tag} </button>
                    </div>
                    <div>
                    </div>
                  </div>
                ))
              )}

              {selectedOption === 'user' && (
                userList[category].map((data, idx) => (
                  <div className="card-inner-box" key={data.id}>
                    <div className="div6">
                      <div>{data.id || 'na'}</div>
                      <div className="profile-photo-container">
                        <img
                          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                          alt="Profile"
                          className="profile-photo"
                        />
                      </div>
                    </div>
                    <div className="div3"><input
                      type="radio"
                    />{data.title || 'na'}</div>
                    <div className="div1">
                      <div className="div2">
                        {idx % 2 == 0 ? <i className="material-icons">more_horiz</i> : <i className="material-icons">signal_cellular_alt</i>}
                      </div>
                      <button className="whitebutton"><div className="circle"></div> {data.tag} </button>
                    </div>
                    <div>
                    </div>
                  </div>
                ))
              )}

              {selectedOption !== 'status' && selectedOption !== 'user' && (
                userList[category].map((data, idx) => (
                  <div className="card-inner-box" key={data.id}>
                    <div className="div6">
                      <div>{data.id || 'na'}</div>
                      <div className="profile-photo-container">
                        <img
                          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                          alt="Profile"
                          className="profile-photo"
                        />
                      </div>
                    </div>
                    <div className="div3"><input
                      type="radio"
                    />{data.title || 'na'}</div>
                    <div className="div1">
                      <div className="div2">
                        {idx % 2 == 0 ? <i className="material-icons">more_horiz</i> : <i className="material-icons">signal_cellular_alt</i>}
                      </div>
                      <button className="whitebutton"><div className="circle"></div> {data.tag} </button>
                    </div>
                    <div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;