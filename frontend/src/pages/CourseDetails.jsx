import { useEffect, useState } from "react";
import {
    FaCertificate,
    FaDownload,
    FaGraduationCap,
    FaCalendarAlt,
    FaIdBadge,
} from "react-icons/fa";

import { getMyCertificates } from "../services/certificateService";

function Certificates() {

    const [certificates, setCertificates] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    // ======================================
    // Load Certificates
    // ======================================

    useEffect(() => {

        loadCertificates();

    }, []);

    const loadCertificates = async () => {

        try {

            setLoading(true);

            setError("");

            const data =
                await getMyCertificates();

            setCertificates(
                data.certificates || []
            );

        } catch (err) {

            console.error(
                "Certificate loading error:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Unable to load certificates."
            );

        } finally {

            setLoading(false);

        }

    };

    // ======================================
    // Format Date
    // ======================================

    const formatDate = (date) => {

        if (!date) return "N/A";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );

    };

    // ======================================
    // Download Certificate
    // ======================================

    const handleDownload = (certificate) => {

        window.print();

    };

    // ======================================
    // Loading
    // ======================================

    if (loading) {

        return (

            <div className="min-h-screen bg-slate-100 flex items-center justify-center">

                <div className="text-center">

                    <div className="w-10 h-10 mx-auto border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />

                    <h2 className="text-xl font-bold text-slate-700 mt-5">

                        Loading Certificates...

                    </h2>

                </div>

            </div>

        );

    }

    // ======================================
    // Error
    // ======================================

    if (error) {

        return (

            <div className="min-h-screen bg-slate-100 px-6 py-12">

                <div className="max-w-5xl mx-auto">

                    <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

                        <div className="text-5xl">
                            ⚠️
                        </div>

                        <h1 className="text-2xl font-bold text-slate-800 mt-5">

                            Unable to Load Certificates

                        </h1>

                        <p className="text-red-500 mt-3">

                            {error}

                        </p>

                        <button
                            onClick={loadCertificates}
                            className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold"
                        >

                            Try Again

                        </button>

                    </div>

                </div>

            </div>

        );

    }

    // ======================================
    // Main UI
    // ======================================

    return (

        <div className="min-h-screen bg-slate-100">

            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

                {/* ================================== */}
                {/* Header */}
                {/* ================================== */}

                <div className="mb-10">

                    <div className="flex items-center gap-4">

                        <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">

                            <FaCertificate className="text-3xl text-indigo-600" />

                        </div>

                        <div>

                            <h1 className="text-4xl font-black text-slate-800">

                                My Certificates

                            </h1>

                            <p className="text-slate-500 mt-2">

                                View and download your earned
                                course certificates.

                            </p>

                        </div>

                    </div>

                </div>

                {/* ================================== */}
                {/* Certificate Count */}
                {/* ================================== */}

                <div className="mb-8">

                    <div className="inline-flex items-center gap-3 bg-white rounded-2xl shadow-sm px-6 py-4">

                        <FaGraduationCap className="text-indigo-600 text-xl" />

                        <span className="font-semibold text-slate-700">

                            {certificates.length}

                            {" "}

                            {certificates.length === 1
                                ? "Certificate"
                                : "Certificates"}

                        </span>

                    </div>

                </div>

                {/* ================================== */}
                {/* Empty State */}
                {/* ================================== */}

                {certificates.length === 0 ? (

                    <div className="bg-white rounded-3xl shadow-lg p-16 text-center">

                        <div className="w-24 h-24 mx-auto rounded-full bg-indigo-50 flex items-center justify-center">

                            <FaCertificate className="text-5xl text-indigo-300" />

                        </div>

                        <h2 className="text-3xl font-bold text-slate-800 mt-7">

                            No Certificates Yet

                        </h2>

                        <p className="text-slate-500 max-w-xl mx-auto mt-4 leading-7">

                            Complete your course lessons and
                            pass the final quiz to become
                            eligible for a certificate.

                        </p>

                    </div>

                ) : (

                    /* ================================== */
                    /* Certificate Cards */
                    /* ================================== */

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                        {certificates.map(
                            (certificate) => (

                                <div
                                    key={certificate.id}
                                    className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                                >

                                    {/* Certificate Banner */}

                                    <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 p-8 text-white">

                                        <div className="absolute top-4 right-5 opacity-20 text-6xl">

                                            <FaCertificate />

                                        </div>

                                        <FaGraduationCap className="text-4xl" />

                                        <p className="text-white/70 text-sm font-semibold mt-6 uppercase tracking-wider">

                                            Certificate of Completion

                                        </p>

                                        <h2 className="text-2xl font-black mt-2 leading-tight">

                                            {certificate.course_title}

                                        </h2>

                                    </div>

                                    {/* Certificate Information */}

                                    <div className="p-6">

                                        <div className="space-y-4">

                                            <div className="flex items-start gap-3">

                                                <FaIdBadge className="text-indigo-600 mt-1" />

                                                <div>

                                                    <p className="text-xs text-slate-400 uppercase font-semibold">

                                                        Certificate ID

                                                    </p>

                                                    <p className="text-sm font-bold text-slate-700 break-all mt-1">

                                                        {certificate.certificate_number}

                                                    </p>

                                                </div>

                                            </div>

                                            <div className="flex items-start gap-3">

                                                <FaCalendarAlt className="text-indigo-600 mt-1" />

                                                <div>

                                                    <p className="text-xs text-slate-400 uppercase font-semibold">

                                                        Issued On

                                                    </p>

                                                    <p className="text-sm font-bold text-slate-700 mt-1">

                                                        {formatDate(
                                                            certificate.certificate_date
                                                        )}

                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                        {/* Status */}

                                        <div className="mt-6">

                                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-bold">

                                                <span className="w-2 h-2 rounded-full bg-green-500" />

                                                {certificate.status}

                                            </span>

                                        </div>

                                        {/* Download */}

                                        <button
                                            onClick={() =>
                                                handleDownload(
                                                    certificate
                                                )
                                            }
                                            className="w-full mt-6 flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold transition"
                                        >

                                            <FaDownload />

                                            Download Certificate

                                        </button>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </div>

    );

}

export default Certificates;