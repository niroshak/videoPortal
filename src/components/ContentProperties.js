import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./auth";
import axios from "axios";

const options = [{ quality: "HD" }, { quality: "HDR" }, { quality: "ATMOS" }];
const userData = [
  { name: "HD" },
  { name: "HDR" },
  { name: "ATMOS" },
];
const content = {
  SubTitle: "The Lord of Rings",
  AudioTrack: "lordOfRings.mp4",
  Dash: {
    RootFolder: "/local",

    Manifest: "https.bgmlordofRingsUrl",
  },

  HLS: {
    RootFolder: "/local",

    Manifest: "https.bgmlordofRingsUrl",
  },

  DRM: {
    ResourceURL: "https.bgmlordofRingsUrl",

    KeyID: "bey7647988",
  },
};

export const ContentProperties = (props) => {
  const [contentInformation, setcontentInformation] = useState();
  const [selectedquality, setSelectedquality] = useState();
  const [qualityoptions, setqualityoptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [contentId, setcontentId] = useState();


  const selectedRole = useLocation().state.role;
  const role = selectedRole.value;
  console.log("params", role);
  const handleSearch = () => {
    console.log("contentId");
  //  axios.get('http://localhost:5000/contentProperties/testId123')
  //   .then((response) => {
  //     console.log("get cp response",response);
  //   }).catch( (error) => {
  //     console.log("get cp error",error);
  //   });

  var config = {
    method: 'get',
    url: 'http://localhost:5000/contentProperties/testId123',
    headers: { 'Accept': 'application/json' ,
    'Content-Type': 'application/json'},
    withCredentials: true 
   };

  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    const result = JSON.stringify(response.data);
    setcontentInformation(result);

  })
  .catch(function (error) {
    console.log(error);
  });
  };

  useEffect(() => {
    setUsers(userData);
  }, []);

  useEffect(() => {
    setqualityoptions(options);
  }, []);

//   const handleChange = (e) =>{
// const {quality,checked} = e.target;
// let tempquality = qualityoptions.map((item) => item?.quality === quality ? {...item,isChecked : checked} : item);
//  setqualityoptions(tempquality);
//  console.log('tempquality',tempquality);
// };

