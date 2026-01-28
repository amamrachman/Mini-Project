"use client"

import { getUser, login } from "@/lib/auth";
import React, { useState } from "react";

const PercobaanLoginLaravel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      await login(email, password);
      const u = await getUser();
      setUser(u);
    } catch (error) {
      setError("Login Gagal");
    }
  };
  return (
    <div style={{ padding: 40 }}>
      <h1>Login Sanctum SPA</h1>

      {!user && (
        <>
          <input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <button onClick={handleLogin}>Login</button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}

      {user && (
        <>
          <h2>Login berhasil 🎉</h2>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </div>
  );
};

export default PercobaanLoginLaravel;
