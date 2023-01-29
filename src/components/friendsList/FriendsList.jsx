import React,{useEffect} from 'react'
import { setFriends } from '../../redux';
import Friends from '../friends/Friends'
import "./FriendsList.css"
import { useDispatch, useSelector } from 'react-redux'


const FriendsList = ({userId}) => {
  const dispatch=useDispatch();
  
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const getFriends = async () => {
    // const response = await fetch(
    //   `http://localhost:3001/user/${userId}/friends`,
    //   {
    //     method: "GET",
    //     headers: { Authorization: `Bearer ${token}` },
    //   }
    // );
    // const data = await response.json();
    // dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <div className="box">
        <h5>Friends</h5>
        <input type="text" />
        <div className="friends">
        {friends.map((friend) => (
          <Friends
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
        </div>
      </div>
    </>
  )
}

export default FriendsList