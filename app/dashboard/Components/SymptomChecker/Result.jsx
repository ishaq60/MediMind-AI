import Link from 'next/link';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Loading from '../../loading';

const Result = ({ result }) => {
  if (!result?.raw) return <Loading></Loading>;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mt-6 shadow-sm">
      <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed space-y-4">
        <ReactMarkdown
          components={{
            // Custom list for different section headers
            h2: ({ node, children }) => {
              const text = String(children).toLowerCase();

              let color = '';
              if (text.includes('possible')) color = 'text-teal-600';
              else if (text.includes('what you can')) color = 'text-green-600';
              else if (text.includes('emergency') || text.includes('seek')) color = 'text-red-600';

              return <h2 className={`text-lg font-semibold ${color}`}>{children}</h2>;
            },
            ul: ({ node, children }) => <ul className="list-disc list-inside pl-4">{children}</ul>,
            li: ({ node, children }) => <li className="text-gray-700">{children}</li>,
          }}
        >
          {result.raw}
        </ReactMarkdown>
     
          <Link className='text-white bg-green-500 p-4 rounded-sm' href="/doctor">Find Doctor</Link>
      
      </div>
    </div>
  );
};

export default Result;
