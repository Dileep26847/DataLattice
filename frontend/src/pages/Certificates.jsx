import { useEffect, useState } from "react";
import {
    FaCertificate,
    FaEye,
    FaGraduationCap,
    FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { getMyCertificates } from "../services/certificateService";

function Certificates() {

    const [certificates, setCertificates] = useState([]);

    const [loading, setLoading] = useState(true);

    // ======================================
    // Load Certificates
    // ======================================

    useEffect(() => {

        loadCertificates();

    }, []);

    const loadCertificates = async () => {

        try {

            setLoading(true);

            const data =
                await getMyCertificates();

            setCertificates(
                data.certificates || []
            );

        } catch (error) {

            console.error(
                "Certificate loading error:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                "Failed to load certificates."
            );

        } finally {

            setLoading(false);

        }

    };

    // ======================================
    // Format Date
    // ======================================

    const formatDate = (date) => {

        if (!date) {
            return "—";
        }

        const parsedDate =
            new Date(date);

        if (
            isNaN(
                parsedDate.getTime()
            )
        ) {
            return date;
        }

        return parsedDate.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        );

    };

    // ======================================
    // Loading
    // ======================================

    if (loading) {

        return (

            <div className="min-h-screen bg-slate-100 p-8">

                <div className="max-w-6xl mx-auto">

                    <div className="bg-white rounded-3xl shadow-xl p-10">

                        <p className="text-slate-500 text-lg">
                            Loading certificates...
                        </p>

                    </div>

                </div>

            </div>

        );

    }

    // ======================================
    // Page
    // ======================================

    return (

        <div className="min-h-screen bg-slate-100 p-6 md:p-8">

            <div className="max-w-6xl mx-auto">

                {/* ======================================
                    Header
                ====================================== */}

                <div className="mb-10">

                    <div className="flex items-center gap-4">

                        <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center">

                            <FaCertificate
                                className="text-yellow-600"
                                size={32}
                            />

                        </div>

                        <div>

                            <p className="text-indigo-600 font-semibold">
                                Achievements
                            </p>

                            <h1 className="text-4xl font-black text-slate-800">
                                My Certificates
                            </h1>

                        </div>

                    </div>

                    <p className="text-slate-500 mt-4 text-lg">
                        View your certificates earned from completed courses.
                    </p>

                </div>

                {/* ======================================
                    Empty State
                ====================================== */}

                {certificates.length === 0 ? (

                    <div className="bg-white rounded-3xl shadow-xl p-14 text-center">

                        <FaGraduationCap
                            className="mx-auto text-slate-300"
                            size={70}
                        />

                        <h2 className="text-3xl font-black mt-6">
                            No Certificates Yet
                        </h2>

                        <p className="text-slate-500 mt-3 max-w-lg mx-auto">
                            Complete all lessons and pass the required
                            quiz to become eligible for a certificate.
                        </p>

                    </div>

                ) : (

                    /* ======================================
                       Certificate Cards
                    ====================================== */

                    <div className="grid md:grid-cols-2 gap-8">

                        {certificates.map(
                            (certificate) => (

                                <motion.div
                                    key={
                                        certificate.id
                                    }
                                    initial={{
                                        opacity: 0,
                                        y: 20,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    whileHover={{
                                        y: -6,
                                    }}
                                    className="bg-white rounded-3xl shadow-xl overflow-hidden"
                                >

                                    {/* ==================================
                                        Certificate Banner
                                    ================================== */}

                                    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 p-8 text-white">

                                        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10"></div>

                                        <FaCertificate
                                            size={48}
                                        />

                                        <p className="mt-5 text-white/80 font-semibold">
                                            Data Lattice LMS
                                        </p>

                                        <h2 className="text-2xl font-black mt-1">
                                            Certificate of Completion
                                        </h2>

                                    </div>

                                    {/* ==================================
                                        Certificate Content
                                    ================================== */}

                                    <div className="p-7">

                                        <div>

                                            <p className="text-sm text-slate-500">
                                                Awarded To
                                            </p>

                                            <h3 className="text-2xl font-black text-slate-800 mt-1">
                                                {
                                                    certificate.student_name ||
                                                    "Student"
                                                }
                                            </h3>

                                        </div>

                                        {/* Course */}

                                        <div className="mt-6">

                                            <p className="text-sm text-slate-500">
                                                Course Completed
                                            </p>

                                            <div className="flex items-center gap-3 mt-2">

                                                <FaGraduationCap
                                                    className="text-indigo-600"
                                                />

                                                <p className="font-bold text-slate-800">
                                                    {
                                                        certificate.course_title
                                                    }
                                                </p>

                                            </div>

                                        </div>

                                        {/* Certificate Number */}

                                        <div className="mt-6">

                                            <p className="text-sm text-slate-500">
                                                Certificate Number
                                            </p>

                                            <p className="font-semibold text-slate-800 mt-1 break-all">
                                                {
                                                    certificate.certificate_number
                                                }
                                            </p>

                                        </div>

                                        {/* Date + Status */}

                                        <div className="grid grid-cols-2 gap-4 mt-6">

                                            <div className="bg-slate-50 rounded-2xl p-4">

                                                <p className="text-sm text-slate-500">
                                                    Issued On
                                                </p>

                                                <p className="font-bold text-slate-800 mt-1">

                                                    {formatDate(
                                                        certificate.certificate_date
                                                    )}

                                                </p>

                                            </div>

                                            <div className="bg-green-50 rounded-2xl p-4">

                                                <p className="text-sm text-green-600">
                                                    Status
                                                </p>

                                                <div className="flex items-center gap-2 mt-1">

                                                    <FaCheckCircle
                                                        className="text-green-600"
                                                    />

                                                    <p className="font-bold text-green-700">
                                                        {
                                                            certificate.status ||
                                                            "Issued"
                                                        }
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                        {/* ==================================
                                            View Certificate
                                        ================================== */}

                                        <button
                                            onClick={() =>
                                                window.open(
                                                    `/student/certificates/${certificate.id}`,
                                                    "_blank"
                                                )
                                            }
                                            className="mt-7 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl py-4 font-bold flex items-center justify-center gap-3 transition"
                                        >

                                            <FaEye />

                                            View Certificate

                                        </button>

                                    </div>

                                </motion.div>

                            )
                        )}

                    </div>

                )}

            </div>

        </div>

    );

}

export default Certificates;