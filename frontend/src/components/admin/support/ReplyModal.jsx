import { useState } from "react";
import toast from "react-hot-toast";

import {
  FaTimes,
  FaUserGraduate,
  FaEnvelope,
  FaFolderOpen,
  FaCalendarAlt,
  FaTicketAlt,
  FaCommentDots,
  FaPaperPlane,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";

import { replyTicket } from "../../../services/supportService";

function ReplyModal({ ticket, close, refresh }) {

  const [loading, setLoading] = useState(false);

  const [reply, setReply] = useState(
    ticket.admin_reply || ""
  );

  const [status, setStatus] = useState(
    ticket.status || "Open"
  );

  const handleSubmit = async (e) => {

    e.preventDefault();

    // ======================================
    // Validation
    // ======================================

    if (!reply.trim()) {

      toast.error(
        "Please enter a reply before submitting."
      );

      return;

    }

    try {

      setLoading(true);

      // ======================================
      // API Request
      // ======================================

      await replyTicket(
        ticket.id,
        {
          admin_reply: reply.trim(),
          status,
        }
      );

      // ======================================
      // Success
      // ======================================

      toast.success(
        "Reply sent successfully!"
      );

      // ======================================
      // Refresh Ticket List
      // ======================================

      await refresh();

      // ======================================
      // Close Modal
      // ======================================

      close();

    } catch (err) {

      console.error(
        "REPLY TICKET ERROR:",
        err
      );

      toast.error(
        err.response?.data?.message ||
        "Failed to send reply."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="sticky top-0 bg-white z-10 flex justify-between items-center px-8 py-6 border-b">

          <div>

            <h2 className="text-3xl font-black text-slate-800">

              💬 Reply Support Ticket

            </h2>

            <p className="text-slate-500 mt-1">

              Review the request and respond to the student.

            </p>

          </div>

          <button
            type="button"
            onClick={close}
            disabled={loading}
            className="w-12 h-12 rounded-full bg-slate-100 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center disabled:opacity-50"
          >

            <FaTimes size={18} />

          </button>

        </div>


        {/* ======================================
            FORM
        ====================================== */}

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-8"
        >

          {/* ======================================
              STUDENT INFORMATION
          ====================================== */}

          <div className="bg-slate-50 rounded-3xl p-6 border">

            <h3 className="text-xl font-bold text-slate-800 mb-6">

              Student Information

            </h3>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-2xl bg-cyan-100 flex items-center justify-center">

                  <FaUserGraduate
                    className="text-cyan-600"
                    size={20}
                  />

                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Student Name
                  </p>

                  <h4 className="font-bold text-lg">
                    {ticket.full_name}
                  </h4>

                </div>

              </div>


              <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center">

                  <FaEnvelope
                    className="text-indigo-600"
                    size={18}
                  />

                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Email Address
                  </p>

                  <h4 className="font-semibold">
                    {ticket.email}
                  </h4>

                </div>

              </div>


              <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">

                  <FaFolderOpen
                    className="text-emerald-600"
                    size={18}
                  />

                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Category
                  </p>

                  <h4 className="font-semibold">
                    {ticket.category}
                  </h4>

                </div>

              </div>


              <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center">

                  <FaCalendarAlt
                    className="text-amber-600"
                    size={18}
                  />

                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Created On
                  </p>

                  <h4 className="font-semibold">

                    {new Date(
                      ticket.created_at
                    ).toLocaleDateString()}

                  </h4>

                </div>

              </div>

            </div>

          </div>


          {/* ======================================
              TICKET DETAILS
          ====================================== */}

          <div className="bg-white border rounded-3xl p-6">

            <div className="flex items-center gap-3 mb-5">

              <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center">

                <FaTicketAlt
                  className="text-rose-600"
                  size={18}
                />

              </div>

              <div>

                <h3 className="text-xl font-bold">
                  Ticket Details
                </h3>

                <p className="text-slate-500">
                  Review the student's issue.
                </p>

              </div>

            </div>


            <div className="bg-slate-50 rounded-2xl p-6">

              <h3 className="text-2xl font-bold text-slate-800">

                {ticket.title}

              </h3>

              <p className="mt-4 leading-8 text-slate-600">

                {ticket.description}

              </p>

            </div>

          </div>


          {/* ======================================
              REPLY
          ====================================== */}

          <div className="bg-white border rounded-3xl p-6">

            <div className="flex items-center gap-3 mb-5">

              <div className="w-12 h-12 rounded-2xl bg-cyan-100 flex items-center justify-center">

                <FaCommentDots
                  className="text-cyan-600"
                  size={18}
                />

              </div>

              <div>

                <h3 className="text-xl font-bold">
                  Admin Reply
                </h3>

                <p className="text-slate-500">
                  Respond professionally to the student.
                </p>

              </div>

            </div>


            <textarea
              rows={8}
              value={reply}
              onChange={(e) =>
                setReply(e.target.value)
              }
              disabled={loading}
              placeholder="Write your reply here..."
              required
              className="w-full rounded-2xl border border-slate-300 p-5 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all resize-none disabled:bg-slate-100 disabled:cursor-not-allowed"
            />

          </div>


          {/* ======================================
              STATUS
          ====================================== */}

          <div className="bg-white border rounded-3xl p-6">

            <h3 className="text-xl font-bold mb-5">

              Ticket Status

            </h3>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              disabled={loading}
              className="w-full rounded-2xl border border-slate-300 p-4 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all disabled:bg-slate-100"
            >

              <option value="Open">
                🔴 Open
              </option>

              <option value="In Progress">
                🟡 In Progress
              </option>

              <option value="Resolved">
                🟢 Resolved
              </option>

            </select>

          </div>


          {/* ======================================
              SUBMISSION PROGRESS
          ====================================== */}

          {loading && (

            <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-5">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-full bg-cyan-600 text-white flex items-center justify-center">

                  <FaSpinner
                    className="animate-spin"
                  />

                </div>

                <div>

                  <p className="font-bold text-cyan-800">

                    Sending reply...

                  </p>

                  <p className="text-sm text-cyan-600 mt-1">

                    Please wait while we update the support ticket.

                  </p>

                </div>

              </div>

            </div>

          )}


          {/* ======================================
              FOOTER
          ====================================== */}

          <div className="flex flex-col md:flex-row justify-end gap-4 pt-2">

            <button
              type="button"
              onClick={close}
              disabled={loading}
              className="px-8 py-3 rounded-2xl border border-slate-300 font-semibold hover:bg-slate-100 transition-all disabled:opacity-50"
            >

              Cancel

            </button>


            <button
              type="submit"
              disabled={loading || !reply.trim()}
              className="px-8 py-3 rounded-2xl bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-all disabled:opacity-60 flex items-center justify-center gap-3"
            >

              {loading ? (

                <>
                  <FaSpinner className="animate-spin" />
                  Sending Reply...
                </>

              ) : (

                <>
                  <FaPaperPlane />
                  Send Reply
                </>

              )}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default ReplyModal;