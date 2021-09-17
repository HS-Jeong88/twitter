import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router";
import { collection, getDocs, orderBy, query, where } from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";
// eslint-disable-next-line
export default ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
    refreshUser();
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: newDisplayName });
    }
    refreshUser();
  };
  const getMyTweets = async () => {
    const Tweets = query(
      collection(dbService, "tweets"),
      where("owner", "==", userObj.uid),
      orderBy("createAt")
    );
    const querySnapshot = await getDocs(Tweets);
    querySnapshot.forEach((item) => {
      // console.log(item.id, " => ", item.data());
    });
  };
  useEffect(() => {
    getMyTweets();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value={newDisplayName}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};
