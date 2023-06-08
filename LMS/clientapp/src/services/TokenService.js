
import React from "react";
import { useAuth } from "./../routes/AuthProvider";

const TokenService = () => {
  const { user } = useAuth();
  return ({ Authorization: `Bearer ${user.token}` });
};

export default TokenService;