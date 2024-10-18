import React from 'react'

import ContentLoaderWrapper from "./ContentLoaderWrapper";
import { useSelector } from "react-redux";
import ListItem from "./ListItem";

const LocationList = () => {
  const { state, area, city } = useSelector(state => state.communityFilter);



  return (
    <div className="w-100">
      {!state ? (
        <ContentLoaderWrapper/>
      ) : (
        <ul className="w-100 list-unstyled">
          {
            city ? (
              <ListItem parent={city?.area} subElement={city?.area?.city || []} parentPathNumber={3} childrenPathNumber={4}/>
            ) : area ? (
              <ListItem parent={area} subElement={area?.city || []} parentPathNumber={3} childrenPathNumber={4}/>
            ) : (
              <ListItem parent={state} subElement={state?.area || []} parentPathNumber={2} childrenPathNumber={3}/>
            )
          }
        </ul>
      )}
    </div>
  );
};

export default LocationList;
