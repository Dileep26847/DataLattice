import { FaFilePdf } from "react-icons/fa";

function NotesPanel({ lesson }) {

  if (!lesson?.pdf_url) return null;

  return (

    <div className="bg-white rounded-3xl shadow-xl p-6 mt-8">

      <h2 className="text-2xl font-bold mb-5">

        Resources

      </h2>

      <a

        href={lesson.pdf_url}

        target="_blank"

        rel="noreferrer"

        className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-xl w-fit"

      >

        <FaFilePdf />

        Download Notes

      </a>

    </div>

  );

}

export default NotesPanel;