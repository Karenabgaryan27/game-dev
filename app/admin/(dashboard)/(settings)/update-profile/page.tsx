"use client";

import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { ButtonDemo, InputDemo, BreadcrumbDemo } from "@/components/index";

const breadcrumbItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    label: "Update Profile",
  },
];

const UpdateProfile = () => {
  const [state, setState] = useState({ email: "", password: "", repeatPassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { handleUpdatePassword, handleUpdateEmail, currentUser } = useAuthContext();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (state.email && state.email !== currentUser?.email) {
      await handleUpdateEmail({ email: state.email });
    }
    if (state.password) {
      await handleUpdatePassword({ password: state.password });
    }
    setState({ email: "", password: "", repeatPassword: "" });
    setIsLoading(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (state.password !== state.repeatPassword) {
      setError(true);
    } else {
      setError(false);
    }
  }, [state]);

  return (
    <main className="p-5">
      <h2 className="text-2xl mb-3">Update Profile</h2>
      <BreadcrumbDemo items={breadcrumbItems} />
      <br />
      <br />

    </main>
  );
};

export default UpdateProfile;
