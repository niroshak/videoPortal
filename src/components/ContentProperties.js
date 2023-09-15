import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./auth";
import axios from "axios";

const options = [{ quality: "HD" }, { quality: "HDR" }, { quality: "ATMOS" }];
const userData = [{ name: "HD" ,isChecked:false}, { name: "HDR",isChecked:false }, { name: "ATMOS",isChecked:false }];
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
  const [contentId, setcontentId] = useState("");
  const [dashRootFolder, setdashRootFolder] = useState("");
  const [dashManifest, setdashManifest] = useState("");
  const [hlsRootFolder, sethlsRootFolder] = useState("");
  const [hlsManifest, sethlsManifest] = useState("");
  const [audioTrack, setaudioTrack] = useState();
  const [subTitle, setsubTitle] = useState("");
  const [drmResourceURl, setdrmResourceURl] = useState("");
  const [drmKeyId, setdrmKeyId] = useState("");

  const [role, setrole] = useState('');
  let defaultrole = "admin";
  const selectedRole = useLocation().state.role;
  // console.log('selectrole',selectrole);
  console.log('selectedRole',selectedRole);
  // setrole(selectrole);
  // console.log("params", role);
  const handleSearch = () => {
    console.log("contentId", contentId);
    //  axios.get('http://localhost:5000/contentProperties/testId123')
    //   .then((response) => {
    //     console.log("get cp response",response);
    //   }).catch( (error) => {
    //     console.log("get cp error",error);
    //   });
    let cv = "testId123";
    let session_url = `http://localhost:5000/contentProperties/${contentId}`;
    console.log("session_url", session_url);
    var config = {
      method: "get",
      url: session_url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        console.log(JSON.stringify(response.data.data));
        console.log(JSON.stringify(response.data.role));
        console.log(JSON.stringify(response.data.data.SubTitle));

        console.log(JSON.stringify(response.data.data.Dash));

        const result = JSON.stringify(response.data);
        setcontentInformation(response.data);
        setdashRootFolder(response?.data?.data?.Dash?.RootFolder);
        setdashManifest(response?.data?.data?.Dash?.Manifest);
        sethlsRootFolder(response?.data?.data?.HLS?.RootFolder);
        sethlsManifest(response?.data?.data?.HLS?.Manifest);
        setsubTitle(response?.data?.data?.SubTitle);
        setaudioTrack(response?.data?.data?.AudioTrack);
        setdrmResourceURl(response?.data?.data?.DRM?.ResourceURL);
        setdrmKeyId(response?.data?.data?.DRM?.KeyID);
        // setUsers(response.data.Quality);
        setrole(response.data.role);
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
    const result = tempUser.filter((item) => item?.isChecked === true);
    console.log("result", result);
  };

  const handleUpdate = () => {
    console.log("contentId");

    var config = {
      method: "put",

      url: "http://localhost:5000/contentProperties/",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
      },

      withCredentials: true,

      data: {
        ContentID: contentId,

        new_data: {
          Dash: {
            RootFolder: dashRootFolder,

            Manifest: dashManifest,
          },

          HLS: {
            RootFolder:hlsRootFolder,

            Manifest: hlsManifest,
          },

          DRM: {
            ResourceURL: drmResourceURl,

            KeyID: drmKeyId,
          },

          SubTitle: subTitle,

          AudioTrack: audioTrack
        },
      },
    };

    axios(config)
      .then(function (response) {
        console.log("handleUpdate------",JSON.stringify(response.data));

        const result = JSON.stringify(response.data);

        setcontentInformation(result);
        alert('Updated Successfully!')
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  const handleAddButton = (e) => {
    let session_url = "http://localhost:5000/contentProperties";
    let requestbody = {
      Dash: { Manifest: dashManifest, RootFolder: dashRootFolder },
      HLS: { RootFolder: hlsRootFolder, Manifest: hlsManifest },
      DRM: { ResourceURL: drmResourceURl, KeyID: drmKeyId },
      ContentID: contentId,
      SubTitle: subTitle,
      AudioTrack: audioTrack,
      Quality: ["HD", "ATMOS"],
    };
    console.log("session_url", session_url);
    var config = {
      method: "post",
      url: session_url,
      data: requestbody,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    axios(config)
      .then(function (response) {
        console.log("add----", response);
        const result = JSON.stringify(response.data);
        alert('Saved Successfully!')

      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // console.log('setUsers',users);
  console.log("get result", contentInformation);

  console.log("get result", contentInformation?.role);
  console.log("get result", contentInformation?.data?.SubTitle);
  console.log("role----", role);

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
                onChange={(e) => setcontentId(e.target.value)}
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
            {contentInformation?.role === "admin" || defaultrole ? (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                onChange={(e) => setsubTitle(e.target.value)}
                defaultValue={contentInformation?.data?.SubTitle}
              />
            ) : (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                value={
                  contentInformation?.data?.SubTitle
                    ? contentInformation?.data?.SubTitle
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
            {contentInformation?.role === "admin" || defaultrole ? (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                onChange={(e) => setdashRootFolder(e.target.value)}
                defaultValue={contentInformation?.data?.Dash?.RootFolder}
              />
            ) : (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                value={
                  contentInformation?.data?.Dash?.RootFolder
                    ? contentInformation?.data?.Dash?.RootFolder
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
            {contentInformation?.role === "admin" || defaultrole ? (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                onChange={(e) => sethlsRootFolder(e.target.value)}
                defaultValue={contentInformation?.data?.HLS?.RootFolder}
              />
            ) : (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                value={
                  contentInformation?.data?.HLS?.RootFolder
                    ? contentInformation?.data?.HLS?.RootFolder
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
            {contentInformation?.role === "admin" || defaultrole ? (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                onChange={(e) => setdrmResourceURl(e.target.value)}
                defaultValue={contentInformation?.data?.DRM?.ResourceURL}
              />
            ) : (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                value={
                  contentInformation?.data?.DRM?.ResourceURL
                    ? contentInformation?.data?.DRM?.ResourceURL
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
            {contentInformation?.role === "admin" || defaultrole ? (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                onChange={(e) => setaudioTrack(e.target.value)}
                defaultValue={contentInformation?.data?.AudioTrack}
              />
            ) : (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                value={
                  contentInformation?.data?.AudioTrack
                    ? contentInformation?.data?.AudioTrack
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
            {contentInformation?.role === "admin" || defaultrole ? (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                onChange={(e) => setdashManifest(e.target.value)}
                defaultValue={contentInformation?.data?.Dash?.Manifest}
              />
            ) : (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                value={
                  contentInformation?.data?.Dash?.Manifest
                    ? contentInformation?.data?.Dash?.Manifest
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
            {contentInformation?.role === "admin" || defaultrole ? (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                onChange={(e) => sethlsManifest(e.target.value)}
                defaultValue={contentInformation?.data?.HLS?.Manifest}
              />
            ) : (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                value={
                  contentInformation?.data?.HLS?.Manifest
                    ? contentInformation?.data?.HLS?.Manifest
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
            {contentInformation?.role === "admin" || defaultrole ? (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                onChange={(e) => setdrmKeyId(e.target.value)}
                defaultValue={contentInformation?.data?.DRM?.KeyID}
              />
            ) : (
              <input
                type="text"
                style={{ height: "20px", marginLeft: "30px" }}
                value={
                  contentInformation?.data?.DRM?.KeyID
                    ? contentInformation?.data?.DRM?.KeyID
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

      {/* 
{contentInformation?.role === "admin" ? 
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
        </div>:
        <div style={{display:'flex',justifyContent:'center',marginTop:'30px'}}>
        <div style={{flexDirection:'row',display:'flex',justifyContent:'space-evenly',width:'60%'}}>
        {contentInformation?.data?.Quality.map((user, index) => (
                  <div className="form-check" key={index} >
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name={user.name}
                      checked={true}
                    />
                    <label className="form-check-label ms-2">{user.name}</label>
                  </div>
                ))}
                </div>
                </div> } */}

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-evenly",
            width: "60%",
          }}
        >
          {users.map((user, index) => (
            <div className="form-check" key={index}>
              {selectedRole === "admin" ? (
                <input
                  type="checkbox"
                  className="form-check-input"
                  name={user.name}
                  checked={user?.isChecked || false}
                  onChange={handleChange}
                  // defaultValue={user?.isChecked}
                />
              ) : (
                <input
                  type="checkbox"
                  className="form-check-input"
                  name={user.name}
                  checked={user?.isChecked}
                  //  onChange={handleChange}
                  // defaultValue={user?.isChecked}
                  disabled={true}
                />
              )}

              <label className="form-check-label ms-2">{user.name}</label>
            </div>
          ))}
        </div>
      </div>
      {/* {contentInformation?.role === "admin" ?  */}
      <button
        style={{ height: "20px", marginLeft: "20px" }}
        onClick={handleUpdate}
      >
        Update
      </button>
      <button
        style={{ height: "20px", marginLeft: "20px" }}
        onClick={handleAddButton}
      >
        Add
      </button>
      {/* : null} */}
    </>
  );
};
