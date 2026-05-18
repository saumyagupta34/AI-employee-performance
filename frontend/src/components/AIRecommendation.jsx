import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { MdClose, MdAutoAwesome } from 'react-icons/md';

const AIRecommendation = ({ employee, onClose }) => {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAI = async () => {
      try {
        const res = await api.post('/ai/recommend', { employeeId: employee._id });
        setRecommendation(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to generate recommendation. Check OpenRouter API key.');
      } finally {
        setLoading(false);
      }
    };
    fetchAI();
  }, [employee._id]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div className="flex items-center text-indigo-600">
            <MdAutoAwesome className="w-8 h-8 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">AI Analysis: {employee.name}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <MdClose className="w-6 h-6" />
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-indigo-600 font-medium">Analyzing performance data...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        ) : recommendation?.raw_response ? (
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 whitespace-pre-wrap text-gray-700">
             <h3 className="font-bold text-gray-800 mb-2">Raw AI Analysis</h3>
             {recommendation.raw_response}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-indigo-100">
              <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center">
                Performance Summary
              </h3>
              <p className="text-indigo-800 leading-relaxed">
                {recommendation?.performance_summary || 'No summary available.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <h3 className="text-lg font-bold text-green-900 mb-2">Promotion Recommendation</h3>
                <p className="text-green-800">{recommendation?.promotion_recommendation || 'N/A'}</p>
              </div>
              
              <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                <h3 className="text-lg font-bold text-red-900 mb-2">Weak Areas</h3>
                <p className="text-red-800">{recommendation?.weak_areas || 'N/A'}</p>
              </div>
            </div>

            <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
              <h3 className="text-lg font-bold text-amber-900 mb-2">Suggested Training</h3>
              <p className="text-amber-800">{recommendation?.suggested_training || 'N/A'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRecommendation;
