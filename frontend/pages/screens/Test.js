import { useUser } from '../contexts/userContext';

export default function MyComponent() {
  const { user, setUser } = useUser();

  const handleNameChange = (e) => {
    const updatedUser = { ...user, name: e.target.value };
    setUser(updatedUser);
  };

  return (
    <div>
      <div>{user?.name}</div>
      <div className="mb-4">
        <label className="block text-white-700 font-bold mb-2">Name</label>
        <input
          type="text"
          value={user?.name}
          onChange={handleNameChange}
          className="w-full p-2 text-black border rounded"
        />
      </div>
    </div>
  );
}
