import React from 'react';
import { CheckCircle2, AlertCircle, Activity, Heart, Apple, Cigarette } from 'lucide-react';
import { motion } from 'framer-motion';

const HealthRecommendations = ({ riskFactors, riskLevel }) => {
  const recommendations = [];

  // Generate recommendations based on risk factors
  if (riskFactors.age) {
    recommendations.push({
      icon: Heart,
      title: 'Age-Related Monitoring',
      description: 'Regular cardiovascular check-ups are recommended. Schedule annual heart health screenings.',
      type: 'warning'
    });
  }

  if (riskFactors.cholesterol) {
    recommendations.push({
      icon: Apple,
      title: 'Cholesterol Management',
      description: 'Reduce saturated fats, increase fiber intake, and consider omega-3 supplements. Consult your doctor about statin therapy.',
      type: 'alert'
    });
  }

  if (riskFactors.bloodPressure) {
    recommendations.push({
      icon: Heart,
      title: 'Blood Pressure Control',
      description: 'Reduce sodium intake, maintain healthy weight, and monitor BP regularly. Consider DASH diet.',
      type: 'alert'
    });
  }

  if (riskFactors.bmi) {
    recommendations.push({
      icon: Activity,
      title: 'Weight Management',
      description: 'Aim for gradual weight loss through balanced diet and regular exercise. Target BMI between 18.5-24.9.',
      type: 'warning'
    });
  }

  if (riskFactors.smoking) {
    recommendations.push({
      icon: Cigarette,
      title: 'Smoking Cessation',
      description: 'Quitting smoking is the single most important step. Seek support through cessation programs or nicotine replacement therapy.',
      type: 'alert'
    });
  }

  if (riskFactors.activity) {
    recommendations.push({
      icon: Activity,
      title: 'Increase Physical Activity',
      description: 'Aim for 150 minutes of moderate aerobic activity per week. Start with walking and gradually increase intensity.',
      type: 'warning'
    });
  }

  // Add general recommendations
  if (riskLevel === 'Low') {
    recommendations.push({
      icon: CheckCircle2,
      title: 'Maintain Healthy Lifestyle',
      description: 'Continue your healthy habits! Regular exercise, balanced diet, and routine check-ups will keep you on track.',
      type: 'success'
    });
  }

  const getIconColor = (type) => {
    if (type === 'success') return 'text-green-600 bg-green-50';
    if (type === 'warning') return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Personalized Recommendations</h3>
      
      {recommendations.length === 0 ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <p className="text-green-800 font-medium">Excellent Health Profile!</p>
          <p className="text-green-700 text-sm mt-2">Keep up the great work with your healthy lifestyle.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${getIconColor(rec.type)}`}>
                  <rec.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{rec.title}</h4>
                  <p className="text-sm text-gray-600">{rec.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthRecommendations;