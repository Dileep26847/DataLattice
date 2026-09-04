import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    FaCertificate,
    FaCheckCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";

import {
    getCertificateById,
} from "../services/certificateService";

function CertificateView() {

    const { id } = useParams();

    const [certificate, setCertificate] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadCertificate();

    }, [id]);

    const loadCertificate = async () => {

        try {

            const data =
                await getCertificateById(id);

            setCertificate(
                data.certificate
            );

        } catch (error) {

            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to load certificate."
            );

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">

                <p className="text-xl font-semibold text-slate-500">
                    Loading certificate...
                </p>

            </div>
        );

    }

    if (!certificate) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">

                <h1 className="text-3xl font-bold">
                    Certificate not found
                </h1>

            </div>
        );

    }

    const issuedDate =
        certificate.certificate_date
            ? new Date(
                  certificate.certificate_date
              ).toLocaleDateString(
                  "en-IN",
                  {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                  }
              )
            : "—";

    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

            <div className="w-full max-w-5xl">

                <div className="bg-white border-8 border-indigo-600 shadow-2xl p-8 md:p-14 text-center">

                    {/* Logo */}

                    <div className="flex justify-center">

                        <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center">

                            <FaCertificate
                                className="text-indigo-600"
                                size={50}
                            />

                        </div>

                    </div>

                    <p className="uppercase tracking-[0.3em] text-indigo-600 font-bold mt-8">
                        Data Lattice LMS
                    </p>

                    <h1 className="text-5xl font-black text-slate-800 mt-5">
                        Certificate of Completion
                    </h1>

                    <p className="text-slate-500 text-lg mt-8">
                        This certificate is proudly presented to
                    </p>

                    <h2 className="text-4xl font-black text-indigo-700 mt-4">
                        {certificate.student_name}
                    </h2>

                    <p className="text-slate-500 text-lg mt-8">
                        for successfully completing
                    </p>

                    <h3 className="text-3xl font-bold text-slate-800 mt-3">
                        {certificate.course_title}
                    </h3>

                    {/* Details */}

                    <div className="grid md:grid-cols-2 gap-6 mt-12">

                        <div className="bg-slate-50 rounded-2xl p-5">

                            <p className="text-sm text-slate-500">
                                Certificate Number
                            </p>

                            <p className="font-bold mt-2 break-all">
                                {
                                    certificate.certificate_number
                                }
                            </p>

                        </div>

                        <div className="bg-green-50 rounded-2xl p-5">

                            <p className="text-sm text-green-600">
                                Issue Date
                            </p>

                            <p className="font-bold text-green-800 mt-2">
                                {issuedDate}
                            </p>

                        </div>

                    </div>

                    {/* Status */}

                    <div className="flex justify-center mt-10">

                        <div className="flex items-center gap-3 bg-green-100 text-green-700 px-6 py-3 rounded-full font-bold">

                            <FaCheckCircle />

                            Certificate Issued

                        </div>

                    </div>

                    <p className="text-slate-400 text-sm mt-10">
                        This certificate was issued by Data Lattice LMS.
                    </p>

                </div>

            </div>

        </div>

    );

}

export default CertificateView;