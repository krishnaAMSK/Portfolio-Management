import { useUser } from '../contexts/userContext';

export default function MyComponent() {
const user = useUser(); 
  return (
    <div>{user?.name}</div>
  );
}
