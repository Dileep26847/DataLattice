import {
  FaTrophy,
  FaMedal,
  FaStar,
} from "react-icons/fa";

function AchievementCard() {
  const achievements = [
    {
      icon: <FaTrophy />,
      title: "Top Learner",
      color: "text-yellow-500",
    },
    {
      icon: <FaMedal />,
      title: "5 Courses Completed",
      color: "text-blue-600",
    },
    {
      icon: <FaStar />,
      title: "7 Day Streak",
      color: "text-green-600",
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-8">
        Achievements
      </h2>

      <div className="space-y-5">

        {achievements.map((item, index) => (

          <div
            key={index}
            className="flex items-center gap-4 border rounded-2xl p-5"
          >

            <div className={`text-3xl ${item.color}`}>
              {item.icon}
            </div>

            <h3 className="font-semibold">
              {item.title}
            </h3>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AchievementCard;