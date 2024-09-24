import { useEffect, useState } from "react";

export default function MyComponent() {
  const [storedValue, setStoredValue] = useState(null);

  useEffect(() => {

    if (typeof window !== "undefined") {
      const value = sessionStorage.getItem("userToken");
      if (value) {
        setStoredValue(value);
      }
    }
  }, []);

  const handleSaveToSession = () => {
    sessionStorage.setItem("myKey", "This is a stored value");
    setStoredValue("This is a stored value");
  };

  return (
    <div>
      <p>Stored Value: {storedValue}</p>
      <button onClick={handleSaveToSession}>Save to Session Storage</button>
    </div>
  );
}