const handleChange = (e) => {
  const { name, checked } = e.target;

    let tempUser = users.map((user) =>
      user.name === name ? { ...user, isChecked: checked } : user
    );
    setUsers(tempUser);
  const result =   tempUser.filter(item => item?.isChecked === true);
console.log("result",result);
};
// console.log('setUsers',users);
console.log('get result',contentInformation);

  return (
    <>
      <h3 style={{ marginLeft: "10px" }}>Video Information</h3>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            justifyContent: "space-evenly",
            display: "flex",
            flexDirection: "column",
            width: "50%",
            height: "50vh",
          }}
        >
          <div style={{ flexDirection: "row", display: "flex" }}>
            <div style={{ marginLeft: "30px", fontSize: "17px", width: "30%" }}>
              Content Id
            </div>
            <div>
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                onChange={(e) => console.log(e)}
              />
              <button
                style={{ height: "20px", marginLeft: "20px" }}
                onClick={handleSearch}
              >
                search
              </button>
              <button style={{ height: "20px", marginLeft: "10px" }}>
                Del
              </button>
            </div>
          </div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <div style={{ marginLeft: "30px", fontSize: "17px", width: "30%" }}>
              Sub Title
            </div>
            {role === "Admin" ? (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                onChange={(e) => console.log(e)}
                defaultValue={contentInformation?.SubTitle}
              />
            ) : (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                value={
                  contentInformation?.SubTitle
                    ? contentInformation?.SubTitle
                    : null
                }
                disabled={true}
              />
            )}
          </div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <div style={{ marginLeft: "30px", fontSize: "17px", width: "30%" }}>
              Dash Root Folder
            </div>
            {role === "Admin" ? (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                onChange={(e) => console.log(e)}
                defaultValue={contentInformation?.Dash?.RootFolder}
              />
            ) : (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                value={
                  contentInformation?.Dash?.RootFolder
                    ? contentInformation?.Dash?.RootFolder
                    : null
                }
                disabled={true}
              />
            )}
          </div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <div style={{ marginLeft: "30px", fontSize: "17px", width: "30%" }}>
              HLS Root Folder
            </div>
            {role === "Admin" ? (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                onChange={(e) => console.log(e)}
                defaultValue={contentInformation?.HLS?.RootFolder}
              />
            ) : (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                value={
                  contentInformation?.HLS?.RootFolder
                    ? contentInformation?.HLS?.RootFolder
                    : null
                }
                disabled={true}
              />
            )}
          </div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <div style={{ marginLeft: "30px", fontSize: "17px", width: "30%" }}>
              DRM Resource URL
            </div>
            {role === "Admin" ? (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                onChange={(e) => console.log(e)}
                defaultValue={contentInformation?.DRM?.ResourceURL}
              />
            ) : (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                value={
                  contentInformation?.DRM?.ResourceURL
                    ? contentInformation?.DRM?.ResourceURL
                    : null
                }
                disabled={true}
              />
            )}
          </div>
        </div>
        <div
          style={{
            flexDirection: "column",
            width: "50%",
            height: "50vh",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <div style={{ flexDirection: "row", display: "flex" }}>
            <div style={{ marginLeft: "30px", fontSize: "17px", width: "30%" }}>
              Audio Track
            </div>
            {role === "Admin" ? (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                onChange={(e) => console.log(e)}
                defaultValue={contentInformation?.AudioTrack}
              />
            ) : (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                value={
                  contentInformation?.AudioTrack
                    ? contentInformation?.AudioTrack
                    : null
                }
                disabled={true}
              />
            )}
          </div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <div style={{ marginLeft: "30px", fontSize: "17px", width: "30%" }}>
              DASH Manifest
            </div>
            {role === "Admin" ? (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                onChange={(e) => console.log(e)}
                defaultValue={contentInformation?.Dash?.Manifest}
              />
            ) : (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                value={
                  contentInformation?.Dash?.Manifest
                    ? contentInformation?.Dash?.Manifest
                    : null
                }
                disabled={true}
              />
            )}
          </div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <div style={{ marginLeft: "30px", fontSize: "17px", width: "30%" }}>
              HLS Manifest
            </div>
            {role === "Admin" ? (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                onChange={(e) => console.log(e)}
                defaultValue={contentInformation?.HLS?.Manifest}
              />
            ) : (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                value={
                  contentInformation?.HLS?.Manifest
                    ? contentInformation?.HLS?.Manifest
                    : null
                }
                disabled={true}
              />
            )}
          </div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <div style={{ marginLeft: "30px", fontSize: "17px", width: "30%" }}>
              DRM Key Id
            </div>
            {role === "Admin" ? (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                onChange={(e) => console.log(e)}
                defaultValue={contentInformation?.DRM?.KeyID}
              />
            ) : (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                value={
                  contentInformation?.DRM?.KeyID
                    ? contentInformation?.DRM?.KeyID
                    : null
                }
                disabled={true}
              />
            )}
          </div>
        </div>
      </div>
      {/* <div style={{ display: "flex", flexDirection: "row" }}>
        {qualityoptions.map((item) => (
          <div className="form-check">
            <input type={"checkbox"} className={"form-check-input"} onChange={handleChange} 
            checked={item?.isChecked || false}/>
            <label className={"form-check-label ms-2"}>{item?.quality}</label>
          </div>
        ))}
      </div> */}

{/* <form className="form w-100"> */}
<div style={{display:'flex',justifyContent:'center',marginTop:'30px'}}>
<div style={{flexDirection:'row',display:'flex',justifyContent:'space-evenly',width:'60%'}}>
{users.map((user, index) => (
          <div className="form-check" key={index} >
            <input
              type="checkbox"
              className="form-check-input"
              name={user.name}
              checked={user?.isChecked || false}
              onChange={handleChange}
            />
            <label className="form-check-label ms-2">{user.name}</label>
          </div>
        ))}
        </div>
        </div>
{/* </form> */}


    </>
  );
};
