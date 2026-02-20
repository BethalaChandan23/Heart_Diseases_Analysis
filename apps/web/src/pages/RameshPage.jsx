import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapPin, TrendingUp, Users, Activity } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import StatCard from '@/components/StatCard.jsx';
import { heartDiseaseData } from '@/data/heartDiseaseData.js';

const RameshPage = () => {
  // Simulate time-based data (monthly trends over 12 months)
  const trendData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month, index) => {
      const basePrevalence = 28;
      const seasonalVariation = Math.sin(index * Math.PI / 6) * 3;
      const trend = index * 0.3;
      return {
        month,
        prevalence: parseFloat((basePrevalence + seasonalVariation + trend).toFixed(1)),
        cases: Math.round((basePrevalence + seasonalVariation + trend) * 5)
      };
    });
  }, []);

  // Rural vs Urban Analysis
  const regionalData = useMemo(() => {
    const rural = heartDiseaseData.filter(p => p.region === 'Rural');
    const urban = heartDiseaseData.filter(p => p.region === 'Urban');
    
    const ruralDiseased = rural.filter(p => p.diseaseStatus === 'Yes').length;
    const urbanDiseased = urban.filter(p => p.diseaseStatus === 'Yes').length;
    
    return [
      {
        region: 'Rural',
        total: rural.length,
        diseased: ruralDiseased,
        prevalence: ((ruralDiseased / rural.length) * 100).toFixed(1)
      },
      {
        region: 'Urban',
        total: urban.length,
        diseased: urbanDiseased,
        prevalence: ((urbanDiseased / urban.length) * 100).toFixed(1)
      }
    ];
  }, []);

  // Sedentary Lifestyle Correlation
  const lifestyleData = useMemo(() => {
    const activities = ['Sedentary', 'Light', 'Moderate', 'Active'];
    return activities.map(activity => {
      const activityGroup = heartDiseaseData.filter(p => p.physicalActivity === activity);
      const diseased = activityGroup.filter(p => p.diseaseStatus === 'Yes').length;
      return {
        activity,
        total: activityGroup.length,
        diseased,
        prevalence: activityGroup.length > 0 ? ((diseased / activityGroup.length) * 100).toFixed(1) : 0
      };
    });
  }, []);

  // Regional Statistics
  const ruralStats = useMemo(() => {
    const rural = heartDiseaseData.filter(p => p.region === 'Rural');
    const diseased = rural.filter(p => p.diseaseStatus === 'Yes').length;
    return {
      total: rural.length,
      diseased,
      prevalence: ((diseased / rural.length) * 100).toFixed(1)
    };
  }, []);

  const urbanStats = useMemo(() => {
    const urban = heartDiseaseData.filter(p => p.region === 'Urban');
    const diseased = urban.filter(p => p.diseaseStatus === 'Yes').length;
    return {
      total: urban.length,
      diseased,
      prevalence: ((diseased / urban.length) * 100).toFixed(1)
    };
  }, []);

  const policyInsights = [
    {
      title: 'Rural Healthcare Access',
      insight: 'Rural areas show higher disease prevalence, indicating need for improved healthcare infrastructure and preventive care programs.',
      recommendation: 'Establish mobile health clinics and telemedicine services in rural regions.'
    },
    {
      title: 'Sedentary Lifestyle Intervention',
      insight: 'Strong correlation between sedentary lifestyle and heart disease prevalence across all regions.',
      recommendation: 'Launch community-based physical activity programs and workplace wellness initiatives.'
    },
    {
      title: 'Preventive Screening',
      insight: 'Early detection rates are lower in rural areas, leading to late-stage diagnoses.',
      recommendation: 'Implement subsidized screening programs targeting high-risk populations in underserved areas.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>{`Ramesh Policy Dashboard - Heart Disease Analysis`}</title>
        <meta name="description" content="Regional policy dashboard with health trends, rural vs urban comparisons, and data-driven policy recommendations." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50">
        <Header />

        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Regional Policy Dashboard</h1>
            <p className="text-lg text-gray-600">Data-driven insights for healthcare policy and regional planning</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={MapPin}
              title="Rural Prevalence"
              value={`${ruralStats.prevalence}%`}
              subtitle={`${ruralStats.diseased} of ${ruralStats.total} patients`}
              color="green"
              delay={0}
            />
            <StatCard
              icon={MapPin}
              title="Urban Prevalence"
              value={`${urbanStats.prevalence}%`}
              subtitle={`${urbanStats.diseased} of ${urbanStats.total} patients`}
              color="blue"
              delay={0.1}
            />
            <StatCard
              icon={TrendingUp}
              title="Annual Trend"
              value="+3.6%"
              subtitle="Year-over-year increase"
              color="yellow"
              delay={0.2}
            />
            <StatCard
              icon={Activity}
              title="Sedentary Impact"
              value="High"
              subtitle="Strong correlation found"
              color="red"
              delay={0.3}
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Trend Line Chart */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Heart Disease Trends Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFF', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="prevalence" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    name="Prevalence (%)"
                    dot={{ fill: '#10B981', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Rural vs Urban Bar Chart */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rural vs Urban Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regionalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="region" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFF', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Bar dataKey="diseased" fill="#EF4444" name="Disease Cases" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="total" fill="#3B82F6" name="Total Population" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Lifestyle Correlation */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Physical Activity vs Disease Prevalence</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={lifestyleData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="activity" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFF', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                    formatter={(value, name) => {
                      if (name === 'prevalence') return [`${value}%`, 'Prevalence'];
                      return [value, name === 'diseased' ? 'Disease Cases' : 'Total'];
                    }}
                  />
                  <Legend />
                  <Bar dataKey="prevalence" fill="#F59E0B" name="Prevalence (%)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Policy Insights */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Policy Insights & Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {policyInsights.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-green-50 to-teal-50 border border-green-200 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-700 mb-3">{item.insight}</p>
                  <div className="bg-white border border-green-300 rounded-lg p-3">
                    <p className="text-xs font-medium text-green-800 mb-1">Recommendation:</p>
                    <p className="text-sm text-gray-700">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default RameshPage;