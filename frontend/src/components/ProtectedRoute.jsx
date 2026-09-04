import { Navigate } from "react-router-dom";


function ProtectedRoute({
  children,
  allowedRole,
}) {

  const token =
    localStorage.getItem("token");

  const userData =
    localStorage.getItem("user");


  let user = null;


  // ============================================================
  // SAFE USER PARSING
  // ============================================================

  try {

    user =
      userData
        ? JSON.parse(userData)
        : null;

  }

  catch (error) {

    console.error(
      "PROTECTED ROUTE USER PARSE ERROR:",
      error
    );

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  // ============================================================
  // AUTH CHECK
  // ============================================================

  if (
    !token ||
    !user ||
    !user.id ||
    !user.role
  ) {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  // ============================================================
  // ROLE CHECK
  // ============================================================

  if (
    allowedRole &&
    user.role !== allowedRole
  ) {

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }


  return children;

}


export default ProtectedRoute;