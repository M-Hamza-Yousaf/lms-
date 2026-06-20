import Sidebar from '../../../components/Sidebar/Sidebar';

function LectureView() {
  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="student" />
      
      <div className="flex-1 md:ml-64 p-6">
        <div className="max-w-5xl mx-auto">
          
          <h1 className="text-3xl font-bold text-textDark mb-6">Lectures 🎥</h1>
          
          {/* Video Player */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className="aspect-video bg-textDark flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-2">▶️</div>
                <p className="text-xl">Introduction to React</p>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-textDark mb-2">Introduction to React</h2>
              <p className="text-textLight">Learn the basics of React JS framework</p>
              <p className="text-sm text-textLight mt-2">⏱️ Duration: 15 minutes</p>
            </div>
          </div>

          {/* Lecture List */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-textDark mb-4">📚 Course Lectures</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-between p-3 bg-bg rounded-lg">
                <span className="font-medium text-textDark">1. Introduction to React</span>
                <span className="text-xs text-success">✅ Completed</span>
              </li>
              <li className="flex items-center justify-between p-3 bg-bg rounded-lg">
                <span className="font-medium text-textDark">2. Components & JSX</span>
                <span className="text-xs text-success">✅ Completed</span>
              </li>
              <li className="flex items-center justify-between p-3 bg-primary text-white rounded-lg">
                <span className="font-medium">3. Props & State</span>
                <span className="text-xs">▶️ Playing</span>
              </li>
              <li className="flex items-center justify-between p-3 bg-bg rounded-lg">
                <span className="font-medium text-textDark">4. React Hooks</span>
                <span className="text-xs text-textLight">⏱️ 20 min</span>
              </li>
              <li className="flex items-center justify-between p-3 bg-bg rounded-lg">
                <span className="font-medium text-textDark">5. Final Project</span>
                <span className="text-xs text-textLight">⏱️ 45 min</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LectureView;