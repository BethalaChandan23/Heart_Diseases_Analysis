import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { User, Heart, Activity, Cigarette, TrendingUp } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import RiskGaugeChart from '@/components/RiskGaugeChart.jsx';
import HealthRecommendations from '@/components/HealthRecommendations.jsx';
import { Label } from '@/components/ui/label';

const AnitaPage = () => {
  const [formData, setFormData] = useState({
    age: 45,
    cholesterol: 200,
    systolic: 120,
    diastolic: 80,
    bmi: 25,
    physicalActivity: 'Moderate',
    smokingStatus: 'Never'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Calculate risk score and level
  const riskAssessment = useMemo(() => {
    let score = 0;
    const factors = {
      age: false,
      cholesterol: false,
      bloodPressure: false,
      bmi: false,
      smoking: false,
      activity: false
    };

    // Age risk
    if (formData.age > 65) {
      score += 2;
      factors.age = true;
    } else if (formData.age > 50) {
      score += 1;
      factors.age = true;
    }

    // Cholesterol risk
    if (formData.cholesterol > 240) {
      score += 2;
      factors.cholesterol = true;
    } else if (formData.cholesterol > 200) {
      score += 1;
      factors.cholesterol = true;
    }

    // Blood pressure risk
    if (formData.systolic > 140 || formData.diastolic > 90) {
      score += 2;
      factors.bloodPressure = true;
    } else if (formData.systolic > 130 || formData.diastolic > 85) {
      score += 1;
      factors.bloodPressure = true;
    }

    // BMI risk
    if (formData.bmi > 30) {
      score += 2;
      factors.bmi = true;
    } else if (formData.bmi > 25) {
      score += 1;
      factors.bmi = true;
    }

    // Smoking risk
    if (formData.smokingStatus === 'Current') {
      score += 3;
      factors.smoking = true;
    } else if (formData.smokingStatus === 'Former') {
      score += 1;
      factors.smoking = true;
    }

    // Physical activity risk
    if (formData.physicalActivity === 'Sedentary') {
      score += 2;
      factors.activity = true;
    } else if (formData.physicalActivity === 'Light') {
      score += 1;
      factors.activity = true;
    }

    // Determine risk level
    let level = 'Low';
    if (score >= 8) level = 'High';
    else if (score >= 4) level = 'Medium';

    return { score, level, factors };
  }, [formData]);

  const healthyBenchmarks = [
    { metric: 'Age', current: formData.age, benchmark: 'N/A', status: 'info' },
    { metric: 'Cholesterol', current: formData.cholesterol, benchmark: '<200 mg/dL', status: formData.cholesterol < 200 ? 'good' : 'warning' },
    { metric: 'Blood Pressure', current: `${formData.systolic}/${formData.diastolic}`, benchmark: '<120/80 mmHg', status: formData.systolic < 120 && formData.diastolic < 80 ? 'good' : 'warning' },
    { metric: 'BMI', current: formData.bmi, benchmark: '18.5-24.9', status: formData.bmi >= 18.5 && formData.bmi <= 24.9 ? 'good' : 'warning' }
  ];

  return (
    <>
      <Helmet>
        <title>{`Anita Personal Health Dashboard - Heart Disease Analysis`}</title>
        <meta name="description" content="Personal health dashboard with risk assessment, health recommendations, and comparison with healthy benchmarks." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <Header />

        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Personal Health Dashboard</h1>
            <p className="text-lg text-gray-600">Assess your heart disease risk and get personalized health recommendations</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-600" />
                  Your Health Information
                </h3>

                <div className="space-y-4">
                  {/* Age */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Age: {formData.age} years
                    </Label>
                    <input
                      type="range"
                      min="20"
                      max="90"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Cholesterol */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Cholesterol: {formData.cholesterol} mg/dL
                    </Label>
                    <input
                      type="range"
                      min="150"
                      max="350"
                      value={formData.cholesterol}
                      onChange={(e) => handleInputChange('cholesterol', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Blood Pressure */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Blood Pressure</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-gray-600 mb-1 block">Systolic: {formData.systolic}</Label>
                        <input
                          type="range"
                          min="90"
                          max="200"
                          value={formData.systolic}
                          onChange={(e) => handleInputChange('systolic', parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600 mb-1 block">Diastolic: {formData.diastolic}</Label>
                        <input
                          type="range"
                          min="60"
                          max="130"
                          value={formData.diastolic}
                          onChange={(e) => handleInputChange('diastolic', parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* BMI */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      BMI: {formData.bmi}
                    </Label>
                    <input
                      type="range"
                      min="15"
                      max="45"
                      step="0.1"
                      value={formData.bmi}
                      onChange={(e) => handleInputChange('bmi', parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Physical Activity */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Physical Activity Level</Label>
                    <select
                      value={formData.physicalActivity}
                      onChange={(e) => handleInputChange('physicalActivity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
                    >
                      <option value="Sedentary">Sedentary</option>
                      <option value="Light">Light</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Active">Active</option>
                    </select>
                  </div>

                  {/* Smoking Status */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Smoking Status</Label>
                    <select
                      value={formData.smokingStatus}
                      onChange={(e) => handleInputChange('smokingStatus', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
                    >
                      <option value="Never">Never</option>
                      <option value="Former">Former</option>
                      <option value="Current">Current</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Risk Gauge */}
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-purple-600" />
                  Your Heart Disease Risk Assessment
                </h3>
                <RiskGaugeChart riskScore={riskAssessment.score} riskLevel={riskAssessment.level} />
              </div>

              {/* Benchmarks Comparison */}
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Comparison with Healthy Benchmarks
                </h3>
                <div className="space-y-3">
                  {healthyBenchmarks.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.metric}</p>
                        <p className="text-sm text-gray-600">Target: {item.benchmark}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">{item.current}</p>
                        {item.status === 'good' && (
                          <span className="text-xs text-green-600 font-medium">✓ Healthy</span>
                        )}
                        {item.status === 'warning' && (
                          <span className="text-xs text-yellow-600 font-medium">⚠ Needs attention</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <HealthRecommendations 
                  riskFactors={riskAssessment.factors} 
                  riskLevel={riskAssessment.level} 
                />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default AnitaPage;