import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { BarChart, Bar, PieChart, Pie, ScatterChart, Scatter, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Activity, AlertTriangle, TrendingUp } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FilterPanel from '@/components/FilterPanel.jsx';
import StatCard from '@/components/StatCard.jsx';
import { heartDiseaseData, filterData, calculateStatistics } from '@/data/heartDiseaseData.js';

const DrSharmaPage = () => {
  const [filters, setFilters] = useState({
    ageRange: [20, 90],
    gender: 'All',
    bmiCategory: 'All',
    cholesterolLevel: 'All',
    smokingStatus: 'All'
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredData = useMemo(() => filterData(heartDiseaseData, filters), [filters]);
  const stats = useMemo(() => calculateStatistics(filteredData), [filteredData]);

  // Age Group Analysis
  const ageGroupData = useMemo(() => {
    const groups = ['20-30', '31-40', '41-50', '51-60', '61-70', '71+'];
    return groups.map(group => {
      const groupData = filteredData.filter(p => p.ageGroup === group);
      const diseased = groupData.filter(p => p.diseaseStatus === 'Yes').length;
      return {
        ageGroup: group,
        total: groupData.length,
        diseased,
        prevalence: groupData.length > 0 ? ((diseased / groupData.length) * 100).toFixed(1) : 0
      };
    });
  }, [filteredData]);

  // Gender Distribution
  const genderData = useMemo(() => {
    const male = filteredData.filter(p => p.gender === 'Male' && p.diseaseStatus === 'Yes').length;
    const female = filteredData.filter(p => p.gender === 'Female' && p.diseaseStatus === 'Yes').length;
    return [
      { name: 'Male', value: male, color: '#3B82F6' },
      { name: 'Female', value: female, color: '#EC4899' }
    ];
  }, [filteredData]);

  // BMI vs Cholesterol Scatter
  const scatterData = useMemo(() => {
    return filteredData.map(p => ({
      bmi: p.bmi,
      cholesterol: p.cholesterol,
      diseaseStatus: p.diseaseStatus
    }));
  }, [filteredData]);

  // High Risk Groups
  const highRiskGroups = useMemo(() => {
    const groups = [];
    
    // Elderly with high cholesterol
    const elderlyHighChol = filteredData.filter(p => 
      p.age > 65 && p.cholesterol > 240 && p.diseaseStatus === 'Yes'
    ).length;
    if (elderlyHighChol > 0) {
      groups.push({ group: 'Elderly (>65) with High Cholesterol', count: elderlyHighChol });
    }

    // Smokers with obesity
    const smokersObese = filteredData.filter(p => 
      p.smokingStatus === 'Current' && p.bmiCategory === 'Obese' && p.diseaseStatus === 'Yes'
    ).length;
    if (smokersObese > 0) {
      groups.push({ group: 'Current Smokers with Obesity', count: smokersObese });
    }

    // High BP with sedentary lifestyle
    const highBPSedentary = filteredData.filter(p => 
      p.systolic > 140 && p.physicalActivity === 'Sedentary' && p.diseaseStatus === 'Yes'
    ).length;
    if (highBPSedentary > 0) {
      groups.push({ group: 'High BP with Sedentary Lifestyle', count: highBPSedentary });
    }

    return groups;
  }, [filteredData]);

  return (
    <>
      <Helmet>
        <title>{`Dr. Sharma Clinical Dashboard - Heart Disease Analysis`}</title>
        <meta name="description" content="Clinical dashboard for medical professionals with patient analytics, disease prevalence charts, and risk assessment tools." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <Header />

        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Clinical Dashboard</h1>
            <p className="text-lg text-gray-600">Comprehensive patient analytics and disease prevalence insights</p>
          </div>

          {/* Filters */}
          <FilterPanel filters={filters} onFilterChange={handleFilterChange} />

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={Users}
              title="Total Patients"
              value={stats.total}
              subtitle="In current filter"
              color="blue"
              delay={0}
            />
            <StatCard
              icon={AlertTriangle}
              title="Disease Cases"
              value={stats.diseased}
              subtitle={`${stats.prevalence}% prevalence`}
              color="red"
              delay={0.1}
            />
            <StatCard
              icon={Activity}
              title="Healthy Patients"
              value={stats.healthy}
              subtitle={`${(100 - stats.prevalence).toFixed(1)}% of total`}
              color="green"
              delay={0.2}
            />
            <StatCard
              icon={TrendingUp}
              title="High Risk Groups"
              value={highRiskGroups.length}
              subtitle="Identified segments"
              color="yellow"
              delay={0.3}
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Age Group Bar Chart */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Disease Prevalence by Age Group</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ageGroupData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="ageGroup" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFF', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                    formatter={(value, name) => {
                      if (name === 'prevalence') return [`${value}%`, 'Prevalence'];
                      return [value, name === 'diseased' ? 'Disease Cases' : 'Total Patients'];
                    }}
                  />
                  <Legend />
                  <Bar dataKey="diseased" fill="#EF4444" name="Disease Cases" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="total" fill="#3B82F6" name="Total Patients" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Gender Pie Chart */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Gender Distribution of Disease Cases</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(1)}%)`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* BMI vs Cholesterol Scatter */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">BMI vs Cholesterol Correlation</h3>
              <ResponsiveContainer width="100%" height={350}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" dataKey="bmi" name="BMI" stroke="#6B7280" label={{ value: 'BMI', position: 'insideBottom', offset: -5 }} />
                  <YAxis type="number" dataKey="cholesterol" name="Cholesterol" stroke="#6B7280" label={{ value: 'Cholesterol (mg/dL)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Legend />
                  <Scatter 
                    name="Disease Present" 
                    data={scatterData.filter(d => d.diseaseStatus === 'Yes')} 
                    fill="#EF4444" 
                  />
                  <Scatter 
                    name="No Disease" 
                    data={scatterData.filter(d => d.diseaseStatus === 'No')} 
                    fill="#10B981" 
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* High Risk Groups */}
          {highRiskGroups.length > 0 && (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">High-Risk Patient Groups</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {highRiskGroups.map((group, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-red-900 mb-1">{group.group}</p>
                    <p className="text-2xl font-bold text-red-600">{group.count} patients</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default DrSharmaPage;
