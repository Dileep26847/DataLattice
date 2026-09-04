import { useEffect, useState } from "react";
import {
  FaSearch,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import toast from "react-hot-toast";

import {
  getSubmissions,
  deleteSubmission,
} from "../../services/submissionService";

import ReviewSubmissionModal from "./ReviewSubmissionModal";

function SubmissionTable() {

  const [submissions, setSubmissions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showReview, setShowReview] = useState(false);

  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  useEffect(() => {

    const keyword = search.toLowerCase();

    setFiltered(

      submissions.filter((submission) =>

        submission.assignment_title
          ?.toLowerCase()
          .includes(keyword) ||

        submission.student_name
          ?.toLowerCase()
          .includes(keyword)

      )

    );

  }, [search, submissions]);

  const loadSubmissions = async () => {

    try {

      const data = await getSubmissions();

      setSubmissions(data.submissions || []);

      setFiltered(data.submissions || []);

    }

    catch (err) {

      console.log(err);

      toast.error("Failed to load submissions");

    }

    finally {

      setLoading(false);

    }

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this submission?")) return;

    try {

      await deleteSubmission(id);

      toast.success("Submission Deleted");

      loadSubmissions();

    }

    catch (err) {

      console.log(err);

      toast.error("Delete Failed");

    }

  };

  return (

    <>

      <div className="bg-white rounded-3xl shadow-xl p-8">

        {/* Header */}

        <div className="mb-8">

          <h2 className="text-3xl font-black">

            Assignment Submissions

          </h2>

          <p className="text-slate-500 mt-2">

            Review all student submissions.

          </p>

        </div>

        {/* Search */}

        <div className="relative mb-8">

          <FaSearch className="absolute left-4 top-4 text-slate-400"/>

          <input

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

            placeholder="Search..."

            className="w-full rounded-xl bg-slate-100 pl-12 py-3 outline-none"

          />

        </div>

        {

          loading

          ?

          <div className="py-20 text-center">

            Loading...

          </div>

          :

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="py-4 text-left">

                  Assignment

                </th>

                <th>

                  Student

                </th>

                <th>

                  Submitted

                </th>

                <th>

                  Marks

                </th>

                <th>

                  Status

                </th>

                <th>

                  Actions

                </th>

              </tr>

            </thead>

            <tbody>

              {

                filtered.length > 0

                ?

                filtered.map((submission)=>(

                  <tr

                    key={submission.id}

                    className="border-b hover:bg-slate-50"

                  >

                    <td className="py-5 font-bold">

                      {submission.assignment_title}

                    </td>

                    <td>

                      {submission.student_name}

                    </td>

                    <td>

                      {

                        new Date(

                          submission.submitted_at

                        ).toLocaleDateString()

                      }

                    </td>

                    <td>

                      {

                        submission.marks ??

                        "-"

                      }

                    </td>

                    <td>

                      <span

                        className={`px-4 py-2 rounded-full font-semibold

                        ${submission.status==="Reviewed"

                          ? "bg-green-100 text-green-700"

                          : submission.status==="Rejected"

                          ? "bg-red-100 text-red-700"

                          : "bg-yellow-100 text-yellow-700"

                        }`}

                      >

                        {submission.status}

                      </span>

                    </td>

                    <td>

                      <div className="flex gap-3 justify-center">

                        <button

                          onClick={()=>{

                            setSelectedSubmission(submission);

                            setShowReview(true);

                          }}

                          className="bg-blue-600 text-white p-3 rounded-xl"

                        >

                          <FaEdit/>

                        </button>

                        <button

                          onClick={()=>handleDelete(submission.id)}

                          className="bg-red-600 text-white p-3 rounded-xl"

                        >

                          <FaTrash/>

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

                :

                <tr>

                  <td

                    colSpan="6"

                    className="py-20 text-center text-slate-500"

                  >

                    No Submissions Found

                  </td>

                </tr>

              }

            </tbody>

          </table>

        }

      </div>

      {

        showReview &&

        <ReviewSubmissionModal

          submission={selectedSubmission}

          close={()=>setShowReview(false)}

          refresh={loadSubmissions}

        />

      }

    </>

  );

}

export default SubmissionTable;