import { useEffect, useState } from "react";

import {
  FaEye,
  FaReply,
} from "react-icons/fa";

import toast from "react-hot-toast";

import {
  getTickets,
} from "../../../services/supportService";

import ReplyModal from "./ReplyModal";
import TicketDetailsModal from "./TicketDetailsModal";

import SupportStats from "./SupportStats";
import SupportSearch from "./SupportSearch";
import SupportFilter from "./SupportFilter";

import StatusBadge from "./StatusBadge";
import LoadingSkeleton from "./LoadingSkeleton";
import EmptyState from "./EmptyState";
import SupportAnalytics from "./SupportAnalytics";


function SupportTable() {

  // ======================================
  // Tickets
  // ======================================

  const [tickets, setTickets] = useState([]);

  const [filteredTickets, setFilteredTickets] =
    useState([]);


  // ======================================
  // Loading
  // ======================================

  const [loading, setLoading] =
    useState(true);


  // ======================================
  // Search
  // ======================================

  const [search, setSearch] =
    useState("");


  // ======================================
  // Status Filter
  // ======================================

  const [statusFilter, setStatusFilter] =
    useState("All");


  // ======================================
  // Selected Ticket
  // ======================================

  const [selectedTicket, setSelectedTicket] =
    useState(null);


  // ======================================
  // Modals
  // ======================================

  const [showReply, setShowReply] =
    useState(false);

  const [showDetails, setShowDetails] =
    useState(false);


  // ======================================
  // Load Tickets
  // ======================================

  useEffect(() => {

    loadTickets();

  }, []);


  // ======================================
  // Filter Tickets
  // ======================================

  useEffect(() => {

    const keyword =
      search.trim().toLowerCase();


    const filtered = tickets.filter(
      (ticket) => {

        const studentName =
          String(
            ticket.full_name || ""
          ).toLowerCase();

        const email =
          String(
            ticket.email || ""
          ).toLowerCase();

        const title =
          String(
            ticket.title || ""
          ).toLowerCase();

        const category =
          String(
            ticket.category || ""
          ).toLowerCase();

        const status =
          String(
            ticket.status || ""
          ).toLowerCase();


        const matchesSearch =

          studentName.includes(keyword) ||

          email.includes(keyword) ||

          title.includes(keyword) ||

          category.includes(keyword) ||

          status.includes(keyword);


        const matchesStatus =

          statusFilter === "All"

            ? true

            : ticket.status === statusFilter;


        return (
          matchesSearch &&
          matchesStatus
        );

      }
    );


    setFilteredTickets(filtered);

  }, [
    search,
    statusFilter,
    tickets,
  ]);


  // ======================================
  // Get Tickets
  // ======================================

  const loadTickets = async () => {

    try {

      setLoading(true);


      const data =
        await getTickets();


      const ticketData =
        Array.isArray(data?.tickets)
          ? data.tickets
          : [];


      setTickets(ticketData);

      setFilteredTickets(ticketData);

    }

    catch (err) {

      console.error(
        "GET SUPPORT TICKETS ERROR:",
        err
      );

      toast.error(
        err.response?.data?.message ||
        "Failed to load support tickets"
      );

    }

    finally {

      setLoading(false);

    }

  };


  // ======================================
  // Loading State
  // ======================================

  if (loading) {

    return (

      <LoadingSkeleton />

    );

  }


  return (

    <>

      {/* ==================================
          Statistics
      ================================== */}

      <SupportStats
        tickets={tickets}
      />


      {/* ==================================
          Analytics
      ================================== */}

      <SupportAnalytics
        tickets={tickets}
      />


      {/* ==================================
          Ticket Management
      ================================== */}

      <div className="mt-8 bg-white rounded-3xl shadow-lg border border-slate-100 p-8">

        {/* ==================================
            Header
        ================================== */}

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8">

          <div>

            <h2 className="text-3xl font-black text-slate-800">

              Support Tickets

            </h2>

            <p className="text-slate-500 mt-2">

              Manage and respond to student support requests.

            </p>

          </div>


          <div className="text-sm text-slate-500">

            Showing{" "}

            <span className="font-bold text-slate-800">

              {filteredTickets.length}

            </span>

            {" "}of{" "}

            <span className="font-bold text-slate-800">

              {tickets.length}

            </span>

            {" "}tickets

          </div>

        </div>


        {/* ==================================
            Search + Filter
        ================================== */}

        <div className="flex flex-col lg:flex-row gap-4 mb-8">

          <div className="flex-1">

            <SupportSearch

              search={search}

              setSearch={setSearch}

            />

          </div>


          <SupportFilter

            statusFilter={statusFilter}

            setStatusFilter={setStatusFilter}

          />

        </div>


        {/* ==================================
            Empty State
        ================================== */}

        {filteredTickets.length === 0 ? (

          <EmptyState />

        ) : (

          /* ==================================
             Tickets Table
          ================================== */

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-slate-200">

                  <th className="text-left py-5 px-2">

                    Student

                  </th>


                  <th className="text-left py-5 px-2">

                    Category

                  </th>


                  <th className="text-left py-5 px-2">

                    Status

                  </th>


                  <th className="text-left py-5 px-2">

                    Created

                  </th>


                  <th className="text-center py-5 px-2">

                    Actions

                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredTickets.map(
                  (ticket) => (

                    <tr
                      key={ticket.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition"
                    >

                      {/* =========================
                          Student
                      ========================= */}

                      <td className="py-5 px-2">

                        <h3 className="font-bold text-slate-800">

                          {ticket.full_name ||
                            "Unknown Student"}

                        </h3>

                        <p className="text-sm text-slate-500">

                          {ticket.email ||
                            "No email"}

                        </p>

                        <p className="text-slate-600 mt-1">

                          {ticket.title ||
                            "Untitled Ticket"}

                        </p>

                      </td>


                      {/* =========================
                          Category
                      ========================= */}

                      <td className="py-5 px-2">

                        <span className="font-medium text-slate-700">

                          {ticket.category ||
                            "General"}

                        </span>

                      </td>


                      {/* =========================
                          Status
                      ========================= */}

                      <td className="py-5 px-2">

                        <StatusBadge
                          status={
                            ticket.status ||
                            "Open"
                          }
                        />

                      </td>


                      {/* =========================
                          Created
                      ========================= */}

                      <td className="py-5 px-2">

                        {ticket.created_at

                          ? new Date(
                              ticket.created_at
                            ).toLocaleDateString()

                          : "-"

                        }

                      </td>


                      {/* =========================
                          Actions
                      ========================= */}

                      <td className="py-5 px-2">

                        <div className="flex justify-center gap-3">

                          {/* View */}

                          <button

                            onClick={() => {

                              setSelectedTicket(
                                ticket
                              );

                              setShowDetails(
                                true
                              );

                            }}

                            title="View Ticket"

                            className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition"

                          >

                            <FaEye />

                          </button>


                          {/* Reply */}

                          <button

                            onClick={() => {

                              setSelectedTicket(
                                ticket
                              );

                              setShowReply(
                                true
                              );

                            }}

                            title="Reply to Ticket"

                            className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition"

                          >

                            <FaReply />

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

      </div>


      {/* ======================================
          Ticket Details Modal
      ====================================== */}

      {showDetails && (

        <TicketDetailsModal

          ticket={selectedTicket}

          close={() => {

            setShowDetails(false);

            setSelectedTicket(null);

          }}

        />

      )}


      {/* ======================================
          Reply Modal
      ====================================== */}

      {showReply && (

        <ReplyModal

          ticket={selectedTicket}

          close={() => {

            setShowReply(false);

            setSelectedTicket(null);

          }}

          refresh={loadTickets}

        />

      )}

    </>

  );

}


export default SupportTable;