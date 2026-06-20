import { useParams } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar/Sidebar';

function LectureView() {
  const { id } = useParams();
  
  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar role="student" />
      
      <div className="flex-1 md:ml-64 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className="aspect-video bg-textDark flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-2">▶️</div>
                <p>Video Player</p>
              </div>
            </div>
            <div className="p-6">
              <h1 className="text-2xl font-bold text-textDark mb-2">Introduction to React</h1>
              <p className="text-textLight">Course ID: {id || 'sample'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold text-textDark mb-4">About This Lecture</h2>
              <p className="text-textLight leading-relaxed">
                In this lecture, you will learn the fundamentals of React including components, 
                props, state management, and the virtual DOM. This is essential knowledge for 
                modern web development.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-lg font-bold text-textDark mb-4">Course Content</h2>
              <ul className="space-y-2">
                {['Introduction', 'Components', 'Props & State', 'Hooks', 'Final Project'].map((item, i) => (
                  <li key={i} className={`p-2 rounded text-sm ${i === 0 ? 'bg-primary text-white' : 'text-textDark hover:bg-bg cursor-pointer'}`}>
                    {i+1}. {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LectureView;