import { useEffect, useState } from "react";
import Success from "./components/success/Success";
import Users from "./components/users/Users";
import "./index.scss";

// Список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.data))
      .catch((err) => alert("Request error!"))
      .finally(() => setLoading(false));
  }, []);

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const onInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((invites) => invites.filter((_id) => _id !== id));
    } else {
      setInvites((invites) => [...invites, id]);
    }
  };

  const onSendInvites = () => {
    setSuccess(true);
  };

  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          onChangeSearchValue={onChangeSearchValue}
          onInvite={onInvite}
          onSendInvites={onSendInvites}
          searchValue={searchValue}
          users={users}
          invites={invites}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;
