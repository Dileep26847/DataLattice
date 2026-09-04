import { useState } from "react";

import {
  FaUser,
  FaLock,
  FaSave,
  FaTrash,
  FaMoon,
  FaBell,
  FaEnvelope,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

import {
  successToast,
  errorToast,
} from "../utils/toast";

import {
  changePassword,
} from "../services/settingsService";

import {
  updateProfile,
} from "../services/profileService";


function Settings() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // ======================================
  // Form State
  // ======================================

  const [form, setForm] = useState({
    full_name: user?.full_name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifications: true,
    darkMode: false,
  });

  // ======================================
  // Loading States
  // ======================================

  const [profileSaving, setProfileSaving] =
    useState(false);

  const [passwordSaving, setPasswordSaving] =
    useState(false);

  // ======================================
  // Handle Input
  // ======================================

  const handleChange = (e) => {

    const {
      name,
      value,
      checked,
      type,
    } = e.target;

    setForm((previous) => ({
      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

  };

  // ======================================
  // Save Profile
  // ======================================

  const saveProfile = async () => {

    if (!user?.id) {

      errorToast(
        "User session not found."
      );

      return;

    }

    try {

      setProfileSaving(true);

      await updateProfile(
        user.id,
        {
          full_name: form.full_name,
        }
      );

      // Update local storage
      const updatedUser = {
        ...user,
        full_name: form.full_name,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      successToast(
        "Profile updated successfully."
      );

    } catch (error) {

      console.error(
        "Profile update error:",
        error
      );

      errorToast(
        error?.response?.data?.message ||
        "Profile update failed."
      );

    } finally {

      setProfileSaving(false);

    }

  };

  // ======================================
  // Change Password
  // ======================================

  const changePasswordHandler =
    async () => {

      if (!user?.id) {

        errorToast(
          "User session not found."
        );

        return;

      }

      if (
        !form.currentPassword ||
        !form.newPassword ||
        !form.confirmPassword
      ) {

        errorToast(
          "Please fill all password fields."
        );

        return;

      }

      if (
        form.newPassword.length < 6
      ) {

        errorToast(
          "New password must be at least 6 characters."
        );

        return;

      }

      if (
        form.newPassword !==
        form.confirmPassword
      ) {

        errorToast(
          "Passwords do not match."
        );

        return;

      }

      try {

        setPasswordSaving(true);

        const data =
          await changePassword(
            user.id,
            {
              currentPassword:
                form.currentPassword,

              newPassword:
                form.newPassword,
            }
          );

        successToast(
          data.message ||
          "Password updated successfully."
        );

        setForm((previous) => ({
          ...previous,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));

      } catch (error) {

        console.error(
          "Password update error:",
          error
        );

        errorToast(
          error?.response?.data?.message ||
          "Password update failed."
        );

      } finally {

        setPasswordSaving(false);

      }

    };

  // ======================================
  // Render
  // ======================================

  return (

    <div className="min-h-screen bg-slate-100 py-10 sm:py-12">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ==================================
            Header
        ================================== */}

        <div className="mb-10">

          <h1 className="text-3xl sm:text-4xl font-black text-slate-800">

            Account Settings

          </h1>

          <p className="text-slate-500 mt-2">

            Manage your account, security and
            learning preferences.

          </p>

        </div>


        {/* ==================================
            Profile Information
        ================================== */}

        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">

          <div className="flex items-center gap-4 mb-8">

            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">

              <FaUser className="text-blue-600 text-xl" />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-800">

                Profile Information

              </h2>

              <p className="text-sm text-slate-500 mt-1">

                Update your basic account information.

              </p>

            </div>

          </div>


          <div className="grid md:grid-cols-2 gap-6">

            {/* Full Name */}

            <div>

              <label className="block text-sm font-bold text-slate-700 mb-2">

                Full Name

              </label>

              <div className="relative">

                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>


            {/* Email */}

            <div>

              <label className="block text-sm font-bold text-slate-700 mb-2">

                Email Address

              </label>

              <div className="relative">

                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="email"
                  value={form.email}
                  disabled
                  className="w-full border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 bg-slate-100 text-slate-500 cursor-not-allowed"
                />

              </div>

              <p className="text-xs text-slate-400 mt-2">

                Email address cannot be changed here.

              </p>

            </div>

          </div>


          <button
            onClick={saveProfile}
            disabled={profileSaving}
            className="mt-8 inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-7 py-3.5 rounded-xl font-bold transition"
          >

            {profileSaving ? (

              <>
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />

                Saving...

              </>

            ) : (

              <>
                <FaSave />

                Save Changes

              </>

            )}

          </button>

        </div>


        {/* ==================================
            Change Password
        ================================== */}

        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 mt-8">

          <div className="flex items-center gap-4 mb-8">

            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">

              <FaLock className="text-green-600 text-xl" />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-800">

                Change Password

              </h2>

              <p className="text-sm text-slate-500 mt-1">

                Keep your account secure with a strong password.

              </p>

            </div>

          </div>


          <div className="grid md:grid-cols-3 gap-6">

            {/* Current */}

            <div>

              <label className="block text-sm font-bold text-slate-700 mb-2">

                Current Password

              </label>

              <input
                type="password"
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                placeholder="Current password"
                className="w-full border border-slate-200 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

            </div>


            {/* New */}

            <div>

              <label className="block text-sm font-bold text-slate-700 mb-2">

                New Password

              </label>

              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="New password"
                className="w-full border border-slate-200 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

            </div>


            {/* Confirm */}

            <div>

              <label className="block text-sm font-bold text-slate-700 mb-2">

                Confirm Password

              </label>

              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full border border-slate-200 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

            </div>

          </div>


          <button
            onClick={changePasswordHandler}
            disabled={passwordSaving}
            className="mt-8 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-7 py-3.5 rounded-xl font-bold transition"
          >

            {passwordSaving
              ? "Updating..."
              : "Update Password"}

          </button>

        </div>


        {/* ==================================
            Preferences
        ================================== */}

        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 mt-8">

          <div className="flex items-center gap-4 mb-8">

            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center">

              <FaShieldAlt className="text-purple-600 text-xl" />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-800">

                Preferences

              </h2>

              <p className="text-sm text-slate-500 mt-1">

                Control how Data Lattice communicates with you.

              </p>

            </div>

          </div>


          <div className="space-y-4">

            {/* Notifications */}

            <label className="flex items-center justify-between gap-5 border border-slate-200 rounded-2xl p-5 cursor-pointer hover:bg-slate-50 transition">

              <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">

                  <FaBell className="text-blue-600" />

                </div>

                <div>

                  <h3 className="font-bold text-slate-800">

                    Email Notifications

                  </h3>

                  <p className="text-sm text-slate-500 mt-1">

                    Receive updates about courses,
                    assignments and learning activity.

                  </p>

                </div>

              </div>

              <input
                type="checkbox"
                name="notifications"
                checked={form.notifications}
                onChange={handleChange}
                className="w-5 h-5 accent-blue-600"
              />

            </label>


            {/* Dark Mode */}

            <div className="flex items-center justify-between gap-5 border border-slate-200 rounded-2xl p-5 opacity-60">

              <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">

                  <FaMoon className="text-indigo-600" />

                </div>

                <div>

                  <h3 className="font-bold text-slate-800">

                    Dark Mode

                  </h3>

                  <p className="text-sm text-slate-500 mt-1">

                    Dark mode will be available in a future update.

                  </p>

                </div>

              </div>

              <input
                type="checkbox"
                checked={form.darkMode}
                disabled
                className="w-5 h-5"
              />

            </div>

          </div>

        </div>


        {/* ==================================
            Account Security
        ================================== */}

        <div className="bg-green-50 border border-green-100 rounded-3xl p-6 sm:p-8 mt-8">

          <div className="flex gap-4">

            <FaCheckCircle className="text-green-600 text-xl mt-1" />

            <div>

              <h3 className="font-bold text-green-800">

                Account Security

              </h3>

              <p className="text-green-700 text-sm mt-1 leading-6">

                Your account is protected by authenticated
                access. Never share your password or
                authentication credentials with anyone.

              </p>

            </div>

          </div>

        </div>


        {/* ==================================
            Danger Zone
        ================================== */}

        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 mt-8 border border-red-200">

          <div className="flex items-center gap-4 mb-5">

            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">

              <FaTrash className="text-red-600 text-xl" />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-red-600">

                Danger Zone

              </h2>

              <p className="text-sm text-slate-500 mt-1">

                Permanent account actions.

              </p>

            </div>

          </div>


          <p className="text-slate-600 leading-7 max-w-3xl">

            Deleting your account is permanent. Your
            enrolled courses, progress, certificates and
            profile information may be removed permanently.

          </p>


          <button
            onClick={() =>
              errorToast(
                "Delete Account feature will be available soon."
              )
            }
            className="mt-7 inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-7 py-3.5 rounded-xl font-bold transition"
          >

            <FaTrash />

            Delete Account

          </button>

        </div>

      </div>

    </div>

  );
}

export default Settings;