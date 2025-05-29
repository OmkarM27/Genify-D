import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DynamicForm from "../../components/ui/DynamicForm";

import OutputBox from "../../components/ui/OutputBox";

const DynamicUseCasePage = () => {
  const { useCaseId } = useParams();
  const [config, setConfig] = useState(null);

  useEffect(() => {
    import(`../../configs/usecases/${useCaseId}.json`)
      .then((module) => setConfig(module.default))
      .catch((err) => console.error('Config load error:', err));
  }, [useCaseId]);

  if (!config) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 text-white">
      <div className="w-full md:w-1/2 bg-white/5 p-6 rounded-xl backdrop-blur">
        <h2 className="text-2xl font-bold mb-2">{config.title}</h2>
        <p className="mb-4 text-sm text-gray-400">{config.description}</p>
        <DynamicForm fields={config.fields} />
      </div>
      <div className="w-full md:w-1/2">
        <OutputBox />
      </div>
    </div>
  );
};

export default DynamicUseCasePage;
