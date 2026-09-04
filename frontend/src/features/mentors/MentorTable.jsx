import { useEffect, useState } from "react";

import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";

import AddMentorModal from "./AddMentorModal";
import EditMentorModal from "./EditMentorModal";
import MentorProfileModal from "./MentorProfileModal";

import {
  getMentors,
  deleteMentor,
} from "../../services/mentorService";

function MentorTable() {

  // ==========================================================
  // STATE
  // ==========================================================

  const [mentors, setMentors] =
    useState([]);

  const [filteredMentors, setFilteredMentors] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [showProfileModal, setShowProfileModal] =
    useState(false);

  const [selectedMentor, setSelectedMentor] =
    useState(null);


  // ==========================================================
  // LOAD MENTORS
  // ==========================================================

  useEffect(() => {

    loadMentors();

  }, []);


  const loadMentors = async () => {

    try {

      setLoading(true);

      const res =
        await getMentors();

      const mentorList =
        Array.isArray(res?.mentors)
          ? res.mentors
          : [];

      setMentors(
        mentorList
      );

      setFilteredMentors(
        mentorList
      );

    }

    catch (err) {

      console.error(
        "LOAD MENTORS ERROR:",
        err
      );

      setMentors([]);

      setFilteredMentors([]);

    }

    finally {

      setLoading(false);

    }

  };


  // ==========================================================
  // SEARCH
  // ==========================================================

  const handleSearch = (e) => {

    const value =
      e.target.value;

    setSearch(value);


    if (!value.trim()) {

      setFilteredMentors(
        mentors
      );

      return;

    }


    const searchValue =
      value.toLowerCase();


    const filtered =
      mentors.filter(
        (mentor) => {

          return (

            mentor.full_name
              ?.toLowerCase()
              .includes(
                searchValue
              )

            ||

            mentor.email
              ?.toLowerCase()
              .includes(
                searchValue
              )

            ||

            mentor.phone
              ?.toLowerCase()
              .includes(
                searchValue
              )

            ||

            mentor.designation
              ?.toLowerCase()
              .includes(
                searchValue
              )

            ||

            mentor.specialization
              ?.toLowerCase()
              .includes(
                searchValue
              )

          );

        }
      );


    setFilteredMentors(
      filtered
    );

  };


  // ==========================================================
  // VIEW MENTOR
  // ==========================================================

  const handleView = (
    mentor
  ) => {

    setSelectedMentor(
      mentor
    );

    setShowProfileModal(
      true
    );

  };


  // ==========================================================
  // EDIT MENTOR
  // ==========================================================

  const handleEdit = (
    mentor
  ) => {

    setSelectedMentor(
      mentor
    );

    setShowEditModal(
      true
    );

  };


  // ==========================================================
  // DELETE MENTOR
  // ==========================================================

  const handleDelete = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this mentor?"
      );


    if (!confirmDelete) {

      return;

    }


    try {

      await deleteMentor(
        id
      );

      await loadMentors();

    }

    catch (err) {

      console.error(
        "DELETE MENTOR ERROR:",
        err
      );

    }

  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-lg
        p-6
      "
    >

      {/* ====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
          mb-6
        "
      >

        <div>

          <h2
            className="
              text-2xl
              font-bold
              text-slate-800
            "
          >

            Mentor Management

          </h2>

          <p
            className="
              text-sm
              text-slate-500
              mt-1
            "
          >

            {filteredMentors.length} mentor
            {filteredMentors.length === 1
              ? ""
              : "s"} found

          </p>

        </div>


        <button

          type="button"

          onClick={() =>
            setShowAddModal(true)
          }

          className="
            bg-cyan-600
            hover:bg-cyan-700
            text-white
            px-5
            py-3
            rounded-xl
            flex
            items-center
            justify-center
            gap-2
            transition
            shrink-0
          "

        >

          <FaPlus />

          Add Mentor

        </button>

      </div>


      {/* ====================================================
          SEARCH
      ===================================================== */}

      <div
        className="
          relative
          mb-6
        "
      >

        <FaSearch
          className="
            absolute
            left-4
            top-4
            text-gray-400
          "
        />


        <input

          type="text"

          placeholder="
            Search by name, email, designation or specialization...
          "

          value={search}

          onChange={handleSearch}

          className="
            pl-12
            pr-4
            w-full
            border
            border-gray-300
            rounded-xl
            p-3
            outline-none
            focus:ring-2
            focus:ring-cyan-500
            focus:border-cyan-500
            transition
          "

        />

      </div>


      {/* ====================================================
          LOADING
      ===================================================== */}

      {loading ? (

        <div
          className="
            text-center
            py-16
            text-slate-500
          "
        >

          Loading Mentors...

        </div>

      ) : filteredMentors.length === 0 ? (

        /* ==================================================
            EMPTY STATE
        =================================================== */

        <div
          className="
            text-center
            py-16
            text-slate-500
          "
        >

          <p
            className="
              text-lg
              font-semibold
            "
          >

            No mentors found

          </p>

          <p
            className="
              text-sm
              mt-1
            "
          >

            {search
              ? "Try a different search."
              : "Add your first mentor to get started."}

          </p>

        </div>

      ) : (

        /* ==================================================
            TABLE
        =================================================== */

        <div
          className="
            overflow-x-auto
            rounded-xl
            border
            border-slate-100
          "
        >

          <table
            className="
              w-full
              border-collapse
            "
          >

            <thead>

              <tr
                className="
                  bg-slate-50
                  border-b
                  border-slate-200
                "
              >

                <th
                  className="
                    p-4
                    text-left
                    text-sm
                    font-semibold
                    text-slate-600
                  "
                >

                  Name

                </th>


                <th
                  className="
                    p-4
                    text-left
                    text-sm
                    font-semibold
                    text-slate-600
                  "
                >

                  Email

                </th>


                <th
                  className="
                    p-4
                    text-left
                    text-sm
                    font-semibold
                    text-slate-600
                  "
                >

                  Designation

                </th>


                <th
                  className="
                    p-4
                    text-left
                    text-sm
                    font-semibold
                    text-slate-600
                  "
                >

                  Experience

                </th>


                <th
                  className="
                    p-4
                    text-center
                    text-sm
                    font-semibold
                    text-slate-600
                  "
                >

                  Actions

                </th>

              </tr>

            </thead>


            <tbody>

              {filteredMentors.map(
                (mentor) => (

                  <tr

                    key={mentor.id}

                    className="
                      border-b
                      border-slate-100
                      hover:bg-slate-50
                      transition
                    "

                  >

                    <td
                      className="
                        p-4
                        font-medium
                        text-slate-800
                      "
                    >

                      {mentor.full_name ||
                        "Unnamed Mentor"}

                    </td>


                    <td
                      className="
                        p-4
                        text-slate-600
                      "
                    >

                      {mentor.email ||
                        "Not provided"}

                    </td>


                    <td
                      className="
                        p-4
                        text-slate-600
                      "
                    >

                      {mentor.designation ||
                        "Not provided"}

                    </td>


                    <td
                      className="
                        p-4
                        text-slate-600
                      "
                    >

                      {mentor.experience
                        ? `${mentor.experience} Years`
                        : "Not provided"}

                    </td>


                    {/* ====================================
                        ACTIONS
                    ===================================== */}

                    <td
                      className="
                        p-4
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          justify-center
                          gap-2
                        "
                      >

                        {/* VIEW */}

                        <button

                          type="button"

                          onClick={() =>
                            handleView(
                              mentor
                            )
                          }

                          title="View Mentor"

                          aria-label="View Mentor"

                          className="
                            w-9
                            h-9
                            rounded-lg
                            bg-cyan-50
                            text-cyan-600
                            hover:bg-cyan-100
                            flex
                            items-center
                            justify-center
                            transition
                          "

                        >

                          <FaEye />

                        </button>


                        {/* EDIT */}

                        <button

                          type="button"

                          onClick={() =>
                            handleEdit(
                              mentor
                            )
                          }

                          title="Edit Mentor"

                          aria-label="Edit Mentor"

                          className="
                            w-9
                            h-9
                            rounded-lg
                            bg-blue-50
                            text-blue-600
                            hover:bg-blue-100
                            flex
                            items-center
                            justify-center
                            transition
                          "

                        >

                          <FaEdit />

                        </button>


                        {/* DELETE */}

                        <button

                          type="button"

                          onClick={() =>
                            handleDelete(
                              mentor.id
                            )
                          }

                          title="Delete Mentor"

                          aria-label="Delete Mentor"

                          className="
                            w-9
                            h-9
                            rounded-lg
                            bg-red-50
                            text-red-600
                            hover:bg-red-100
                            flex
                            items-center
                            justify-center
                            transition
                          "

                        >

                          <FaTrash />

                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      )}


      {/* ====================================================
          ADD MENTOR MODAL
      ===================================================== */}

      {showAddModal && (

        <AddMentorModal

          close={() =>
            setShowAddModal(
              false
            )
          }

          refresh={
            loadMentors
          }

        />

      )}


      {/* ====================================================
          EDIT MENTOR MODAL
      ===================================================== */}

      {showEditModal && (

        <EditMentorModal

          mentor={
            selectedMentor
          }

          close={() => {

            setShowEditModal(
              false
            );

            setSelectedMentor(
              null
            );

          }}

          refresh={
            loadMentors
          }

        />

      )}


      {/* ====================================================
          PROFILE MODAL
      ===================================================== */}

      {showProfileModal && (

        <MentorProfileModal

          mentor={
            selectedMentor
          }

          close={() => {

            setShowProfileModal(
              false
            );

            setSelectedMentor(
              null
            );

          }}

        />

      )}

    </div>

  );

}

export default MentorTable;