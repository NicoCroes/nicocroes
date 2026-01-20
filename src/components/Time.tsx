import { useEffect, useState } from "react";

export default function Time() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="bg-silver/80 font-light">{time.toLocaleTimeString()}</div>
    </>
  );
}
