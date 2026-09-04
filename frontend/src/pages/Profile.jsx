import { useEffect, useState } from "react";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaInfoCircle,
    FaImage,
    FaSave,
    FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import {
    getProfile,
    updateProfile,
} from "../services/profileService";

function Profile() {

    const navigate = useNavigate();

    // ======================================
    // Logged In User
    // ======================================

    const user =
        JSON.parse(localStorage.getItem("user")) || {};

    // ======================================
    // State
    // ======================================

    const [profile, setProfile] = useState({

        full_name: "",
        email: "",
        role: "",
        phone: "",
        bio: "",
        profile_image: "",

    });

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    // ======================================
    // Load Profile
    // ======================================

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            setLoading(true);

            setError("");

            const data = await getProfile();

            if (data.success && data.profile) {

                setProfile({

                    full_name:
                        data.profile.full_name || "",

                    email:
                        data.profile.email || "",

                    role:
                        data.profile.role || "",

                    phone:
                        data.profile.phone || "",

                    bio:
                        data.profile.bio || "",

                    profile_image:
                        data.profile.profile_image || "",

                });

            }

        } catch (err) {

            console.error(
                "Profile loading error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to load profile."
            );

        } finally {

            setLoading(false);

        }

    };

    // ======================================
    // Handle Input
    // ======================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setProfile((previous) => ({

            ...previous,

            [name]: value,

        }));

    };

    // ======================================
    // Save Profile
    // ======================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);

            setMessage("");

            setError("");

            const data =
                await updateProfile({

                    phone:
                        profile.phone,

                    bio:
                        profile.bio,

                    profile_image:
                        profile.profile_image,

                });

            if (data.success) {

                setMessage(
                    "Profile updated successfully!"
                );

                // Update local user information
                const currentUser =
                    JSON.parse(
                        localStorage.getItem("user")
                    ) || {};

                localStorage.setItem(
                    "user",
                    JSON.stringify({

                        ...currentUser,

                        full_name:
                            profile.full_name,

                        email:
                            profile.email,

                        role:
                            profile.role,

                    })
                );

            }

        } catch (err) {

            console.error(
                "Profile update error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to update profile."
            );

        } finally {

            setSaving(false);

        }

    };

    // ======================================
    // Profile Image
    // ======================================

    const profileImage =
        profile.profile_image ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            profile.full_name || user.full_name || "Student"
        )}&background=4f46e5&color=fff&size=200`;

    // ======================================
    // Loading
    // ======================================

    if (loading) {

        return (

            <div className="min-h-screen bg-slate-100 flex items-center justify-center">

                <div className="text-center">

                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>

                    <p className="mt-4 text-slate-600 font-medium">
                        Loading profile...
                    </p>

                </div>

            </div>

        );

    }

    // ======================================
    // UI
    // ======================================

    return (

        <div className="min-h-screen bg-slate-100 p-6 md:p-10">

            <div className="max-w-5xl mx-auto">

                {/* ======================================
                    Header
                ====================================== */}

                <div className="mb-8">

                    <button
                        onClick={() =>
                            navigate("/student/dashboard")
                        }
                        className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-medium transition mb-5"
                    >

                        <FaArrowLeft />

                        Back to Dashboard

                    </button>

                    <h1 className="text-4xl font-black text-slate-800">

                        My Profile

                    </h1>

                    <p className="mt-2 text-slate-500 text-lg">

                        Manage your personal information and profile.

                    </p>

                </div>


                {/* ======================================
                    Main Card
                ====================================== */}

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

                    {/* ==================================
                        Profile Header
                    ================================== */}

                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-10">

                        <div className="flex flex-col md:flex-row items-center gap-6">

                            {/* Profile Image */}

                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                                onError={(e) => {

                                    e.currentTarget.src =
                                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                            profile.full_name || "Student"
                                        )}&background=4f46e5&color=fff&size=200`;

                                }}
                            />

                            {/* User Information */}

                            <div className="text-center md:text-left text-white">

                                <h2 className="text-3xl font-bold">

                                    {profile.full_name ||
                                        "Student"}

                                </h2>

                                <p className="mt-1 text-indigo-100">

                                    {profile.email}

                                </p>

                                <span className="inline-block mt-3 px-4 py-1 rounded-full bg-white/20 text-sm font-semibold capitalize">

                                    {profile.role ||
                                        "Student"}

                                </span>

                            </div>

                        </div>

                    </div>


                    {/* ==================================
                        Messages
                    ================================== */}

                    <div className="px-8 pt-6">

                        {message && (

                            <div className="rounded-xl bg-green-50 border border-green-200 text-green-700 px-5 py-4 font-medium">

                                ✅ {message}

                            </div>

                        )}

                        {error && (

                            <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-5 py-4 font-medium">

                                ❌ {error}

                            </div>

                        )}

                    </div>


                    {/* ==================================
                        Form
                    ================================== */}

                    <form
                        onSubmit={handleSubmit}
                        className="p-8"
                    >

                        <h2 className="text-2xl font-bold text-slate-800 mb-6">

                            Personal Information

                        </h2>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Full Name */}

                            <div>

                                <label className="block text-sm font-semibold text-slate-700 mb-2">

                                    Full Name

                                </label>

                                <div className="relative">

                                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                                    <input
                                        type="text"
                                        value={profile.full_name}
                                        disabled
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
                                    />

                                </div>

                                <p className="mt-1 text-xs text-slate-400">

                                    Name is managed from your account.

                                </p>

                            </div>


                            {/* Email */}

                            <div>

                                <label className="block text-sm font-semibold text-slate-700 mb-2">

                                    Email Address

                                </label>

                                <div className="relative">

                                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                                    <input
                                        type="email"
                                        value={profile.email}
                                        disabled
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
                                    />

                                </div>

                                <p className="mt-1 text-xs text-slate-400">

                                    Email cannot be changed here.

                                </p>

                            </div>


                            {/* Phone */}

                            <div>

                                <label className="block text-sm font-semibold text-slate-700 mb-2">

                                    Phone Number

                                </label>

                                <div className="relative">

                                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleChange}
                                        placeholder="Enter your phone number"
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    />

                                </div>

                            </div>


                            {/* Role */}

                            <div>

                                <label className="block text-sm font-semibold text-slate-700 mb-2">

                                    Role

                                </label>

                                <div className="relative">

                                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                                    <input
                                        type="text"
                                        value={profile.role}
                                        disabled
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 capitalize cursor-not-allowed"
                                    />

                                </div>

                            </div>

                        </div>


                        {/* ==================================
                            Profile Image URL
                        ================================== */}

                        <div className="mt-6">

                            <label className="block text-sm font-semibold text-slate-700 mb-2">

                                Profile Image URL

                            </label>

                            <div className="relative">

                                <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                                <input
                                    type="url"
                                    name="profile_image"
                                    value={
                                        profile.profile_image
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="https://example.com/profile.jpg"
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                />

                            </div>

                        </div>


                        {/* ==================================
                            Bio
                        ================================== */}

                        <div className="mt-6">

                            <label className="block text-sm font-semibold text-slate-700 mb-2">

                                About Me

                            </label>

                            <div className="relative">

                                <FaInfoCircle className="absolute left-4 top-4 text-slate-400" />

                                <textarea
                                    name="bio"
                                    value={profile.bio}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder="Tell us something about yourself..."
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
                                />

                            </div>

                        </div>


                        {/* ==================================
                            Save Button
                        ================================== */}

                        <div className="mt-8 flex justify-end">

                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                            >

                                <FaSave />

                                {saving
                                    ? "Saving..."
                                    : "Save Changes"}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default Profile;