import Calculator from '@/components/Calculator';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      <h1 className="text-3xl font-bold text-white mb-8">React Calculator</h1>
      <Calculator />
      <p className="text-gray-400 mt-8 text-sm">Built with React and Tailwind CSS</p>
    </div>
  );
};

export default Index;