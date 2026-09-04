import { useState } from "react";
import toast from "react-hot-toast";
import { createTicket } from "../../../services/supportService";

function TicketForm() {
  const [ticket, setTicket] = useState({
    category: "Technical",
    title: "",
    description: "",
    attachment: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setTicket({
      ...ticket,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createTicket({
        category: ticket.category,
        title: ticket.title,
        description: ticket.description,
        attachment: ticket.attachment,
      });

      toast.success("Support Ticket Submitted");

      setTicket({
        category: "Technical",
        title: "",
        description: "",
        attachment: "",
      });

    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message ||
          "Unable to submit ticket."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <h2 className="text-3xl font-bold mb-8">
        Create Support Ticket
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <div>

          <label className="block font-semibold mb-2">
            Category
          </label>

          <select
            name="category"
            value={ticket.category}
            onChange={handleChange}
            className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Technical">
              Technical
            </option>

            <option value="Assignment">
              Assignment
            </option>

            <option value="Course">
              Course
            </option>

            <option value="Payment">
              Payment
            </option>

            <option value="Other">
              Other
            </option>
          </select>

        </div>

        <div>

          <label className="block font-semibold mb-2">
            Ticket Title
          </label>

          <input
            type="text"
            name="title"
            value={ticket.title}
            onChange={handleChange}
            placeholder="Enter ticket title"
            required
            className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>

        <div>

          <label className="block font-semibold mb-2">
            Description
          </label>

          <textarea
            rows="6"
            name="description"
            value={ticket.description}
            onChange={handleChange}
            placeholder="Describe your issue..."
            required
            className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-2xl font-semibold transition"
        >
          {loading
            ? "Submitting..."
            : "Submit Ticket"}
        </button>

      </form>

    </div>
  );
}

export default TicketForm;