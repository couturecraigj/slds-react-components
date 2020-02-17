import { useState } from "react";

const useLocation = (): [Position, () => Promise<Position>] => {
  const [location, setLocation] = useState<Position>();
  const getLocation = (): Promise<Position> =>
    typeof window === "object"
      ? new Promise((resolve, reject) => {
          return navigator.geolocation.getCurrentPosition(position => {
            setLocation(position);
            resolve(position);
          }, reject);
        })
      : Promise.resolve(location);
  return [location, getLocation];
};

export default useLocation;
