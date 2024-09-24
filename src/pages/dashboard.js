import React, { useEffect, useState } from "react";
import tokenVilidity from '../hooks/useAuth';
import DefaultLayout from "../component/Layouts/DefaultLayout";
import GoogleMaps from "../component/GoogleMap/googleMps";
import MemberCard from "../component/MemberCard/memberCard";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter()
  
    // tokenVilidity(router);
  

    return (
        <DefaultLayout>
         <GoogleMaps/>
         <MemberCard/>
        </DefaultLayout>
    );
};

export default Dashboard;
