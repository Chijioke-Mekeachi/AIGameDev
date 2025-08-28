"use client";
import { useEffect, useState } from "react";
import LeftScreen from "../../../component/MainScreen/LeftScreen";
import MidScreen from "../../../component/MainScreen/MidScreen";
import RightScreen from "../../../component/MainScreen/RightScreen";
import Top from "../../../component/nav/Top";
import { supabase } from "../../../component/lib/supabase";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);

        const { data, error } = await supabase
          .from("profile")
          .select("*")
          .eq("id", user.id)
          .single();

        if (!error) {
          setProfile(data);
        }
      }else if(!user) {
        window.location.href = "/Login"; // Redirect to login if no user
      }
    }
    fetchUser();
  }, []);

  return (
    <div>
      <Top />
      {/* body */}
      <section className="md:flex h-screen">
        <LeftScreen />
        <MidScreen />
        <RightScreen />
      </section>

      {/* Example: show profile */}
      {profile && (
        <div className="p-4 text-white">
          <h2>Welcome, {profile.username}</h2>
          <p>Course: {profile.course}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
