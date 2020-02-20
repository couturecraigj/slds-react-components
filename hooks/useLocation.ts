import { useState } from "react";

const useLocation = (): [
  Position | undefined,
  () => Promise<Position | undefined>
] => {
  const [location, setLocation] = useState<Position | undefined>();
  const getLocation = (): Promise<Position | undefined> =>
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
