import { useParams } from "react-router-dom";

import StudentSidebar from "../components/student/StudentSidebar";
import StudentTopbar from "../components/student/StudentTopbar";

import LessonSidebar from "../components/student/learning/LessonSidebar";
import LessonVideo from "../components/student/learning/LessonVideo";
import LessonContent from "../components/student/learning/LessonContent";
import ProgressCard from "../components/student/learning/ProgressCard";

function Learning() {

  const { id } = useParams();

  return (

    <div className="flex bg-slate-100 min-h-screen">

      <StudentSidebar />

      <main className="flex-1 overflow-auto">

        <StudentTopbar />

        <div className="p-8">

          <div className="grid grid-cols-12 gap-8">

            {/* Left */}

            <div className="col-span-3">

              <LessonSidebar
                courseId={id}
              />

            </div>

            {/* Center */}

            <div className="col-span-6 space-y-6">

              <LessonVideo
                courseId={id}
              />

              <LessonContent
                courseId={id}
              />

            </div>

            {/* Right */}

            <div className="col-span-3">

              <ProgressCard
                courseId={id}
              />

            </div>

          </div>

        </div>

      </main>

    </div>

  );

}

export default Learning;